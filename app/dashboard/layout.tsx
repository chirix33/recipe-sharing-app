import Navigation from "@/app/ui/global/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col">
        <Navigation />
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
}