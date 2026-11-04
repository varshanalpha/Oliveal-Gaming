import React, { useState } from 'react';
import { CustomerSidebar } from './CustomerSidebar';
import { CustomerHeader } from './CustomerHeader';

interface CustomerShellProps {
  pageTitle: string;
  children: React.ReactNode;
}

export const CustomerShell: React.FC<CustomerShellProps> = ({ pageTitle, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080711] text-foreground flex overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Sidebar Navigation */}
      <CustomerSidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <CustomerHeader
          pageTitle={pageTitle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-3 sm:p-4 lg:p-5 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

