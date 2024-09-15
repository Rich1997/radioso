import { ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";

type AlertProps = {
    isOpen: boolean;
    icon: ReactNode;
    errorMessage: string;
    errorDescription: string;
    onClick: () => void;
    dialogActionText: string;
};

const Alert: React.FC<AlertProps> = ({ isOpen, icon, errorMessage, errorDescription, onClick, dialogActionText }) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 leading-3 sm:justify-start justify-center">
                        {icon}
                        {errorMessage}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{errorDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClick}>{dialogActionText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Alert;
