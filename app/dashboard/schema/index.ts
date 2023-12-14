import * as z from "zod";

export const BlogFormSchema = z
  .object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    image_url: z.string().url({ message: "Invalid url" }),
    content: z.string().min(2, {
      message: "Content must be at least 2 characters.",
    }),
    is_published: z.boolean(),
    is_premium: z.boolean(),
  })
  .refine(
    (data) => {
      const image_url = data.image_url;
      try {
        const url = new URL(image_url);
        const regex = /^(?:(\*\.)?[a-zA-Z0-9-]+\.)*unsplash\.com$/;
        if (regex.test(url.hostname)) {
          return url.hostname;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    {
      message: "Currently we are support only the image from unsplash",
      path: ["image_url"],
    },
  );
export type BlogFormSchemaType = z.infer<typeof BlogFormSchema>;
