export default function Loading({ fullscreen = false }: { fullscreen?: boolean }) {
    return (
        <div
            className={`flex items-center justify-center flex-col my-8 bg-gray-800 ${
                fullscreen
                    ? 'h-screen w-screen'
                    : 'h-full w-full min-h-[10rem] min-w-[10rem] flex-1'
            }`}
        >
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            <p className="text-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent text-xl font-semibold mt-6 tracking-wide">
                Loading<span className="animate-pulse">...</span>
            </p>
        </div>
    );
}