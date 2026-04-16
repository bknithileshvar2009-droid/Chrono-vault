import { SVGProps } from 'react';

export const SpiderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 10c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
    <path d="M12 2v8" />
    <path d="M12 14v8" />
    <path d="m17 7-2.5 2.5" />
    <path d="m7 7 2.5 2.5" />
    <path d="m17 17-2.5-2.5" />
    <path d="m7 17 2.5-2.5" />
  </svg>
);
