import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmationProps {
    onConfirm: () => void;
    title: string;
    description: string;
    triggerButton?: React.ReactNode;
    variant?: 'ghost' | 'destructive' | 'outline';
    size?: 'sm' | 'default' | 'lg';
}

export function DeleteConfirmation({
    onConfirm,
    title,
    description,
    triggerButton,
    variant = 'ghost',
    size = 'sm'
}: DeleteConfirmationProps) {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <div onClick={() => setOpen(true)}>
                {triggerButton || (
                    <Button
                        type="button"
                        variant={variant}
                        size={size}
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                )}
            </div>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}