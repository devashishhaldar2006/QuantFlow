import Sidebar from "../navigation/Sidebar";
import TopNavbar from "./TopNavbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}