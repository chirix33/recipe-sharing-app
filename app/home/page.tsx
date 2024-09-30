export default function Page() {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-blue-500 text-white p-4">
            <h1 className="text-2xl">Home</h1>
            </header>
            <main className="flex-1 p-4">
            <p className="text-lg">Welcome to the home page!</p>
            </main>
        </div>
    );
}