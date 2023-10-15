export interface Post {
  title: string;
  publishedDate: string;
  tagList: string[];
  description: string;
  id: string | number;
  slug: string;
  author?: Author;
  mdContent?: string;
  htmlContent?: string;
}

export interface Author {
  name: string;
  title: string;
  profileUrl: string;
  avatarUrl: string;
}
