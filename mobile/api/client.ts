import { z } from "zod";
import { bookSchema } from "./models";

export default {
    books,
    // add,
    // update
}


const baseUrl ='http://localhost:3000/api'



const paginationSchema= z.object({
    pageNumber:z.number().optional(),
    pageSize: z.number().optional(),
})

const booksParams = paginationSchema.merge(bookSchema)

const booksResultSchema  = z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    items: bookSchema.array()
})

async function books(params: z.infer<typeof booksParams>):Promise< z.infer<typeof booksResultSchema> | undefined >{
    
    const query= Object.entries(params).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
    const url =baseUrl+ '/books/?' + query
    const res = await fetch(url)
    const resJson = await res.json()
    const validation = booksResultSchema.safeParse(resJson)
    if (validation.success) {
        return validation.data
    }
    console.log('books validation error',validation.error);
    return undefined
    
}