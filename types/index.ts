export interface TabDataProps {
  title: string;
  id: string;
  content: [string];
}

export interface AboutDataProps {
  aboutme: string;
  tabData: [TabDataProps];
  letsConnect: string;
}

export interface HeroSectionDataProps {
  Logo: string;
  header: [];
  summary: string;
  achivementNumbers: [];
}

export interface AchivementDataProps {
  [x: string]: any;
  id: number;
  prefix: string;
  metrix: string;
  value: string;
  postfix: string;
}

export interface ProjectDataProps {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
}

export interface ProjectSectionProps {
  [x: string]: any;
  id: number;
  name: string;
  tag: string;
}

export interface InputFormProps {
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface DataContextProp {
  aboutSectionData: AboutDataProps | null;
  heroSectionData: HeroSectionDataProps | null;
  projectDataSection: ProjectDataProps | null;
  projectSectionData: ProjectSectionProps | null;
  achivementSectionData: AchivementDataProps | null;
  isLoading: boolean;
  error: string | null;
}
