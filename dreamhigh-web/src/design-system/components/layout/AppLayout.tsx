import React, { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Sidebar />
      <Header />
      <main className="min-h-screen pt-16 md:ml-64">
        <div className="p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
