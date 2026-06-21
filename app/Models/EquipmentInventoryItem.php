<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['laboratory_id', 'name', 'quantity', 'unit_type', 'track_individually', 'status', 'source_text'])]
class EquipmentInventoryItem extends Model
{
    public function laboratory(): BelongsTo
    {
        return $this->belongsTo(Laboratory::class);
    }
}
