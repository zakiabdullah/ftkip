<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEquipmentRequest extends FormRequest
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
        $equipmentId = $this->route('equipment');
        if (is_object($equipmentId)) {
            $equipmentId = $equipmentId->id;
        }

        return [
            'laboratory_id' => ['required', 'exists:laboratories,id'],
            'name' => ['required', 'string', 'max:255'],
            'asset_tag' => [
                'required',
                'string',
                'max:255',
                Rule::unique('equipment', 'asset_tag')->ignore($equipmentId),
            ],
            'serial_number' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:available,reserved,borrowed,maintenance,damaged,retired'],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
