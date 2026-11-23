"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye, BookOpen, Award, Users, Globe2, Loader2 } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Đổi tham số cuối thành ?sheet=about
const API_URL = "https://script.google.com/macros/s/AKfycbxXlwsAgGNIM0k0yh84EcxW_4f6AS120rcuw6B38-fKWtZxhPYwjoazgLnNXvKQ5DNN/exec?sheet=about";

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const [content, setContent] = useState<Record<string, { vi: string; en: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();

        // Chuyển dữ liệu từ mảng thành object theo "Mã nội dung"
        const contentMap: Record<string, { vi: string; en: string }> = {};
        data.forEach((row: any) => {
          if (row["Mã nội dung"]) {
            contentMap[row["Mã nội dung"]] = {
              vi: row["Tiếng Việt"] || "",
              en: row["Tiếng Anh"] || "",
            };
          }
        });
        setContent(contentMap);
      } catch (error) {
        console.error("Lỗi tải trang Giới thiệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  // Hàm lấy text: Ưu tiên lấy từ Google Sheets, nếu chưa load xong thì dùng chữ dự phòng (fallback)
  const getText = (key: string, fallbackVi: string, fallbackEn: string) => {
    if (!content[key]) return locale === "vi" ? fallbackVi : fallbackEn;
    return locale === "vi" ? content[key].vi : content[key].en;
  };

  return (
    <section className="section-padding bg-white min-h-screen">
      <Container>
        <SectionHeading
          title={getText("tieu_de_chinh", t.about?.title || "Về Chúng Tôi", "About Us")}
          subtitle={getText(
            "phu_de",
            "Cầu nối giáo dục, giao lưu văn hóa và phát triển nguồn nhân lực chất lượng cao giữa Việt Nam và Hàn Quốc.",
            "An educational bridge, cultural exchange, and high-quality human resource development between Vietnam and Korea."
          )}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Intro */}
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <p className="text-lg text-neutral-700 leading-relaxed">
                {getText(
                  "mo_ta_chinh",
                  "Trung Tâm Việt - Hàn là đơn vị trực thuộc Trường Đại học Mở TP.HCM, có sứ mệnh đẩy mạnh hợp tác quốc tế, đào tạo ngôn ngữ và giao lưu văn hóa song phương giữa hai quốc gia.",
                  "The Vietnam - Korea Center is an affiliated unit of Ho Chi Minh City Open University, with the mission of promoting international cooperation, language training, and bilateral cultural exchange between the two countries."
                )}
              </p>
            </div>

            {/* Mission / Vision Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  icon: Target,
                  title: getText("su_menh_tieu_de", t.about?.mission || "Sứ mệnh", "Our Mission"),
                  text: getText(
                    "su_menh_mo_ta",
                    "Xây dựng cầu nối văn hóa và giáo dục bền vững giữa Việt Nam và Hàn Quốc. Đào tạo nguồn nhân lực trẻ tài năng, am hiểu văn hóa và thành thạo tiếng Hàn.",
                    "Building a sustainable cultural and educational bridge between Vietnam and Korea. Training talented young human resources who are knowledgeable about the culture and proficient in Korean."
                  ),
                },
                {
                  icon: Eye,
                  title: getText("tam_nhin_tieu_de", t.about?.vision || "Tầm nhìn", "Our Vision"),
                  text: getText(
                    "tam_nhin_mo_ta",
                    "Trở thành trung tâm kiểu mẫu hàng đầu khu vực phía Nam về nghiên cứu, giao lưu văn hóa và liên kết đào tạo quốc tế với các trường đại học hàng đầu tại Hàn Quốc.",
                    "To become a leading exemplary center in the Southern region for research, cultural exchange, and international joint training with top universities in Korea."
                  ),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral-50 rounded-3xl p-8 md:p-10 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-base">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: Award,
                  title: locale === "vi" ? "Chứng nhận chuẩn quốc tế" : "International Standard Certification",
                  desc: locale === "vi" 
                    ? "Giáo trình cập nhật theo khung năng lực chuẩn TOPIK và chuẩn quốc tế." 
                    : "Curriculum updated according to TOPIK and international competency frameworks.",
                },
                {
                  icon: Users,
                  title: locale === "vi" ? "Giảng viên giàu kinh nghiệm" : "Experienced Faculty",
                  desc: locale === "vi"
                    ? "100% giảng viên đạt trình độ thạc sĩ trở lên cùng chuyên gia bản xứ."
                    : "100% of lecturers hold a master's degree or higher, alongside native experts.",
                },
                {
                  icon: Globe2,
                  title: locale === "vi" ? "Mạng lưới đối tác rộng lớn" : "Extensive Partner Network",
                  desc: locale === "vi"
                    ? "Hợp tác chặt chẽ với các trường đại học công lập hàng đầu tại Seoul và Busan."
                    : "Close collaboration with top public universities in Seoul and Busan.",
                },
              ].map((h, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:border-primary-200 transition-colors"
                >
                  <h.icon className="w-8 h-8 text-primary-500 mb-3" />
                  <h4 className="font-heading font-bold text-base text-neutral-900 mb-2">
                    {h.title}
                  </h4>
                  <p className="text-neutral-600 text-sm">{h.desc}</p>
                </div>
              ))}
            </div>

            {/* History / Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-accent-50/50 rounded-3xl p-8 md:p-12 border border-primary-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-neutral-900">
                {getText("lich_su_tieu_de", t.about?.history || "Lịch sử hình thành", "Our History")}
              </h3>
              <div className="text-neutral-700 leading-relaxed space-y-4 text-base">
                <p>
                  {getText(
                    "lich_su_1",
                    "Được thành lập trong khuôn khổ chiến lược quốc tế hóa giáo dục của Trường Đại học Mở TP.HCM, Trung Tâm Việt - Hàn đã từng bước phát triển và trở thành điểm tựa văn hóa vững chắc cho hàng nghìn sinh viên và học viên mỗi năm.",
                    "Established within the framework of the internationalization strategy of Ho Chi Minh City Open University, the Vietnam - Korea Center has gradually developed and become a solid cultural anchor for thousands of students each year."
                  )}
                </p>
                <p>
                  {getText(
                    "lich_su_2",
                    "Trung tâm liên tục mở rộng các chương trình học bổng, diễn đàn khoa học, ngày hội giao lưu văn hóa và các chuyến trao đổi học thuật thực tế, tạo điều kiện thuận lợi nhất để học viên tiếp cận và hội nhập toàn cầu.",
                    "The center continuously expands scholarship programs, scientific forums, cultural exchange festivals, and practical academic exchange trips, creating the most favorable conditions for students to access and integrate globally."
                  )}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </Container>
    </section>
  );
}