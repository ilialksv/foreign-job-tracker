import type { ReactNode } from "react";

export type ItemsListProps = {
  count: number;
  renderItem: (index: number) => ReactNode;
};

export const ItemsList = ({ count, renderItem }: ItemsListProps) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <span key={index} className="contents">
        {renderItem(index)}
      </span>
    ))}
  </>
);
