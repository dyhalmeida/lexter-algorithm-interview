export interface IOutputProps {
  entryId: number;
  fullPath: string;
  currentPath: string;
  children: IOutputProps[];
}
