<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLaboratoryRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:255', 'unique:laboratories,code'],
            'capacity' => ['required', 'integer', 'min:1'],
            'location' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive,maintenance'],
            'responsible_officer_id' => ['required', 'exists:users,id'],
        ];
    }
}
