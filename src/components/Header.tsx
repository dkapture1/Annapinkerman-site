'use client';

import Link from 'next/link';

export default function Header() {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About me', href: '#about-me' },
    { name: 'Party', href: '#party' },
    { name: 'Messages', href: '/messages' },
    { name: 'Memories', href: '#memories' },
    { name: 'Real Time Photos', href: '#real-time-photos' },
  ];

  return (
    <header className="bg-white/30 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo/Nome */}
          <div className="flex-shrink-0">
            <h1 className="text-4xl font-script text-gray-800 drop-shadow-sm">
              Anna Pinkerman
            </h1>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 hover:text-primary-pink font-sans font-semibold transition-colors duration-200 hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-pink">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 