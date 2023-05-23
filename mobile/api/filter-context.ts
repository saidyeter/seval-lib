
import { createContext } from "react";
import { z } from "zod";


export const FilterParamsSchema = z.object({
    id: z.number().optional(),
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


export const FilterContext = createContext({} as 
    [
        z.infer<typeof FilterParamsSchema>, 
        React.Dispatch<React.SetStateAction<z.infer<typeof FilterParamsSchema>>>
    ]);