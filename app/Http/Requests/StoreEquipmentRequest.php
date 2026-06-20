<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'laboratory_id' => ['required', 'exists:laboratories,id'],
            'name' => ['required', 'string', 'max:255'],
            'asset_tag' => ['required', 'string', 'max:255', 'unique:equipment,asset_tag'],
            'serial_number' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:available,reserved,borrowed,maintenance,damaged,retired'],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
