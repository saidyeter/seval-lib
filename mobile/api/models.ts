import { z } from "zod";


export const bookSchema = z.object({
    pageCount: z.number().optional(),
    originalName: z.string().optional(),
    origin: z.string().optional(),
    translator: z.string().optional(),
    print: z.string().optional(),
    obtainedin: z.string().optional(),
    isRead: z.boolean().optional(),
    comment: z.string().optional(),
    name: z.string().optional(),
    kind: z.string().optional(),
    authorEditor: z.string().optional(),
    publishingHouse: z.string().optional(),
})