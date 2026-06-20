import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Card className="mx-auto w-full max-w-sm border border-zinc-200/80 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900">
                <CardHeader className="space-y-1.5 pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Verify Email
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-550 dark:text-zinc-400">
                        Thanks for signing up! Please verify your email address by clicking on the link we just emailed to you. If you didn't receive it, we will gladly send you another.
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="grid gap-4">
                    {status === 'verification-link-sent' && (
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-3 rounded-lg">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit} className="grid gap-4">
                        {/* Resend button */}
                        <Button 
                            type="submit" 
                            className="w-full bg-zinc-950 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors font-semibold"
                            disabled={processing}
                        >
                            {processing ? 'Resending...' : 'Resend Verification Email'}
                        </Button>
                    </form>

                    {/* Log out link */}
                    <div className="flex items-center justify-center mt-2">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 underline transition-colors"
                        >
                            Log Out
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
