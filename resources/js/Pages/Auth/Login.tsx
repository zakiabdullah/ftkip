import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
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
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Card className="mx-auto w-full max-w-sm border border-zinc-200/80 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900">
                <CardHeader className="space-y-1.5 pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Login
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-550 dark:text-zinc-400">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="grid gap-4">
                    {status && (
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="grid gap-4">
                        {/* Email or Username */}
                        <div className="grid gap-2">
                            <Label htmlFor="login" className="text-zinc-700 dark:text-zinc-350">
                                Email or Username
                            </Label>
                            <Input
                                id="login"
                                type="text"
                                name="login"
                                placeholder="name@example.com"
                                value={data.login}
                                autoComplete="username"
                                onChange={(e) => setData('login', e.target.value)}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.login} />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-350">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-zinc-500 hover:text-indigo-650 dark:text-zinc-400 dark:hover:text-indigo-400 underline transition-colors"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center space-x-2.5 py-0.5">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) =>
                                    setData('remember', checked === true)
                                }
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-none cursor-pointer"
                            >
                                Remember me
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit" 
                            className="w-full bg-zinc-950 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors font-semibold"
                            disabled={processing}
                        >
                            {processing ? 'Logging in...' : 'Log in'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="hidden">
                        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-850"></div>
                        <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                            or continue with
                        </span>
                        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-850"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="hidden">
                        <Button 
                            variant="outline" 
                            className="w-full border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-not-allowed text-zinc-700 dark:text-zinc-300"
                            disabled
                        >
                            <svg className="mr-2.5 h-4 w-4" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>Google</title>
                                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.12 1 1.16 5.92 1.16 12s4.96 11 11.08 11c6.39 0 10.63-4.5 10.63-10.82 0-.73-.08-1.285-.176-1.895H12.24z"/>
                            </svg>
                            Google
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-not-allowed text-zinc-700 dark:text-zinc-300"
                            disabled
                        >
                            <svg className="mr-2.5 h-4 w-4" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                            GitHub
                        </Button>
                    </div>

                    {/* Footer text */}
                    <div className="text-center text-sm text-zinc-500 dark:text-zinc-450 mt-2">
                        Don't have an account?{' '}
                        <Link 
                            href={route('register')} 
                            className="underline font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
