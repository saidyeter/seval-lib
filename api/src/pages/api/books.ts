import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
console.log('handler',req.query);

    if (req.method !== 'GET') {
        return res.status(400).json({ err: 'GET request expoected' })
    }

    const _pageSize = req.query.pageSize ? Array.isArray(req.query.pageSize) ? req.query.pageSize[0] ?? undefined : req.query.pageSize : undefined
    let pageSize = _pageSize && !Number.isNaN(parseInt(_pageSize)) ? parseInt(_pageSize) : 30
    if (pageSize < 1 || pageSize > 30) {
        pageSize = 30
    }

    const _pageNumber = req.query.pageNumber ? Array.isArray(req.query.pageNumber) ? req.query.pageNumber[0] ?? undefined : req.query.pageNumber : undefined
    let pageNumber = _pageNumber && !Number.isNaN(parseInt(_pageNumber)) ? parseInt(_pageNumber) - 1 : 0
    if (pageNumber < 0) {
        pageNumber = 0
    }

    const filters = createFilter(req)
    const books = await prisma.book.findMany({
        where: filters,
        skip: pageNumber * pageSize,
        take: pageSize
    })
    const totalCount = await prisma.book.count({
        where: filters
    })
    const pageCount = Math.round(totalCount / pageSize)

    return res.status(200).json({
        totalCount,
        pageCount,
        pageSize,
        currentPage: pageNumber+1,
        hasNextPage: pageCount > pageNumber+1,
        itemsCount: books.length,
        items: books
    })
}

function createFilter(req: NextApiRequest) {

    const originalName = req.query.originalName ? Array.isArray(req.query.originalName) ? req.query.originalName[0] ?? undefined : req.query.originalName : undefined
    const origin = req.query.origin ? Array.isArray(req.query.origin) ? req.query.origin[0] ?? undefined : req.query.origin : undefined
    const translator = req.query.translator ? Array.isArray(req.query.translator) ? req.query.translator[0] ?? undefined : req.query.translator : undefined
    const print = req.query.print ? Array.isArray(req.query.print) ? req.query.print[0] ?? undefined : req.query.print : undefined
    const obtainedin = req.query.obtainedin ? Array.isArray(req.query.obtainedin) ? req.query.obtainedin[0] ?? undefined : req.query.obtainedin : undefined
    const _isRead = req.query.isRead ? Array.isArray(req.query.isRead) ? req.query.isRead[0] ?? undefined : req.query.isRead : undefined
    const isRead = _isRead ? _isRead.toLocaleLowerCase() === 'true' : undefined
    const comment = req.query.comment ? Array.isArray(req.query.comment) ? req.query.comment[0] ?? undefined : req.query.comment : undefined
    const name = req.query.name ? Array.isArray(req.query.name) ? req.query.name[0] ?? undefined : req.query.name : undefined
    const kind = req.query.kind ? Array.isArray(req.query.kind) ? req.query.kind[0] ?? undefined : req.query.kind : undefined
    const authorEditor = req.query.authorEditor ? Array.isArray(req.query.authorEditor) ? req.query.authorEditor[0] ?? undefined : req.query.authorEditor : undefined
    const publishingHouse = req.query.publishingHouse ? Array.isArray(req.query.publishingHouse) ? req.query.publishingHouse[0] ?? undefined : req.query.publishingHouse : undefined
    const _pageCount = req.query.pageCount ? Array.isArray(req.query.pageCount) ? req.query.pageCount[0] ?? undefined : req.query.pageCount : undefined
    const pageCount = _pageCount && !Number.isNaN(parseInt(_pageCount)) ? parseInt(_pageCount) : undefined

    return {
        originalName: originalName ? { contains: originalName } : undefined,
        origin: origin ? { contains: origin } : undefined,
        translator: translator ? { contains: translator } : undefined,
        print: print ? { contains: print } : undefined,
        obtainedin: obtainedin ? { contains: obtainedin } : undefined,
        isRead: isRead ? { equals: isRead } : undefined,
        comment: comment ? { contains: comment } : undefined,
        name: name ? { contains: name } : undefined,
        kind: kind ? { contains: kind } : undefined,
        authorEditor: authorEditor ? { contains: authorEditor } : undefined,
        publishingHouse: publishingHouse ? { contains: publishingHouse } : undefined,
        pageCount: pageCount ? { equals: pageCount } : undefined,
    }
}