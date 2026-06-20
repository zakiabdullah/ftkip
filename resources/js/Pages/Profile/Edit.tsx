import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Profile Settings
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Manage your account settings, password, and security preferences.
                    </p>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl space-y-6">
                <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your account's profile information and email address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </CardContent>
                </Card>

                <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle>Update Password</CardTitle>
                        <CardDescription>
                            Ensure your account is using a long, random password to stay secure.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdatePasswordForm />
                    </CardContent>
                </Card>

                <Card className="border-red-200/80 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 shadow-sm animate-fade-in">
                    <CardHeader>
                        <CardTitle className="text-red-900 dark:text-red-400">Delete Account</CardTitle>
                        <CardDescription className="text-red-700/80 dark:text-red-400/70">
                            Once your account is deleted, all of its resources and data will be permanently deleted.
                            Before deleting your account, please download any data or information that you wish to retain.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DeleteUserForm />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
