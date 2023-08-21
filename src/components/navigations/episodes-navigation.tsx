import React from 'react';

import Tabs, { ITab } from './tabs';

const EpisodesNavigation = () => {
  const tabs: ITab[] = [
    { name: 'Episodes', href: '/episodes/' },
    { name: 'Create Episode', href: '/episodes/create-episode/' },
  ];
  return <div className="mb-8"><Tabs tabs={tabs} /></div>;
};
export default EpisodesNavigation;
