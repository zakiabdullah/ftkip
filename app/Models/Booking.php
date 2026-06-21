<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['start_time' => 'datetime', 'end_time' => 'datetime', 'safety_declared' => 'boolean'];
    }

    public function laboratory(): BelongsTo { return $this->belongsTo(Laboratory::class); }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function supervisor(): BelongsTo { return $this->belongsTo(User::class, 'supervisor_id'); }
    public function items(): HasMany { return $this->hasMany(BookingItem::class); }
}
