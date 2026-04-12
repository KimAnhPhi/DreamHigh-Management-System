import React, { type ReactNode } from 'react';

interface PageHeaderProps {
  breadcrumb: { label: string; href?: string }[];
  title: string;
  action?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumb, title, action }) => {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="mb-4">
        <ol className="flex font-label tracking-[0.2em] text-[9px] text-midnight/40 uppercase items-center">
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={idx}>
              <li>
                {item.href ? (
                  <a className="hover:text-gold transition-colors" href={item.href}>{item.label}</a>
                ) : (
                  <span className="text-midnight">{item.label}</span>
                )}
              </li>
              {idx < breadcrumb.length - 1 && <li className="mx-2">/</li>}
            </React.Fragment>
          ))}
        </ol>
      </nav>

      {/* Page Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline italic font-medium text-3xl text-midnight tracking-tight">{title}</h2>
        </div>
        {action}
      </div>
    </>
  );
};
