import { z } from "zod";

export const userSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "Username is required.",
      })
      .min(3, {
        message: "Username must be at least 3 characters long.",
      }),
    email: z
      .string({ required_error: "Email is required." })
      .email("Not a valid email"),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." }),
  }),
});

export const blogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required." }).min(3, {
      message: "Title should be at least 3 characters long.",
    }),
    summary: z.string({ required_error: "Summary is required." }).min(3, {
      message: "Summary should be at least 3 characters long.",
    }),
    content: z.string({ required_error: "Content is required." }).min(10, {
      message: "Content should be at least 10 characters long.",
    }),
    author: z.string({ required_error: "Author is required." }),
    authorId: z.string({ required_error: "Author ID is required." }),
  }),
});
