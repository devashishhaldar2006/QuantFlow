import Sidebar from "../navigation/Sidebar";
import TopNavbar from "./TopNavbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="min-w-0 md:pl-[240px]">
        <TopNavbar />

        <main className="min-h-[calc(100vh-56px)]">
          {children}
        </main>
      </div>
    </div>
  );
}