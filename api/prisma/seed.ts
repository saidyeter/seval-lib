import { book, PrismaClient } from "@prisma/client";
import fs from 'fs'
import readline from 'readline';

const prisma = new PrismaClient()
export async function main() {
    console.log('books');

    const books = await getBooks({
        pageSize: 9999
    })
    if (!Array.isArray(books)) {
        return
    }
    const res = await prisma.book.createMany({
        data:books 
    })
    console.log(res);
    
}


interface GetBooksQueryParams {
    authorContains?: string
    publishingHouseContains?: string
    nameContains?: string
    pageSize?: number
    pageNumber?: number
}

async function getBooks(params: GetBooksQueryParams): Promise<book[] | string> {
    try {
        console.log(process.cwd());

        const path = process.cwd() + '/prisma/books.csv'
        const size = params.pageSize ?? 10
        const books = await getLinesFromCsv<book>(path, size, function (linestr, index) {

            const row = parse(linestr)
            if (!row) {
                return undefined
            }

            const obj: book = {
                id: index,
                name: row[0] ?? '',
                originalName: row[1] ?? '',
                kind: row[2] ?? '',
                authorEditor: row[3] ?? '',
                origin: row[4] ?? '',
                translator: row[5] ?? '',
                publishingHouse: row[6] ?? '',
                print: row[7] ?? '',
                pageCount: row[8] ? parseInt(row[8] ?? '') : -1,
                obtainedin: row[9] ?? '',
                isRead: row[10]?.includes('✔') ?? false,
                comment: row[11] ?? '',
            }
            return obj
        })


        return books
    } catch (error) {
        return JSON.stringify(error)
    }
}

async function getLinesFromCsv<T>(csvPath: string, count: number, filter: (lineStr: string, index: number) => T | undefined): Promise<T[]> {

    // const rs = fs.createReadStream('resource/books.csv');
    const rs = fs.createReadStream(csvPath);

    const rl = readline.createInterface({ input: rs });

    let allLines: T[] = []
    await (async () => {

        let counter = 0

        for await (const line of rl) {
            counter++
            const data = filter(line, counter)
            if (data != undefined) {
                allLines.push(data)
            }
            if (allLines.length >= count) {
                break
            }
        }
    })();

    return allLines
}

export function parse(str: string) {

    const columns: string[] = []
    const seperator = ','
    const grouper = '"'
    let next = seperator
    let currentcol: string[] = []
    let skipChar = false
    for (const index in str.split('')) {
        if (skipChar) {
            skipChar = false
            continue
        }
        const ch = str[index];
        if (ch == next) {
            columns.push(currentcol.join(''))
            currentcol = []
            if (next == grouper) {
                skipChar = true
            }
            next = seperator

        }
        else if (ch == grouper) {
            next = grouper
        }
        else {
            currentcol.push(ch ?? '')
        }
    }
    return columns

}





main()
    .then(() => {
        process.exit(0)
    })
    .catch(e => {
        console.log(e);
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })
