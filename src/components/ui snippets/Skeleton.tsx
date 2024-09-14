import { Card } from "../ui/card";

const Skeleton = () => {
    return (
        <Card className="flex items-center justify-between p-2 select-none rounded-lg gap-4 animate-pulse">
            <div className="flex items-center gap-2 w-full">
                <div>
                    <div className="sm:hidden block">
                        <div className="h-12 w-12 bg-muted rounded-lg" />
                    </div>
                    <div className="sm:block hidden">
                        <div className="h-14 w-14 bg-muted rounded-lg" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div className="w-2/3 h-4 bg-muted rounded-lg" />
                    <div className="w-1/3 h-4 bg-muted rounded-lg" />
                </div>
            </div>
        </Card>
    );
};

export default Skeleton;
