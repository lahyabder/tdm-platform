import { promises as fs } from 'fs';
import path from 'path';

export async function getPageContent(locale: string, page: string) {
    const filePath = path.join(process.cwd(), 'src/content', locale, `${page}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export async function getServiceDetailContent(locale: string, id: string) {
    const filePath = path.join(process.cwd(), 'src/content', locale, 'services', `${id}.json`);
    try {
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        return null; // Return null if file not found
    }
}
