import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Card className="mx-auto w-full max-w-sm border border-zinc-200/80 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900">
                <CardHeader className="space-y-1.5 pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Reset Password
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-550 dark:text-zinc-400">
                        Choose a new password for your account to complete recovery.
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="grid gap-4">
                    <form onSubmit={submit} className="grid gap-4">
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-350">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-350">
                                New Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation" className="text-zinc-700 dark:text-zinc-350">
                                Confirm New Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                placeholder="••••••••"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit" 
                            className="w-full bg-zinc-950 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors font-semibold mt-1"
                            disabled={processing}
                        >
                            {processing ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
