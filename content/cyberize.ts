import raw from './cyberize.json';

export const contactProvisional: boolean = true;
type ContentGroups = Record<string, Record<string, string>>;
const groups: ContentGroups = raw;
export function content(group: string, field: string): string {
  const value = groups[group]?.[field];
  if (value === undefined) throw new Error(`Missing content: ${group}.${field}`);
  return value;
}
const routes: Record<string, string> = {
  'home.html': '/', 'seo.html': '/seo-services/', 'ppc.html': '/ppc/',
  'web-design.html': '/website-design/', 'web-development.html': '/web-development/',
  'website-support.html': '/website-support/', 'contact.html': '/contact/',
};
export function destination(value: string): string {
  if (value.startsWith('assets/')) return `/cyberize/${value}`;
  const [path, hash] = value.split('#');
  return (routes[path] ?? path) + (hash === undefined ? '' : `#${hash}`);
}
