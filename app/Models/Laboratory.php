<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'code', 'capacity', 'location', 'status', 'responsible_officer_id'])]
class Laboratory extends Model
{
    use HasFactory;

    /**
     * Get the responsible officer for the laboratory.
     */
    public function responsibleOfficer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsible_officer_id');
    }

    /**
     * Get the equipment in this laboratory.
     */
    public function equipment(): HasMany
    {
        return $this->hasMany(Equipment::class, 'laboratory_id');
    }
}
