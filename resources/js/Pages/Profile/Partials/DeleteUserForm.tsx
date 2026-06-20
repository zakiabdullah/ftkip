import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <Button variant="destructive" onClick={confirmUserDeletion}>
                Delete Account
            </Button>

            <Dialog open={confirmingUserDeletion} onOpenChange={(open) => { if (!open) closeModal(); }}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and
                            data will be permanently deleted. Please enter your
                            password to confirm you would like to permanently delete
                            your account.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={deleteUser} className="space-y-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                                placeholder="Enter your password..."
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>

                            <Button type="submit" variant="destructive" disabled={processing} className="sm:ms-3">
                                Delete Account
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
