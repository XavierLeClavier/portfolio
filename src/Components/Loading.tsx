export default function Loading({ fullscreen = false }: { fullscreen?: boolean }) {
    return (
        // Inspired by a component from Uiverse.io by yohohopizza
        <div
            className={`flex flex-row gap-2 items-center justify-center bg-gray-800 ${fullscreen
                ? 'h-screen w-screen'
                : 'h-full w-full min-h-[10rem] min-w-[10rem] flex-1'
            }`}
        >
            <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
    );
}