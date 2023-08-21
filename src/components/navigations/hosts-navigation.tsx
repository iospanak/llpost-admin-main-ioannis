import React from 'react';

import Tabs, { ITab } from './tabs';

const HostsNavigation = () => {
  const tabs: ITab[] = [
    { name: 'Hosts', href: '/hosts/' },
    { name: 'Create Host', href: '/hosts/create-host/' },
  ];
  return <div className="mb-8"><Tabs tabs={tabs} /></div>;
};
export default HostsNavigation;
