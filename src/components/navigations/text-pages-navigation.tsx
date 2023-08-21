import React from 'react';

import Tabs, {ITab} from './tabs';

const TextPagesNavigation = () => {
  const tabs: ITab[] = [
    { name: 'Text Pages', href: '/text-pages/' },
    { name: 'Create Text Page', href: '/text-pages/create-text-page/' },
  ]
  return <div className="mb-8"><Tabs tabs={tabs} /></div>;
};

export default TextPagesNavigation;