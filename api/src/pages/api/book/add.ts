import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(400).json({ err: 'POST request expoected' })
    }

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
    if(!validation.success){
        return res.status(400).json(validation.error)
    }

    const created = await prisma.book.create({
        data: validation.data
    })

    return res.status(200).json(created)
}