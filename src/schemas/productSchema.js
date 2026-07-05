import { z } from "zod";
import { categories } from "../data/products";

// exclude "All" — that's a filter option, not a real category a product
// can belong to
const validCategories = categories.filter((c) => c !== "All");

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(80, "Name is too long"),

  category: z.enum(validCategories, {
    error: "Select a category",
  }),

  price: z.coerce
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(1000000, "That price looks too high"),

  stock: z.coerce
    .number({ error: "Stock must be a number" })
    .int("Stock must be a whole number")
    .min(0, "Stock can't be negative"),

  image: z.string().trim().url("Enter a valid image URL"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
});