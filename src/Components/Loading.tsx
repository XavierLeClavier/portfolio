export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            <p className="text-gray-700 text-lg mt-4">Loading...</p>
        </div>
    );
}