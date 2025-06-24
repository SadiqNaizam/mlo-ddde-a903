import React from 'react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-800 bg-background">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-muted-foreground sm:flex-row">
            <p>
                Data provided by financial exchanges and may be delayed.
                {' '}
                Not for trading purposes.
            </p>
            <p>
                &copy; {currentYear} Stox Inc. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;