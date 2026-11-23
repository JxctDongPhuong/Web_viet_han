import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";

const API_URL = "https://script.google.com/macros/s/AKfycbxXlwsAgGNIM0k0yh84EcxW_4f6AS120rcuw6B38-fKWtZxhPYwjoazgLnNXvKQ5DNN/exec?sheet=news";

// Hàm hỗ trợ gọi API và tìm bài viết theo slug
async function getArticleFromSheets(slug: string) {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return null;
    const data = await res.json();
    return data.find((item: any) => item.slug === slug);
  } catch (error) {
    console.error("Lỗi lấy dữ liệu chi tiết:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();

    // 1. Kiểm tra xem data có thực sự là một mảng không
    if (!Array.isArray(data)) {
      console.error("Dữ liệu API không phải là mảng:", data);
      return [];
    }

    return data
      .filter((article: any) => article.slug != null && String(article.slug).trim() !== "")
      .map((article: any) => ({
        slug: String(article.slug).trim(), 
      }));
  } catch (error) {
    console.error("Lỗi khi tạo static params từ API:", error);
    return [];
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Đã sửa: Lấy metadata từ Google Sheets
  const article = await getArticleFromSheets(slug);
  
  if (!article) return { title: "Bài viết không tồn tại" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Đã sửa: Lấy nội dung bài viết từ Google Sheets
  const article = await getArticleFromSheets(slug);

  if (!article) {
    notFound();
  }

  // Chú ý: Đảm bảo format của article từ Google Sheets khớp với props mà NewsDetailClient yêu cầu
  return <NewsDetailClient article={article} />;
}