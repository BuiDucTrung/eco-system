export interface Work {
  id: string;
  title: string;
  tagList: string[];
  shortDescription: string;
  fullDescription: string;
  createdAt: string | number;
  updatedAt: string | number;
  thumbnailURL: string;
}
