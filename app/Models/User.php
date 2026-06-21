<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

#[Fillable(['name', 'username', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the laboratories managed by this user.
     * 
     * Example: Ali manages Lab 1 and Lab 4
     * $ali->laboratories; // Returns [Lab 1, Lab 4]
     */
    public function laboratories(): HasMany
    {
        return $this->hasMany(Laboratory::class, 'responsible_officer_id');
    }

    public function getRouteKeyName(): string
    {
        return 'username';
    }

    /**
     * Get all equipment across all laboratories managed by this user.
     * 
     * Example: $ali->allEquipment; // Returns all equipment from Lab 1 & Lab 4
     */
    public function allEquipment(): HasManyThrough
    {
        return $this->hasManyThrough(Equipment::class, Laboratory::class, 'responsible_officer_id', 'laboratory_id');
    }
}
