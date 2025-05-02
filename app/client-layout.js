"use client";

import { usePathname } from 'next/navigation';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';

export default function ClientLayout({ children}) {
    const pathname = usePathname();
    const isDashboardPage = pathname.startsWith('/dashboard');

    return (
        <>
            {!isDashboardPage && <Navigation />}
                <main className="flex-grow">{children}</main>
            {!isDashboardPage && <Footer />}
        </>
    );
}
