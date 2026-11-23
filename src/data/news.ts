export interface NewsArticle {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content?: string;
  contentEn?: string;
  category: "announcement" | "event" | "scholarship" | string;
  date: string;
  image?: string;
  featured?: boolean;
}

// Link API Google Sheets của bạn
const API_URL = "https://script.google.com/macros/s/AKfycbxXlwsAgGNIM0k0yh84EcxW_4f6AS120rcuw6B38-fKWtZxhPYwjoazgLnNXvKQ5DNN/exec?sheet=news";

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.filter((item: any) => item.slug && String(item.slug).trim() !== "");
  } catch (error) {
    console.error("Lỗi lấy danh sách tin tức từ Sheets:", error);
    return [];
  }
}
export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  try {
    const articles = await getNewsArticles();
    return articles.find((a) => String(a.slug).trim() === String(slug).trim());
  } catch (error) {
    console.error("Lỗi lấy chi tiết bài viết:", error);
    return undefined;
  }
}
