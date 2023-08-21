import React from 'react';

import Tabs, { ITab } from './tabs';

const PartnersNavigation = () => {
  const tabs: ITab[] = [
    { name: 'Partners', href: '/partners/' },
    { name: 'New partner', href: '/partners/create-partner/' },
  ];
  return <div className="mb-8"><Tabs tabs={tabs} /></div>;
};
export default PartnersNavigation;
