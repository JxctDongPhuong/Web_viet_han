export interface NewsArticle {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  category: "announcement" | "event" | "scholarship";
  date: string;
  image: string;
  featured: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "tuyen-sinh-khoa-moi-2026",
    title: "Thông báo tuyển sinh khóa mới 2026",
    titleEn: "New Course Enrollment 2026 Announcement",
    excerpt: "Trung tâm Việt Hàn Nhật thông báo mở đăng ký khóa học mới cho năm 2026. Nhiều ưu đãi hấp dẫn cho học viên đăng ký sớm.",
    excerptEn: "The Vietnam-Korea-Japan Center announces new course registration for 2026. Many attractive offers for early registrants.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    category: "announcement",
    date: "2026-08-20",
    image: "/images/placeholder/news-1.jpg",
    featured: true,
  },
  {
    slug: "le-hoi-van-hoa-han-nhat",
    title: "Lễ hội giao lưu văn hóa Hàn - Nhật 2026",
    titleEn: "Korean-Japanese Cultural Festival 2026",
    excerpt: "Sự kiện giao lưu văn hóa thường niên quy tụ sinh viên và giảng viên từ ba nước Việt Nam, Hàn Quốc và Nhật Bản.",
    excerptEn: "Annual cultural exchange event bringing together students and faculty from Vietnam, Korea, and Japan.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "event",
    date: "2026-08-15",
    image: "/images/placeholder/news-2.jpg",
    featured: false,
  },
  {
    slug: "hoc-bong-du-hoc-han-quoc",
    title: "Học bổng du học Hàn Quốc kỳ Xuân 2027",
    titleEn: "Korea Study Abroad Scholarship Spring 2027",
    excerpt: "Cơ hội nhận học bổng toàn phần du học Hàn Quốc tại các trường đại học đối tác. Hạn nộp hồ sơ: 30/11/2026.",
    excerptEn: "Full scholarship opportunity to study in Korea at partner universities. Application deadline: November 30, 2026.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "scholarship",
    date: "2026-08-10",
    image: "/images/placeholder/news-3.jpg",
    featured: false,
  },
  {
    slug: "ky-thi-jlpt-thang-12",
    title: "Hướng dẫn đăng ký thi JLPT tháng 12/2026",
    titleEn: "JLPT December 2026 Registration Guide",
    excerpt: "Thông tin chi tiết về kỳ thi năng lực tiếng Nhật JLPT tháng 12/2026 và hướng dẫn đăng ký.",
    excerptEn: "Details about the JLPT December 2026 exam and registration instructions.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "announcement",
    date: "2026-08-05",
    image: "/images/placeholder/news-4.jpg",
    featured: false,
  },
  {
    slug: "hoc-bong-jasso-2027",
    title: "Học bổng JASSO du học Nhật Bản 2027",
    titleEn: "JASSO Scholarship Japan 2027",
    excerpt: "Thông tin về chương trình học bổng JASSO cho sinh viên trao đổi tại Nhật Bản năm 2027.",
    excerptEn: "Information about the JASSO scholarship program for exchange students in Japan 2027.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "scholarship",
    date: "2026-07-28",
    image: "/images/placeholder/news-5.jpg",
    featured: false,
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
