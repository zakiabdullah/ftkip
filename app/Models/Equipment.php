<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['laboratory_id', 'name', 'asset_tag', 'serial_number', 'status', 'image_path'])]
class Equipment extends Model
{
    use HasFactory;

    /**
     * Get the laboratory that this equipment belongs to.
     */
    public function laboratory(): BelongsTo
    {
        return $this->belongsTo(Laboratory::class, 'laboratory_id');
    }
}
