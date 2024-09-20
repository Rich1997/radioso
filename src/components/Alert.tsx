import { ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";

type AlertProps = {
    isOpen: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    icon: ReactNode;
    errorMessage: string;
    errorDescription: string;
    dialogActionText: string;
};

const Alert: React.FC<AlertProps> = ({
    isOpen,
    onOpenChange,
    icon,
    errorMessage,
    errorDescription,
    dialogActionText,
}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 leading-3 sm:justify-start justify-center">
                        {icon}
                        {errorMessage}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{errorDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{dialogActionText}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Alert;
