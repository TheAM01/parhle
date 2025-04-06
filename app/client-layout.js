"use client";

import { usePathname } from 'next/navigation';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { SessionProvider } from 'next-auth/react';

export default function ClientLayout({ children}) {
    const pathname = usePathname();
    const isDashboardPage = pathname.startsWith('/dashboard');

    return (
        <SessionProvider>
            {!isDashboardPage && <Navigation />}
                <main className="flex-grow">{children}</main>
            {!isDashboardPage && <Footer />}
        </SessionProvider>
    );
}
