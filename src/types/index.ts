export type SectionType = 'text' | 'image' | 'button';

export type Theme = 'light' | 'dark';

export interface TextSectionData {
  heading: string;
  body: string;
}

export interface ImageSectionData {
  src: string;
  alt: string;
}

export interface ButtonSectionData {
  label: string;
  href: string;
}

export type SectionData = TextSectionData | ImageSectionData | ButtonSectionData;

export interface Section {
  id: string;
  type: SectionType;
  data: SectionData;
}

export interface Page {
  id: string | "  ";
  name: string;
  path: string;
  sections: Section[];
  updatedAt: number;
}

export interface Project {
  id: string;
  name: string;
  theme: Theme;
  pages: Page[];
}
