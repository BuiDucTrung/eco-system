export interface Work {
  id: string;
  title: string;
  tagList: string[];
  shortDescription: string;
  fullDescription: string;
  createdAt: string | number;
  updatedAt: string | number;
  thumbnailUrl: string;
}

export interface WorkFilterPayload {
  title_like: string;
  tagList_search: string;
  selectedTagList?: string[]; //temp value to store autocomplate value,
}
