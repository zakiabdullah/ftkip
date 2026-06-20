<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLaboratoryRequest extends FormRequest
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
        $laboratoryId = $this->route('laboratory');
        if (is_object($laboratoryId)) {
            $laboratoryId = $laboratoryId->id;
        }

        return [
            'name' => ['required', 'string', 'max:255'],
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('laboratories', 'code')->ignore($laboratoryId),
            ],
            'capacity' => ['required', 'integer', 'min:1'],
            'location' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive,maintenance'],
            'responsible_officer_id' => ['required', 'exists:users,id'],
        ];
    }
}
