# TÀI LIỆU DỰ ÁN (PROJECT DOCUMENTATION)
**Dự án**: Website Cổng thông tin & Tuyển sinh — Trung Tâm Việt - Hàn (Trường Đại học Mở TP.HCM)  
**Tên kỹ thuật**: `demoweb-ou-vhn`  
**Ngày cập nhật**: 23/11/2026  

---

## MỤC LỤC
1. [Giới thiệu tổng quan](#1-giới-thiệu-tổng-quan)
2. [Công nghệ & Thư viện sử dụng](#2-công-nghệ--thư-viện-sử-dụng)
3. [Các tính năng & Module đã triển khai](#3-các-tính-năng--module-đã-triển-khai)
4. [Tích hợp Headless CMS với Google Sheets](#4-tích-hợp-headless-cms-với-google-sheets)
5. [Cấu trúc mã nguồn (Source Tree)](#5-cấu-trúc-mã-nguồn-source-tree)
6. [Quy trình làm việc & CI/CD (Workflow)](#6-quy-trình-làm-việc--cicd-workflow)
7. [Hướng dẫn cài đặt & Chạy ứng dụng](#7-hướng-dẫn-cài-đặt--chạy-ứng-dụng)

---

## 1. GIỚI THIỆU TỔNG QUAN

Website được xây dựng nhằm cung cấp cổng thông tin toàn diện và landing page tuyển sinh cho **Trung tâm Việt - Hàn** trực thuộc **Trường Đại học Mở TP.HCM (HCMCOU)**:
- **Mục tiêu**: Quảng bá thương hiệu, giới thiệu các khóa đào tạo tiếng Hàn, luyện thi TOPIK, chương trình trao đổi sinh viên quốc tế, đăng tải tin tức hoạt động và tiếp nhận hồ sơ tư vấn trực tuyến.
- **Tiêu chuẩn**:
  - Giao diện thân thiện, hiện đại, tối ưu trải nghiệm người dùng (UX/UI).
  - Tối ưu hóa tốc độ tải trang nhờ kiến trúc Static Site Generation (SSG).
  - Chuẩn SEO, đầy đủ OpenGraph metadata.
  - Hỗ trợ song ngữ (Tiếng Việt & Tiếng Anh).

---

## 2. CÔNG NGHỆ & THƯ VIỆN SỬ DỤNG

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Static Export).
- **Ngôn ngữ**: TypeScript 5, React 19.
- **Styling**: Tailwind CSS v4, `@tailwindcss/typography`, `clsx`.
- **Hiệu ứng & Giao diện**: `framer-motion` (chuyển động mượt mà), `lucide-react` (hệ thống icon vector).
- **Quản lý gói**: `pnpm 9.12.2`.
- **Máy chủ tĩnh & Container**: Docker multi-stage build, Nginx Alpine, phục vụ tại port 3005.
- **CI/CD Pipeline**: GitHub Actions kết nối Kubernetes (K3s).

---

## 3. CÁC TÍNH NĂNG & MODULE ĐÃ TRIỂN KHAI

### 3.1. Hệ thống Đa ngôn ngữ (i18n)
- Triển khai `LanguageProvider` với React Context API.
- Hỗ trợ chuyển đổi nhanh giữa Tiếng Việt (`vi`) và Tiếng Anh (`en`).
- Lưu tùy chọn của người dùng vào `localStorage`.
- Toàn bộ từ khóa giao diện được quản lý tập trung tại `src/data/i18n.ts`.

### 3.2. Trang chủ (Home Page — `/`)
- **Hero Section**: Khẩu hiệu trung tâm, nút CTA "Khám phá khóa học" & "Đăng ký tư vấn".
- **Feature Grid**: Giới thiệu 4 thế mạnh nổi bật (Chuẩn đầu ra, Giảng viên bản ngữ, Trải nghiệm K-Culture, Cơ hội nghề nghiệp & Học bổng).
- **Stats Counter**: Bộ đếm thống kê thành tựu (học viên, tỷ lệ đỗ TOPIK, đối tác Hàn Quốc).
- **Latest News**: Hiển thị 3 tin tức/sự kiện mới nhất lấy động từ Google Sheets.
- **CTA Banner**: Khối kêu gọi đăng ký và giới thiệu ưu đãi học phí cho sinh viên OU.
- **Partners Section**: Trình bày danh sách các trường đại học và cơ quan đối tác Hàn Quốc.

### 3.3. Trang Giới thiệu (About Us — `/about`)
- Lịch sử hình thành, Sứ mệnh, Tầm nhìn và Giá trị cốt lõi.
- Tự động gọi API lấy nội dung cập nhật từ Google Sheets tab `about` với cơ chế fallback nội dung có sẵn.

### 3.4. Trang Chương trình đào tạo (Programs — `/programs` & `/programs/[slug]`)
- Bộ lọc danh mục theo tabs: *Tất cả*, *Tiếng Hàn*, *TOPIK*, *Trao đổi sinh viên*.
- Lấy danh sách khóa học từ Google Sheets / Data mẫu.
- Trang chi tiết từng khóa học (`[slug]`):
  - Lộ trình học chi tiết, chuẩn đầu ra, thời lượng, học phí.
  - Nút đăng ký tư vấn trực tiếp khóa học đó.
  - Tạo trang tĩnh sẵn (`generateStaticParams`).

### 3.5. Trang Đội ngũ Giảng viên (Faculty — `/faculty`)
- Danh sách ban giám đốc, tiến sĩ, thạc sĩ và giảng viên người Hàn Quốc.
- Hiển thị chức danh, chuyên môn, tiểu sử tóm tắt.
- Lọc theo trường "Hiển thị" từ Google Sheets.

### 3.6. Trang Tin tức & Sự kiện (News — `/news` & `/news/[slug]`)
- Danh sách bài viết tin tức, thông báo, học bổng được lấy thời gian thực.
- Đánh dấu bài viết nổi bật (`featured`).
- Trang đọc bài viết chi tiết theo `slug` với layout chuẩn báo chí điện tử.

### 3.7. Trang Tuyển sinh & Tư vấn (Admissions — `/admissions`)
- Lộ trình 4 bước nhập học rõ ràng: Tìm hiểu $\rightarrow$ Đăng ký $\rightarrow$ Tư vấn & Test $\rightarrow$ Nhập học.
- Form đăng ký tư vấn trực tuyến (Họ tên, SĐT, Email, Khóa học quan tâm, Lời nhắn).
- Bộ câu hỏi thường gặp (FAQ) giải đáp thắc mắc về ưu đãi giảm 15-20% cho sinh viên OU.

### 3.8. Trang Liên hệ (Contact — `/contact`)
- Địa chỉ cơ sở 97 Võ Văn Tần, Q.3, TP.HCM, số điện thoại hotline, email công vụ.
- Liên kết mạng xã hội (Facebook, YouTube, Zalo).
- Form gửi tin nhắn liên hệ nhanh.

### 3.9. Layout dùng chung & Trang 404
- **Header**: Cố định (sticky), hiệu ứng nền mờ kính, mobile menu drawer, nút chuyển ngôn ngữ, hotline và CTA.
- **Footer**: Bản đồ, thông tin bản quyền và liên kết điều hướng nhanh.
- **not-found.tsx**: Giao diện báo lỗi trang không tồn tại kèm nút quay lại trang chủ.

---

## 4. TÍCH HỢP HEADLESS CMS VỚI GOOGLE SHEETS

Dự án sử dụng Google Apps Script Web App làm cầu nối API miễn phí và linh hoạt:
- **Endpoint**:
  `https://script.google.com/macros/s/AKfycbxXlwsAgGNIM0k0yh84EcxW_4f6AS120rcuw6B38-fKWtZxhPYwjoazgLnNXvKQ5DNN/exec`
- **Các tham số query**:
  - `?sheet=news`: Dữ liệu bài viết tin tức và thông báo.
  - `?sheet=about`: Dữ liệu văn bản giới thiệu, sứ mệnh, tầm nhìn song ngữ.
  - `?sheet=faculty`: Danh sách thông tin giảng viên và chuyên môn.
  - `?sheet=programs`: Dữ liệu chi tiết các chương trình đào tạo.

---

## 5. CẤU TRÚC MÃ NGUỒN (SOURCE TREE)

```
demoweb-ou-vhn/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI Pipeline (Lint & Build validation trên mọi PR)
│       └── deploy.yml             # CD Pipeline (Docker build, Push GHCR & Deploy K3s)
├── public/                        # Ảnh, logo, favicon tĩnh
├── src/
│   ├── app/                       # App Router: layout, page, routes
│   │   ├── about/                 # /about
│   │   ├── admissions/            # /admissions
│   │   ├── contact/               # /contact
│   │   ├── faculty/               # /faculty
│   │   ├── news/                  # /news & /news/[slug]
│   │   ├── programs/              # /programs & /programs/[slug]
│   │   ├── layout.tsx             # Root Layout
│   │   ├── page.tsx               # Trang chủ
│   │   └── not-found.tsx          # Trang lỗi 404
│   ├── components/
│   │   ├── home/                  # Hero, Features, Stats, News, CTA, Partners
│   │   ├── layout/                # Header, Footer, Container
│   │   ├── providers/             # LanguageProvider
│   │   └── ui/                    # Button, Card, Badge, Input, Heading...
│   ├── data/                      # i18n, site metadata, mock/API handlers
│   └── lib/utils.ts               # Hàm tiện ích cn (clsx)
├── Dockerfile                     # Multi-stage Docker build
├── nginx.conf                     # Cấu hình web server Nginx
├── next.config.ts                 # Next.js Static Export config
├── package.json                   # Cấu hình dependency & scripts
├── WORKFLOW.md                    # Tài liệu quy trình làm việc chi tiết
└── tsconfig.json                  # Cấu hình TypeScript
```

---

## 6. QUY TRÌNH LÀM VIỆC & CI/CD (WORKFLOW)

> Xem tài liệu chi tiết tại: [WORKFLOW.md](file:///d:/demoweb-ou-vhn/WORKFLOW.md)

1. **Quy trình phát triển**:
   - Nhánh `feature/*` $\rightarrow$ Kiểm tra cục bộ (`pnpm lint`, `pnpm build`) $\rightarrow$ Tạo Pull Request $\rightarrow$ Kích hoạt `ci.yml` kiểm tra tự động.
2. **Quy trình cập nhật nội dung**:
   - Biên tập viên cập nhật dữ liệu trên Google Sheets (news, about, faculty, programs) $\rightarrow$ Website tự động phản ánh thay đổi tức thì.
3. **Quy trình CI/CD tự động**:
   - Commit vào `main` $\rightarrow$ Chạy `deploy.yml` $\rightarrow$ Đóng gói Docker Nginx Alpine $\rightarrow$ Đẩy lên `ghcr.io` $\rightarrow$ Cập nhật hạ tầng K3s Staging.

---

## 7. HƯỚNG DẪN CÀI ĐẶT & CHẠY ỨNG DỤNG

### 7.1. Chạy trên máy cá nhân (Local Dev)
```bash
# 1. Cài đặt thư viện
pnpm install

# 2. Khởi động môi trường phát triển
pnpm dev
# Truy cập: http://localhost:3000

# 3. Kiểm tra mã nguồn
pnpm lint
```

### 7.2. Build bản tĩnh
```bash
pnpm build
# Toàn bộ sản phẩm xuất ra tại thư mục: out/
```

### 7.3. Chạy với Docker
```bash
# Build image
docker build -t demoweb-ou-vhn .

# Chạy container
docker run -d -p 3005:3005 --name demoweb demoweb-ou-vhn
# Truy cập: http://localhost:3005
```

