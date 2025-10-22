import { SidebarProvider } from '@/components/ui/sidebar';
import AppSideBar from './component/side-bar/AppSideBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSideBar />
      {children}
    </SidebarProvider>
  );
}
