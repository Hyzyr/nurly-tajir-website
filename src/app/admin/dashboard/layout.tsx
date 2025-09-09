import '@/UI/assets/css/main.scss';
import HeaderDashboard from '@/UI/base/Header/HeaderDashboard';
import AdminGuard from './AdminGuard';

type RootPropsType = {
  children: React.ReactNode;
};

export default async function Layout({ children }: RootPropsType) {
  return (
    <AdminGuard>
      <HeaderDashboard />
      {children}
    </AdminGuard>
  );
}
