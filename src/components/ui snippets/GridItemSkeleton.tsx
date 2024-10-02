import { Card } from "../ui/card";

const GridItemSkeleton = () => {
    return (
        <Card className="flex items-start justify-center sm:p-2 pt-0 pb-2 select-none sm:rounded-lg rounded-none gap-4 animate-pulse sm:border border-0 sm:w-[196px] w-40 shrink-0">
            <div className="flex flex-col items-center gap-3 w-full">
                <div>
                    <div className="sm:hidden block">
                        <div className="h-40 w-40 bg-muted rounded-lg" />
                    </div>
                    <div className="sm:block hidden">
                        <div className="h-[180px] w-[176px] bg-muted rounded-lg" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full h-4 bg-muted rounded-lg" />
                    <div className="w-1/3 h-4 bg-muted rounded-lg" />
                </div>
            </div>
        </Card>
    );
};

export default GridItemSkeleton;
