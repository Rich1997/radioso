const AnimatedWave = () => {
    return (
        <div className="flex h-full items-center justify-center px-2">
            <div
                className="animate-wave mx-0.5 h-2 w-1 rounded bg-foreground/70"
                style={{ animationDelay: "-0.4s" }}
            ></div>
            <div
                className="animate-wave mx-0.5 h-3 w-1 rounded bg-foreground/70"
                style={{ animationDelay: "-0.2s" }}
            ></div>
            <div className="animate-wave mx-0.5 h-4 w-1 rounded bg-foreground/70"></div>
        </div>
    );
};

export default AnimatedWave;
