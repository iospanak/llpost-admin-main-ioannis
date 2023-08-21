import React from 'react';

import Tabs, { ITab } from './tabs';

const CategoriesNavigation = () => {
  const tabs: ITab[] = [
    { name: 'Event Categories', href: '/categories/' },
    { name: 'Create Category', href: '/categories/create-category/' },
  ];
  return <div className="mb-8"><Tabs tabs={tabs} /></div>;
};
export default CategoriesNavigation;
