import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className={`space-y-6 ${className}`}>
            <div className="grid gap-2">
                <Label htmlFor="current_password">Current Password</Label>

                <Input
                    id="current_password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) =>
                        setData('current_password', e.target.value)
                    }
                    type="password"
                    className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    autoComplete="current-password"
                />

                <InputError
                    message={errors.current_password}
                    className="mt-2"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>

                <Input
                    id="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    type="password"
                    className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    autoComplete="new-password"
                />

                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>

                <Input
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    type="password"
                    className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    autoComplete="new-password"
                />

                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={processing} className="bg-indigo-600 text-white hover:bg-indigo-700">Save</Button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    );
}
