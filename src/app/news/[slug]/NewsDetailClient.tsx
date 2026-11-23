"use client";

import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { NewsArticle } from "@/data/news"; // Đảm bảo trong file này đã thêm trường content và contentEn
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NewsDetailClient({ article }: { article: NewsArticle }) {
  const { locale, t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <Button href="/news" variant="ghost" size="sm" className="mb-8">
          <ArrowLeft className="w-4 h-4" /> {t.nav?.news || "Tin tức"}
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Nếu bạn đã thêm cột categoryEn, bạn có thể sửa thành: locale === "vi" ? article.category : article.categoryEn */}
            <Badge>{article.category}</Badge>
            <span className="text-sm text-neutral-500 flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-primary-500" />
              {article.date}
            </span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: locale === "vi" ? article.title : article.titleEn,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert(locale === "vi" ? "Đã sao chép liên kết vào bộ nhớ tạm!" : "Link copied to clipboard!");
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> {locale === "vi" ? "Chia sẻ" : "Share"}
          </button>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-8 leading-tight tracking-tight">
          {locale === "vi" ? article.title : article.titleEn}
        </h1>

        <div className="aspect-[2/1] rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 shadow-xl flex flex-col items-center justify-center p-8 text-white mb-10 text-center border border-primary-400/20">
          <span className="text-5xl mb-3">📰</span>
          <p className="text-xl font-heading font-bold max-w-lg">
            {locale === "vi" ? article.title : article.titleEn}
          </p>
        </div>

        <div className="prose prose-neutral prose-lg max-w-none text-neutral-800 leading-relaxed space-y-6">
          <p className="text-xl font-medium text-neutral-700 leading-relaxed border-l-4 border-accent-400 pl-4 py-1 italic bg-neutral-50 rounded-r-xl">
            {locale === "vi" ? article.excerpt : article.excerptEn}
          </p>

          {/* ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT ĐÃ ĐƯỢC SỬA */}
          {/* Lớp whitespace-pre-wrap giúp giữ lại các khoảng xuống dòng từ Google Sheets */}
          <div className="whitespace-pre-wrap">
            {locale === "vi" ? article.content : article.contentEn}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Tag className="w-4 h-4 text-primary-500" />
            <span>{locale === "vi" ? "Chủ đề:" : "Topic:"} {article.category}</span>
          </div>
          <Button href="/admissions" size="md">
            {locale === "vi" ? "Đăng ký tham gia ngay" : "Register Now"}
          </Button>
        </div>
      </Container>
    </section>
  );
}