import { redirect } from '@/i18n/navigation';
import { auth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session) {
    redirect({ href: '/login', locale });
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Header />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
