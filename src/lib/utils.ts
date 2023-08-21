import momentTZ from 'moment-timezone';

export function classNames(...classes: string[]): string {
  return (classes || []).filter(Boolean).join(' ');
}

// export const fd = (d: string | number | Date) => new Date(d).toLocaleDateString('en-US', {
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
// });

// export const fdt = (d: null | string | number | Date, tz?: string) => (d ? new Date(d).toLocaleDateString('en-US', {
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   hour: 'numeric',
//   minute: 'numeric',
// }) + (tz ? ` (${tz})` : '') : '-');

export const fd = (d: string, tz: string = 'EST') => {
  if (!d) {
    return '-';
  }

  return momentTZ.utc(d).tz(tz).format('ll');
};
export const fdtime = (d: string, tz: string = 'UTC') => {
  if (!d) {
    return '-';
  }

  return momentTZ.utc(d).tz(tz).format('llll');
};

export const fdt = (d: string, tz: string = 'UTC') => {
  if (!d) {
    return '-';
  }

  return momentTZ.utc(d).tz(tz).format('llll') + (tz ? ` (${tz})` : '');
};
