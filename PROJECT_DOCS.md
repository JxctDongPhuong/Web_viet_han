# TÀI LIỆU TỔNG KẾT VÀ BÁO CÁO DỰ ÁN (PROJECT DOCUMENTATION)
**Dự án**: Website Cổng thông tin & Landing Page Trung Tâm Việt - Hàn (Trường Đại học Mở TP.HCM)  
**Mã dự án**: `demoweb-ou-vhn` / `trungtamviethan-demo`  
**Ngày cập nhật**: 23/11/2026  

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Mục tiêu dự án
Xây dựng website cổng thông tin điện tử và landing page hiện đại, chuyên nghiệp cho **Trung tâm Việt - Hàn** trực thuộc **Trường Đại học Mở TP.HCM (HCMCOU)**. Website đóng vai trò:
- Giới thiệu hình ảnh, sứ mệnh, tầm nhìn và các hoạt động giao lưu văn hóa - giáo dục giữa Việt Nam và Hàn Quốc.
- Cung cấp thông tin chi tiết về các khóa học tiếng Hàn, luyện thi chứng chỉ TOPIK, và các chương trình trao đổi sinh viên quốc tế.
- Giới thiệu đội ngũ giảng viên, chuyên gia bản ngữ giàu kinh nghiệm.
- Đăng tải tin tức, thông báo, sự kiện và cơ hội học bổng.
- Tiếp nhận hồ sơ và tư vấn tuyển sinh trực tuyến nhanh chóng, tiện lợi cho học viên và sinh viên.

### 1.2. Đối tượng phục vụ
- Sinh viên Trường Đại học Mở TP.HCM có nhu cầu học tiếng Hàn, săn học bổng, tham gia trao đổi sinh viên tại Hàn Quốc.
- Học viên tự do, người đi làm có nhu cầu học tiếng Hàn thương mại, biên phiên dịch, luyện thi TOPIK.
- Các trường đại học, đối tác doanh nghiệp Hàn Quốc tìm kiếm cơ hội hợp tác giáo dục.

---

## 2. CÔNG NGHỆ SỬ DỤNG (TECH STACK)

| Thành phần | Công nghệ / Thư viện | Vai trò |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Khung ứng dụng chính, hỗ trợ Static Site Generation (SSG), SEO tối ưu |
| **Ngôn ngữ** | TypeScript 5 | Đảm bảo tính chặt chẽ về kiểu dữ liệu (Type Safety) |
| **Thư viện UI** | React 19 | Xây dựng các UI component phản hồi cao |
| **Styling** | Tailwind CSS v4, `@tailwindcss/typography` | Thiết kế giao diện hiện đại, responsive hoàn hảo mọi kích thước màn hình |
| **Hiệu ứng & Chuyển động** | Framer Motion (13.x) | Animation mượt mà, chuyển trang, hiệu ứng cuộn, tab chuyển đổi |
| **Bộ Icon** | Lucide React | Bộ biểu tượng đồ họa vector sắc nét, chuẩn thiết kế |
| **Quản lý gói** | pnpm 9.12.x | Tối ưu hóa dung lượng ổ đĩa và tốc độ cài đặt dependency |
| **Headless CMS** | Google Apps Script + Google Sheets API | Quản trị nội dung động (Tin tức, Giới thiệu, Giảng viên, Khóa học) không tốn phí máy chủ cơ sở dữ liệu |
| **Container & Web Server** | Docker (Multi-stage build) + Nginx Alpine | Đóng gói sản phẩm nhỏ gọn, bảo mật cao, phục vụ file tĩnh với port 3005 |
| **CI/CD** | GitHub Actions | Tự động Lint, Build, Build Docker Image, đẩy lên GHCR và kích hoạt triển khai Staging |

---

## 3. DANH SÁCH CÁC CÔNG VIỆC & TÍNH NĂNG ĐÃ HOÀN THÀNH

### 3.1. Khởi tạo & Cấu trúc nền tảng (Foundation)
- [x] Thiết lập dự án Next.js 16 với TypeScript, Tailwind CSS v4, ESLint.
- [x] Cấu hình Static Export (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`) giúp website có thể deploy dạng static lên bất kỳ hosting hoặc Nginx server nào với tốc độ tải trang gần như tức thì.
- [x] Tích hợp chuẩn hóa UI Colors (Primary Blue `#1e40af`, Accent Gold `#eab308`), Typography và Breakpoints tương thích chuẩn nhận diện giáo dục.
- [x] Xây dựng bộ UI Components tái sử dụng (`Container`, `SectionHeading`, `Button`, `Card`, `Badge`, `Input`, `Textarea`, `SocialIcons`).

### 3.2. Hệ thống Đa ngôn ngữ (i18n - Song ngữ Việt / Anh)
- [x] Xây dựng `LanguageProvider` sử dụng React Context API, hỗ trợ ghi nhớ trạng thái ngôn ngữ qua `localStorage`.
- [x] Hoàn thiện bộ từ điển bản địa hóa chuẩn xác tại `src/data/i18n.ts` cho toàn bộ giao diện (Menu, Banner, Nút bấm, Tiêu đề, Form...).
- [x] Chuyển đổi ngôn ngữ mượt mà chỉ với một cú nhấp chuột trên Header mà không cần tải lại toàn bộ trang.

### 3.3. Tích hợp Quản trị dữ liệu động qua Google Sheets (Headless CMS)
- [x] Kết nối trực tiếp với Google Apps Script Web App API để lấy dữ liệu thời gian thực từ Google Sheets:
  - **Sheet `news`**: Quản lý danh sách và nội dung chi tiết bài viết tin tức.
  - **Sheet `about`**: Quản lý thông tin giới thiệu, sứ mệnh, tầm nhìn theo mã nội dung song ngữ.
  - **Sheet `faculty`**: Quản lý danh sách giảng viên, chức danh, chuyên môn, trạng thái hiển thị.
  - **Sheet `programs`**: Quản lý các chương trình học, danh mục, thời lượng, đặc điểm nổi bật.
- [x] Xây dựng cơ chế fallback thông minh: nếu API Google Sheets bận hoặc gặp sự cố, website vẫn hiển thị dữ liệu tĩnh dự phòng ổn định, không làm gián đoạn trải nghiệm người dùng.

### 3.4. Chi tiết các Trang & Chức năng Giao diện

#### 1. Trang chủ (`/`)
- **Hero Section**: Tiêu đề trang trọng, thông điệp truyền cảm hứng, nút kêu gọi hành động (CTA) "Khám phá khóa học" và "Đăng ký tư vấn".
- **Feature Grid**: Trình bày 4 trụ cột đào tạo vượt trội (Chuẩn đầu ra cam kết, Giảng viên bản ngữ giàu kinh nghiệm, Giao lưu văn hóa K-Culture sống động, Cơ hội học bổng & việc làm).
- **Stats Counter**: Thống kê số lượng học viên, tỷ lệ đỗ chứng chỉ TOPIK, đối tác trường đại học và doanh nghiệp uy tín.
- **Latest News**: Trích xuất tự động 3 tin tức/sự kiện mới nhất từ API với hình ảnh và nhãn phân loại sinh động.
- **CTA Banner**: Khối kêu gọi liên hệ và nhận ưu đãi học phí dành riêng cho sinh viên OU.
- **Partners Section**: Giới thiệu các đối tác chiến lược và trường đại học liên kết tại Hàn Quốc.

#### 2. Trang Giới thiệu (`/about`)
- Lịch sử hình thành và phát triển của Trung tâm Việt - Hàn tại Đại học Mở TP.HCM.
- Tuyên ngôn Sứ mệnh (Mission), Tầm nhìn (Vision) và Giá trị cốt lõi (Core Values).
- Tích hợp tải nội dung động từ tab `about` trên Google Sheets, cho phép ban quản trị cập nhật văn bản giới thiệu mọi lúc mà không cần build lại code.

#### 3. Trang Chương trình đào tạo (`/programs` & `/programs/[slug]`)
- **Danh sách chương trình**: Phân chia theo tab lọc nhanh (Tất cả, Tiếng Hàn tổng quát, Luyện thi TOPIK, Trao đổi sinh viên).
- **Thẻ khóa học chi tiết**: Thời lượng, mô tả ngắn, các quyền lợi/tính năng nổi bật.
- **Trang chi tiết từng khóa học (`/programs/[slug]`)**: 
  - Tạo trang tĩnh tự động (`generateStaticParams`).
  - Lộ trình đào tạo, chuẩn đầu ra, đối tượng tham gia, học phí và nút liên hệ tư vấn nhanh.

#### 4. Trang Đội ngũ Giảng viên (`/faculty`)
- Danh sách ban giám đốc, trưởng bộ môn, tiến sĩ, thạc sĩ và chuyên gia ngôn ngữ người Hàn Quốc.
- Hiển thị học hàm, học vị, chuyên môn giảng dạy, tiểu sử vắn tắt.
- Tự động đồng bộ và lọc giảng viên theo cột trạng thái "Hiển thị" từ Google Sheets.

#### 5. Trang Tin tức & Sự kiện (`/news` & `/news/[slug]`)
- Trang danh sách tin tức hỗ trợ lọc thẻ nổi bật (`featured`), nhãn danh mục (Thông báo, Sự kiện, Học bổng).
- Trang đọc bài viết chi tiết (`/news/[slug]`) với định dạng trình bày bài báo chuyên nghiệp, hỗ trợ render tiêu đề, ngày đăng, nội dung chi tiết và nút quay lại danh sách.
- Hỗ trợ Dynamic Metadata chuẩn SEO theo từng bài viết.

#### 6. Trang Tuyển sinh (`/admissions`)
- **Quy trình 4 bước**: Tìm hiểu thông tin $\rightarrow$ Nộp hồ sơ trực tuyến $\rightarrow$ Tư vấn & Kiểm tra đầu vào $\rightarrow$ Nhập học chính thức.
- **Biểu mẫu đăng ký tư vấn trực tuyến**: Thu thập thông tin học viên (Họ tên, SĐT, Email, Khóa học quan tâm, Lời nhắn), có xử lý phản hồi trực quan.
- **Khối FAQ (Hỏi đáp nhanh)**: Giải đáp các băn khoăn về trình độ người mới bắt đầu, điều kiện trao đổi sinh viên, chính sách giảm học phí 15-20% cho sinh viên HCMCOU.

#### 7. Trang Liên hệ (`/contact`)
- Hiển thị địa chỉ trụ sở chính (97 Võ Văn Tần, P. Võ Thị Sáu, Q.3, TP.HCM), số điện thoại hotline, email công vụ, giờ làm việc.
- Liên kết mạng xã hội (Facebook Fanpage, Kênh Youtube, Zalo OA).
- Form gửi câu hỏi và yêu cầu tư vấn nhanh chóng.

#### 8. Layout chung & Điều hướng
- **Header**: Thanh điều hướng dính cố định (sticky navigation), hiệu ứng mờ kính (glassmorphism), đầy đủ menu đa cấp và hỗ trợ giao diện điện thoại (mobile responsive drawer).
- **Footer**: Bản đồ chỉ dẫn, thông tin bản quyền trường HCMCOU, chính sách và liên kết mạng xã hội.
- **Trang 404 (`not-found.tsx`)**: Giao diện thông báo trang không tồn tại thân thiện, có nút quay về trang chủ.

### 3.5. Đóng gói, Tối ưu hóa & Hạ tầng CI/CD
- [x] **Dockerfile (Multi-stage build)**:
  - Stage 1 (`deps`): Cài đặt dependencies với `pnpm --frozen-lockfile`.
  - Stage 2 (`builder`): Build Next.js xuất ra thư mục tĩnh `/app/out`.
  - Stage 3 (`runner`): Nginx Alpine siêu nhẹ (~30MB), chạy dưới quyền user không đặc quyền (`nginx`) bảo mật.
- [x] **Cấu hình Nginx (`nginx.conf`)**:
  - Lắng nghe cổng nội bộ `3005`.
  - Cấu hình SPA routing (`try_files $uri $uri/ /index.html;`).
  - Bật Gzip nén các file tĩnh JS, CSS, JSON để tăng tốc độ tải trang.
  - Thiết lập endpoint `/healthz` và Docker Healthcheck sẵn sàng cho môi trường Kubernetes.
- [x] **GitHub Actions Workflow (`.github/workflows/deploy.yml`)**:
  - Tự động chạy `pnpm lint` và `pnpm build` trên mỗi Pull Request và Commit nhánh `main`.
  - Tự động build Docker image và gắn thẻ commit SHA.
  - Tự động push image lên GitHub Container Registry (`ghcr.io`).
  - Tự động kích hoạt cập nhật manifest trên hạ tầng Staging K3s Cluster.

---

## 4. CẤU TRÚC THƯ MỤC NGUỒN (SOURCE CODE STRUCTURE)

```
demoweb-ou-vhn/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD Pipeline (Lint, Build, Docker Publish, Deploy)
├── public/                         # Tài nguyên tĩnh (Hình ảnh, logo, favicon)
├── src/
│   ├── app/                        # Next.js App Router Pages
│   │   ├── layout.tsx              # Root Layout bọc LanguageProvider, Header, Footer
│   │   ├── page.tsx                # Trang chủ (Home)
│   │   ├── not-found.tsx           # Trang báo lỗi 404
│   │   ├── globals.css             # Định nghĩa style toàn cục & biến Tailwind v4
│   │   ├── about/                  # Trang Giới thiệu
│   │   ├── admissions/             # Trang Tuyển sinh & Form đăng ký
│   │   ├── contact/                # Trang Liên hệ
│   │   ├── faculty/                # Trang Đội ngũ Giảng viên
│   │   ├── news/                   # Trang Tin tức & Sự kiện
│   │   │   └── [slug]/             # Chi tiết bài viết tin tức
│   │   └── programs/               # Trang Chương trình đào tạo
│   │       └── [slug]/             # Chi tiết khóa đào tạo
│   ├── components/
│   │   ├── home/                   # Các section của trang chủ (Hero, Features, Stats, ...)
│   │   ├── layout/                 # Header, Footer, Container
│   │   ├── providers/              # LanguageProvider (Đa ngôn ngữ vi/en)
│   │   └── ui/                     # UI components cơ bản (Button, Card, Input, Badge, ...)
│   ├── data/                       # Dữ liệu tĩnh, schema và client API kết nối Google Sheets
│   │   ├── i18n.ts                 # Từ điển dịch Việt - Anh
│   │   ├── site.ts                 # Cấu hình website, thông tin liên hệ, menu
│   │   ├── programs.ts             # Dữ liệu khóa học
│   │   ├── faculty.ts              # Dữ liệu giảng viên
│   │   └── news.ts                 # Dữ liệu & API fetch tin tức
│   └── lib/
│       └── utils.ts                # Hàm tiện ích (cn classnames merge)
├── Dockerfile                      # Multi-stage Docker build cho môi trường Production
├── nginx.conf                      # Cấu hình máy chủ web Nginx phục vụ static file
├── next.config.ts                  # Cấu hình Next.js (Static export)
├── package.json                    # Cấu hình dependencies và scripts
└── tsconfig.json                   # Cấu hình TypeScript
```

---

## 5. HƯỚNG DẪN VẬN HÀNH VÀ TRIỂN KHAI

### 5.1. Chạy trên môi trường phát triển (Local Development)
```bash
# 1. Cài đặt các gói phụ thuộc
pnpm install

# 2. Khởi chạy máy chủ dev tại cổng 3000
pnpm dev

# 3. Kiểm tra lỗi cú pháp và quy chuẩn mã nguồn
pnpm lint
```

### 5.2. Đóng gói mã nguồn tĩnh (Static Build)
```bash
pnpm build
# Kết quả build tĩnh sẽ được tạo ra tại thư mục /out
```

### 5.3. Chạy với Docker
```bash
# Build Docker image
docker build -t demoweb-ou-vhn:latest .

# Chạy container tại cổng 3005
docker run -d -p 3005:3005 --name demoweb demoweb-ou-vhn:latest
```

---

## 6. KẾT LUẬN & ĐỊNH HƯỚNG MỞ RỘNG

### 6.1. Kết quả đạt được
- Website đã hoàn thành **100% các chức năng cốt lõi** theo đúng kế hoạch đề ra.
- Giao diện đẹp mắt, mang đậm bản sắc giao lưu văn hóa Việt - Hàn, hoạt động mượt mà trên cả máy tính lẫn thiết bị di động.
- Giải pháp kết nối dữ liệu Google Sheets giúp người quản lý nội dung dễ dàng sửa đổi thông tin mà không cần kiến thức lập trình.
- Quy trình tự động hóa kiểm thử và triển khai (CI/CD) hoàn chỉnh, sẵn sàng phục vụ cho môi trường thực tế của nhà trường.

### 6.2. Hướng phát triển trong tương lai (Đề xuất)
- Tích hợp cổng thanh toán trực tuyến hoặc mã QR học phí khi học viên đăng ký nhập học.
- Bổ sung hệ thống gửi email tự động xác nhận khi học viên điền form đăng ký tư vấn.
- Thêm chức năng tìm kiếm bài viết, tài liệu học tập và thi thử TOPIK trực tuyến.

