export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      // Nav for all the Recipe Pages
      <div className="flex flex-col h-screen">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl">Recipes</h1>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
}