import React from 'react';

export interface TestComponentProps {
  value: object;
  className?: string;
}
export const TestComponent = ({ value, className }: TestComponentProps) => (
  <pre className={className}>{JSON.stringify(value, null, 2)}</pre>
);

export interface ListProps {
  items: string[];
  className?: string;
}
export const List = ({ items, className }: ListProps) => (
  <ul className={className}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);
