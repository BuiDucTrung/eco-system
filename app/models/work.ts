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

export interface WorkPayload {
  title: string;
  shortDescription: string;
  tagList: string[];
  thumbnail: null | {
    file: File;
    previewUrl: string;
  };
}

export interface WorkFilterPayload {
  title_like: string;
  tagList_like: string;
  selectedTagList?: string[]; //temp value to store autocomplate value,
}
