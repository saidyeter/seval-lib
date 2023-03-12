import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query
    const bookId = id ? Array.isArray(id) ? id[0] ?? '' : id : ''
    const bookIdNumber = parseInt(bookId)
    if (Number.isNaN(bookIdNumber)) {
        return res.status(400).json({ err: 'Id as a number is expected' })
    }
    const book = await prisma.book.findFirst({
        where: {
            id: bookIdNumber
        }
    })

    if (!book) {
        return res.status(404).json({ err: 'Book not found' })
    }

    switch (req.method) {
        case 'GET':
            return res.status(200).json(book)

        case 'PUT':
            if (!req.body) {
                return res.status(400).json({ err: 'Body expected' })
            }

            const bodySchema = z.object({
                pageCount: z.number(),
                originalName: z.string(),
                origin: z.string(),
                translator: z.string(),
                print: z.string(),
                obtainedin: z.string(),
                isRead: z.boolean(),
                comment: z.string(),
                name: z.string(),
                kind: z.string(),
                authorEditor: z.string(),
                publishingHouse: z.string()
            })
            const validation = bodySchema.safeParse(req.body)
            if (!validation.success) {
                return res.status(400).json(validation.error)
            }

            const updated = await prisma.book.update({
                where: {
                    id: bookIdNumber
                },
                data: validation.data
            })
            return res.status(200).json(updated)

        case 'DELETE':
            const deleted = await prisma.book.delete({
                where: {
                    id: bookIdNumber
                },
            })
            return res.status(200).json(deleted)

        default:
            break;
    }
    return res.status(400)
}