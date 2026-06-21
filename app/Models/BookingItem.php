<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingItem extends Model
{
    protected $guarded = [];

    public function booking(): BelongsTo { return $this->belongsTo(Booking::class); }
    public function equipment(): BelongsTo { return $this->belongsTo(EquipmentInventoryItem::class, 'equipment_inventory_item_id'); }
}
