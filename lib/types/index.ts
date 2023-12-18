export type IBlogDetail = {
  created_at: string;
  id: string;
  image_url: string | null;
  is_premium: boolean;
  is_published: boolean;
  title: string | null;
  blog_content: {
    content: string | null;
    created_at: string;
    id: string;
  } | null;
};

export type IBlog = {
  created_at: string;
  id: string;
  image_url: string | null;
  is_premium: boolean;
  is_published: boolean;
  title: string | null;
} | null;
