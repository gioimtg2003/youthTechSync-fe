import { SidebarProvider } from '@/components/ui/sidebar';
import AppSideBar from './component/side-bar/AppSideBar';

export const metadata = {
  title: 'App Page',
  description: 'This is the app page',
};

export default function AppPage() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main></main>
    </SidebarProvider>
  );
}
