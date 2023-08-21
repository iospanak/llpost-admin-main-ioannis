import React from 'react';

export default function ColumnHeader({
  pagination, orderBy, onChange, className, children,
}: { orderBy: string, pagination: any, onChange: (e: any) => void, className: string, children: any }) {
  return (
    <th scope="col" className={`${className} cursor-pointer`} onClick={() => onChange(orderBy)}>
      {children}
      {/* eslint-disable-next-line no-nested-ternary */}
      {pagination.orderBy == orderBy ? (pagination.order === 'ASC' ? '↑' : '↓') : ''}
    </th>
  );
}
