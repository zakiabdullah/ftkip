import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            username: user.username,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <form onSubmit={submit} className={`space-y-6 ${className}`}>
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>

                <Input
                    id="username"
                    className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    required
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.username} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    type="email"
                    className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div>
                    <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                        Your email address is unverified.
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Click here to re-send the verification email.
                        </Link>
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                            A new verification link has been sent to your
                            email address.
                        </div>
                    )}
                </div>
            )}

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
