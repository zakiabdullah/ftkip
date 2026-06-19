import ApplicationLogo from '@/Components/ApplicationLogo';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
            <Card className="w-full max-w-md border border-zinc-200 shadow-lg dark:border-zinc-800">
                <CardHeader className="flex flex-col items-center justify-center pt-8 pb-4">
                    <Link href="/">
                        <ApplicationLogo className="h-16 w-16 fill-current text-zinc-800 dark:text-zinc-200" />
                    </Link>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}
