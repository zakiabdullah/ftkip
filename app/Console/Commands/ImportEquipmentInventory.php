<?php

namespace App\Console\Commands;

use App\Models\EquipmentInventoryItem;
use App\Models\Laboratory;
use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportEquipmentInventory extends Command
{
    protected $signature = 'equipment:import-inventory {file : Absolute path to the XLSX file} {--dry-run : Preview rows without writing to the database}';

    protected $description = 'Import laboratory equipment inventory items from the FTKIP XLSX register.';

    public function handle(): int
    {
        $file = $this->argument('file');

        if (! is_file($file)) {
            $this->error("File not found: {$file}");

            return self::FAILURE;
        }

        $laboratories = Laboratory::all();
        $byName = $laboratories->keyBy(fn (Laboratory $laboratory) => $this->normalise($laboratory->name));
        $byCode = $laboratories->groupBy(fn (Laboratory $laboratory) => $this->normalise($laboratory->code));
        $spreadsheet = IOFactory::load($file);
        $created = 0;
        $updated = 0;
        $skipped = [];

        foreach ($spreadsheet->getWorksheetIterator() as $worksheet) {
            foreach ($worksheet->toArray(null, true, true, false) as $rowNumber => $row) {
                if ($rowNumber === 0 || empty($row[8])) {
                    continue;
                }

                $laboratory = $byName->get($this->normalise((string) ($row[3] ?? '')));

                if (! $laboratory) {
                    $matches = $byCode->get($this->normalise((string) ($row[2] ?? '')), collect());
                    $laboratory = $matches->count() === 1 ? $matches->first() : null;
                }

                if (! $laboratory) {
                    $skipped[] = sprintf('%s row %d: %s (%s)', $worksheet->getTitle(), $rowNumber + 1, $row[3] ?? 'Unknown laboratory', $row[2] ?? 'No code');
                    continue;
                }

                foreach ($this->parseItems((string) $row[8]) as $item) {
                    if ($this->option('dry-run')) {
                        $this->line("{$laboratory->code}: {$item['name']} ({$item['quantity']} {$item['unit_type']})");
                        continue;
                    }

                    $record = EquipmentInventoryItem::updateOrCreate(
                        ['laboratory_id' => $laboratory->id, 'name' => $item['name']],
                        [
                            'quantity' => $item['quantity'],
                            'unit_type' => $item['unit_type'],
                            'track_individually' => $item['track_individually'],
                            'source_text' => $item['source_text'],
                        ],
                    );

                    $record->wasRecentlyCreated ? $created++ : $updated++;
                }
            }
        }

        $this->info($this->option('dry-run') ? 'Preview completed.' : "Import completed: {$created} created, {$updated} updated.");

        if ($skipped !== []) {
            $this->warn('Unmatched laboratories:');
            foreach ($skipped as $entry) {
                $this->warn("- {$entry}");
            }
        }

        return self::SUCCESS;
    }

    private function parseItems(string $source): array
    {
        $source = str_replace(["\r\n", "\r"], "\n", trim($source));
        $items = preg_split('/(?:(?<=\n)|(?<=,)|\s{2,})(?=\d+\s*-\s*)/', $source) ?: [];

        return collect($items)
            ->map(function (string $item): ?array {
                $sourceText = trim($item, " ,\n\t");
                $name = preg_replace('/^\d+\s*-\s*/', '', $sourceText) ?? $sourceText;
                preg_match('/(?i)(?:x\s*)?(\d+)\s*(unit|set|pcs?|lesen|licenses?)\b/', $name, $quantityMatch);

                $hasQuantity = isset($quantityMatch[1]) && (int) $quantityMatch[1] <= 500;
                $quantity = $hasQuantity ? (int) $quantityMatch[1] : 1;
                $unit = $hasQuantity ? strtolower($quantityMatch[2]) : 'unit';
                $unitType = match (true) {
                    str_starts_with($unit, 'set') => 'set',
                    str_starts_with($unit, 'pc') => 'piece',
                    str_starts_with($unit, 'lesen'), str_starts_with($unit, 'license') => 'license',
                    default => 'unit',
                };

                if ($hasQuantity) {
                    $name = trim(preg_replace('/(?i)\(?\s*(?:x\s*)?\d+\s*(?:unit|set|pcs?|lesen|licenses?)\s*\)?/', '', $name) ?? '');
                }

                if ($name === '') {
                    return null;
                }

                return [
                    'name' => $name,
                    'quantity' => $quantity,
                    'unit_type' => $unitType,
                    'track_individually' => $quantity === 1 && $unitType === 'unit',
                    'source_text' => $sourceText,
                ];
            })
            ->filter()
            ->values()
            ->all();
    }

    private function normalise(string $value): string
    {
        return strtoupper(trim((string) preg_replace('/\s+/', ' ', $value)));
    }
}
