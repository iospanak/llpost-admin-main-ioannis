import React from 'react';

import Tabs, { ITab } from './tabs';

const PostsNavigation = () => {
  const tabs: ITab[] = [
    { name: 'Posts', href: '/posts/' },
    { name: 'Create Post', href: '/posts/create-post/' },
  ];
  return <div className="mb-8"><Tabs tabs={tabs} /></div>;
};
export default PostsNavigation;
