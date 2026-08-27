export interface Program {
  slug: string;
  title: string;
  titleEn: string;
  category: "korean" | "japanese" | "exchange";
  description: string;
  descriptionEn: string;
  duration: string;
  image: string;
  features: string[];
}

export const programs: Program[] = [
  {
    slug: "korean-language-culture",
    title: "Ngôn ngữ & Văn hóa Hàn Quốc",
    titleEn: "Korean Language & Culture",
    category: "korean",
    description: "Chương trình đào tạo ngôn ngữ và tìm hiểu văn hóa Hàn Quốc, từ cơ bản đến nâng cao. Giảng viên bản ngữ, phương pháp hiện đại.",
    descriptionEn: "Korean language and culture training program, from beginner to advanced. Native instructors, modern methodology.",
    duration: "12 tháng",
    image: "/images/placeholder/program-korean-1.jpg",
    features: ["Giảng viên bản ngữ", "Chứng chỉ TOPIK", "Giao lưu văn hóa", "Học bổng du học"],
  },
  {
    slug: "korean-business",
    title: "Tiếng Hàn thương mại",
    titleEn: "Business Korean",
    category: "korean",
    description: "Khóa học tiếng Hàn chuyên ngành thương mại, giao tiếp doanh nghiệp, đàm phán và hợp tác kinh doanh Việt-Hàn.",
    descriptionEn: "Business Korean course focusing on corporate communication, negotiation, and Vietnam-Korea business cooperation.",
    duration: "6 tháng",
    image: "/images/placeholder/program-korean-2.jpg",
    features: ["Thương mại quốc tế", "Giao tiếp doanh nghiệp", "Thực tập doanh nghiệp Hàn"],
  },
  {
    slug: "japanese-language-culture",
    title: "Ngôn ngữ & Văn hóa Nhật Bản",
    titleEn: "Japanese Language & Culture",
    category: "japanese",
    description: "Chương trình đào tạo tiếng Nhật toàn diện, kết hợp văn hóa truyền thống và hiện đại Nhật Bản.",
    descriptionEn: "Comprehensive Japanese language training program, combining traditional and modern Japanese culture.",
    duration: "12 tháng",
    image: "/images/placeholder/program-japanese-1.jpg",
    features: ["Giảng viên bản ngữ", "Luyện thi JLPT", "Trà đạo & Thư pháp", "Du học Nhật Bản"],
  },
  {
    slug: "japanese-n2-preparation",
    title: "Luyện thi JLPT N2",
    titleEn: "JLPT N2 Preparation",
    category: "japanese",
    description: "Khóa luyện thi chuyên sâu JLPT N2, cam kết đầu ra. Tài liệu cập nhật, đề thi thử hàng tuần.",
    descriptionEn: "Intensive JLPT N2 preparation course with guaranteed outcomes. Updated materials, weekly mock exams.",
    duration: "4 tháng",
    image: "/images/placeholder/program-japanese-2.jpg",
    features: ["Cam kết đầu ra", "Đề thi thử hàng tuần", "Tài liệu độc quyền"],
  },
  {
    slug: "exchange-program-korea",
    title: "Chương trình trao đổi Hàn Quốc",
    titleEn: "Korea Exchange Program",
    category: "exchange",
    description: "Chương trình trao đổi sinh viên với các trường đại học đối tác tại Hàn Quốc. Thời gian 1-2 học kỳ.",
    descriptionEn: "Student exchange program with partner universities in Korea. Duration: 1-2 semesters.",
    duration: "1-2 học kỳ",
    image: "/images/placeholder/program-exchange-1.jpg",
    features: ["Học bổng toàn phần", "Công nhận tín chỉ", "Hỗ trợ visa", "Ở ký túc xá"],
  },
  {
    slug: "exchange-program-japan",
    title: "Chương trình trao đổi Nhật Bản",
    titleEn: "Japan Exchange Program",
    category: "exchange",
    description: "Chương trình trao đổi sinh viên với các trường đại học đối tác tại Nhật Bản. Trải nghiệm văn hóa thực tế.",
    descriptionEn: "Student exchange program with partner universities in Japan. Real cultural experience.",
    duration: "1-2 học kỳ",
    image: "/images/placeholder/program-exchange-2.jpg",
    features: ["Học bổng JASSO", "Công nhận tín chỉ", "Thực tập doanh nghiệp", "Homestay"],
  },
];

export function getProgramsByCategory(category?: string): Program[] {
  if (!category || category === "all") return programs;
  return programs.filter((p) => p.category === category);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
