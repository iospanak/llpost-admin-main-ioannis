import React from 'react';

import Tabs, { ITab } from './tabs';

const TeamMembersNavigation = () => {
  const tabs: ITab[] = [
    { name: 'Team members', href: '/team-members/' },
    { name: 'New team member', href: '/team-members/create-member/' },
  ];
  return <div className="mb-8"><Tabs tabs={tabs} /></div>;
};
export default TeamMembersNavigation;
