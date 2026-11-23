"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Loader2 } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

const API_URL = "https://script.google.com/macros/s/AKfycbxXlwsAgGNIM0k0yh84EcxW_4f6AS120rcuw6B38-fKWtZxhPYwjoazgLnNXvKQ5DNN/exec?sheet=faculty";

export default function FacultyPage() {
  const { locale, t } = useLanguage();
  const [faculty, setFaculty] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();

        const visibleFaculty = data.filter((item: any) => item["Hiển thị"] === true);
        setFaculty(visibleFaculty);
      } catch (error) {
        console.error("Lỗi tải danh sách giảng viên:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "VH";
    const parts = name.trim().split(" ");
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <section className="section-padding bg-white min-h-screen">
      <Container>
        <SectionHeading
          title={t.faculty?.title || (locale === "vi" ? "Đội ngũ Giảng viên" : "Faculty & Experts")}
          subtitle={
            locale === "vi"
              ? "Đội ngũ phó giáo sư, tiến sĩ, thạc sĩ và chuyên gia ngôn ngữ bản ngữ giàu kinh nghiệm giảng dạy và nghiên cứu."
              : "A team of associate professors, doctors, masters, and native language experts with extensive teaching and research experience."
          }
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-3" />
            <p className="text-neutral-500 text-sm">
              {locale === "vi" ? "Đang tải danh sách giảng viên..." : "Loading faculty..."}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, i) => (
              <motion.div
                key={member.ID || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-neutral-50/70 border border-neutral-100 rounded-3xl p-8 text-center hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-primary-800 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 text-white font-heading font-extrabold text-3xl">
                    {getInitials(member["Tên"])}
                  </div>

                  <h3 className="font-heading font-bold text-xl text-neutral-900 mb-1">
                    {member["Tên"]}
                  </h3>

                  <p className="text-primary-600 text-sm font-semibold mb-4">
                    {locale === "vi" ? member["Chức vụ VI"] : member["Chức vụ EN"]}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-700 font-medium mb-4">
                    <GraduationCap className="w-3.5 h-3.5 text-accent-500" />
                    <span>{locale === "vi" ? member["Chuyên môn VI"] : member["Chuyên môn EN"]}</span>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {locale === "vi" ? member["Mô tả VI"] : member["Mô tả EN"]}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
                  <Award className="w-4 h-4 text-primary-500" />
                  <span>{locale === "vi" ? member["Đơn vị VI"] : member["Đơn vị EN"]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}