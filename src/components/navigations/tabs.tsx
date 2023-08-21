import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { classNames } from '../../lib/utils';

export interface ITab {
  name: string;
  href: string
}

export default function Tabs({ tabs }: { tabs: ITab[] }) {
  const router = useRouter();

  return (
    <div className="pb-5 border-b border-gray-200 sm:pb-0">
      <div className="mt-3 sm:mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={(tabs.find((tab) => router.asPath === tab.href) || { name: '' }).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
              >
                <div
                  className={classNames(
                    router.asPath === tab.href
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm cursor-pointer',
                  )}
                  aria-current={router.asPath === tab.href ? 'page' : undefined}
                >
                  {tab.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
