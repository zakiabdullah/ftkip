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

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Card className="mx-auto w-full max-w-sm border border-zinc-200/80 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900">
                <CardHeader className="space-y-1.5 pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Confirm Password
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-550 dark:text-zinc-400">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="grid gap-4">
                    <form onSubmit={submit} className="grid gap-4">
                        {/* Password input */}
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-350">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full"
                                required
                                autoFocus
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Submit button */}
                        <Button 
                            type="submit" 
                            className="w-full bg-zinc-950 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors font-semibold mt-1"
                            disabled={processing}
                        >
                            {processing ? 'Confirming...' : 'Confirm Password'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
