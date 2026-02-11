import ContentSection from "../ui/ContentSection";
import existAndHasItems from "../../helpers/existAndHasItems";
import React from "react";

type SearchSectionProps<T> = {
  title: string;
  items?: T[];
  children: (items: T[]) => React.ReactNode;
};

function SearchSection<T>({ title, items, children }: SearchSectionProps<T>) {
  if (!existAndHasItems(items)) return null;

  return <ContentSection title={title}>{children(items)}</ContentSection>;
}

export default SearchSection;
