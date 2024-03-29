import { z } from "zod";

export const userRegistrationSchema = z.object({
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

export const userLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required." })
      .email("Not a valid email"),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." }),
  }),
});

export const userProfileUpdateSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, {
        message: "New Username must be at least 3 characters long.",
      })
      .optional(),
    email: z.string().email("Not a valid email").optional(),
  }),
});

export const userPwdUpdateSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: "Old password is required" })
      .min(8, { message: "Old password must be at least 8 characters long." }),
    newPwd: z
      .string({ required_error: "New password is required." })
      .min(8, { message: "New password must be at least 8 characters long." }),
    confirmNewPwd: z
      .string({ required_error: "Confirming new password is required." })
      .min(8, {
        message: "Confirming new password must be at least 8 characters long.",
      }),
  }),
});

export const createBlogSchema = z.object({
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
    tags: z.string({ required_error: "At least 1 tag is required" }).array(),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, {
        message: "Title should be at least 3 characters long.",
      })
      .optional(),
    summary: z
      .string()
      .min(3, {
        message: "Summary should be at least 3 characters long.",
      })
      .optional(),
    content: z
      .string()
      .min(10, {
        message: "Content should be at least 10 characters long.",
      })
      .optional(),
    author: z.string({ required_error: "Author is required." }).optional(),
    authorId: z.string({ required_error: "Author ID is required." }).optional(),
  }),
});
