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

export type Iuser = {
  created_at: string;
  display_name: string;
  email: string;
  id: string;
  image_url: string;
  role: string;
  stripe_customer_id: string | null;
  stripe_subscriptoin_id: string | null;
  subscription_status: boolean;
} | null;
