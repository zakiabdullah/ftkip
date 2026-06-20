import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Card className="mx-auto w-full max-w-sm border border-zinc-200/80 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900">
                <CardHeader className="space-y-1.5 pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Forgot Password
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-550 dark:text-zinc-400">
                        Enter your email address and we'll send you instructions to reset your password.
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="grid gap-4">
                    {status && (
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="grid gap-4">
                        {/* Email Address with Prefix Icon */}
                        <div className="grid gap-2">
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="pl-10 w-full"
                                    required
                                    autoFocus
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit" 
                            className="w-full bg-zinc-950 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors font-semibold mt-1"
                            disabled={processing}
                        >
                            {processing ? 'Sending...' : 'Send Reset Instructions'}
                        </Button>
                    </form>

                    {/* Footer text */}
                    <div className="text-center text-sm text-zinc-500 dark:text-zinc-450 mt-2">
                        Already have an account?{' '}
                        <Link 
                            href={route('login')} 
                            className="underline font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                        >
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
