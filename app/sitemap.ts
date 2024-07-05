import { getAllPages } from './utils/getAllPages';

export default async function sitemap() {
    const baseUrl = "https://progra-med.ro";
    const pages = await getAllPages();
    const hardcodedDate = "2024-07-05T00:00:00.000Z"; // Data hardcodata de astăzi

    const sitemap = pages.map((page) => {
        return {
            url: `${baseUrl}${page.slug}`,
            lastModified: hardcodedDate
        };
    });

    return sitemap;
}

