# QUY TRÌNH LÀM VIỆC DỰ ÁN (PROJECT WORKFLOW)
**Dự án**: Website Cổng thông tin & Tuyển sinh Trung Tâm Việt - Hàn (HCMCOU)  
**Tài liệu**: Quy trình phát triển, quản lý nội dung và triển khai tự động (CI/CD)  
**Ngày cập nhật**: 23/11/2026  

---

## MỤC LỤC
1. [Tổng quan quy trình (High-Level Overview)](#1-tổng-quan-quy-trình-high-level-overview)
2. [Quy trình phát triển phần mềm (Development Workflow)](#2-quy-trình-phát-triển-phần-mềm-development-workflow)
3. [Quy trình quản lý & cập nhật nội dung (Content Management Workflow)](#3-quy-trình-quản-lý--cập-nhật-nội-dung-content-management-workflow)
4. [Quy trình CI/CD & Triển khai (CI/CD Deployment Workflow)](#4-quy-trình-cicd--triển-khai-cicd-deployment-workflow)
5. [Quy trình tiếp nhận & xử lý thông tin tuyển sinh (Lead Handling Workflow)](#5-quy-trình-tiếp-nhận--xử-lý-thông-tin-tuyển-sinh-lead-handling-workflow)
6. [Quy chuẩn mã nguồn & Cam kết chất lượng (Quality Standards)](#6-quy-chuẩn-mã-nguồn--cam-kết-chất-lượng-quality-standards)

---

## 1. TỔNG QUAN QUY TRÌNH (HIGH-LEVEL OVERVIEW)

Hệ thống vận hành theo 3 luồng chính:
1. **Luồng Kỹ thuật (Technical Flow)**: Lập trình viên phát triển $\rightarrow$ Git Branch $\rightarrow$ Pull Request $\rightarrow$ Tự động Lint & Build $\rightarrow$ Merge $\rightarrow$ Tự động đóng gói Docker & Triển khai lên K3s Staging/Production.
2. **Luồng Biên tập viên (Content Flow)**: Ban quản lý / Biên tập viên cập nhật dữ liệu (Tin tức, Giảng viên, Khóa học) trên Google Sheets $\rightarrow$ Hệ thống website tự động nạp dữ liệu thời gian thực qua Google Apps Script API mà không cần can thiệp vào mã nguồn.
3. **Luồng Người dùng & Tuyển sinh (User & Admissions Flow)**: Học viên truy cập website $\rightarrow$ Xem thông tin $\rightarrow$ Gửi form đăng ký tư vấn $\rightarrow$ Hệ thống tiếp nhận thông tin và chuyển về bộ phận tuyển sinh.

```mermaid
flowchart TD
    subgraph BanBiênTập["Ban Quản Trị / Biên Tập Viên"]
        A[Chỉnh sửa bài viết / Giảng viên / Khóa học] -->|Cập nhật dữ liệu| B[Google Sheets]
        B -->|Google Apps Script API| C[Website Client Runtime]
    end

    subgraph ĐộiNgũKỹThuật["Đội Ngũ Lập Trình Viên"]
        D[Lập trình tính năng mới] -->|Tạo Branch & PR| E[GitHub Repository]
        E -->|Kích hoạt| F[GitHub Actions CI/CD]
        F -->|Lint, Build & Dockerize| G[GitHub Container Registry]
        G -->|Tự động Deploy| H[Kubernetes K3s Cluster]
    end

    subgraph NgườiDùngHọcViên["Học Viên & Sinh Viên"]
        I[Truy cập Website] --> C
        C --> H
        I -->|Gửi Form Tuyển Sinh| K[Bộ Phận Tuyển Sinh HCMCOU]
    end
```

---

## 2. QUY TRÌNH PHÁT TRIỂN PHẦN MỀM (DEVELOPMENT WORKFLOW)

### 2.1. Phân nhánh Git (Git Branching Strategy)
Dự án áp dụng mô hình **Trunk-Based / Feature Branching** tinh gọn:
- `main`: Nhánh production ổn định. Mọi commit vào `main` sẽ kích hoạt pipeline build Docker image và deploy lên hệ thống.
- `feature/<tên-tính-năng>`: Nhánh làm tính năng mới (ví dụ: `feature/dark-mode`, `feature/tuition-calculator`).
- `webviethan`: Nhánh tính năng hoàn thiện website Trung tâm Việt - Hàn.
- `fix/<tên-lỗi>`: Nhánh sửa lỗi phát sinh.

### 2.2. Các bước làm việc cho Lập trình viên

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Lập trình viên
    participant Local as Máy cá nhân (Local)
    participant Git as GitHub
    participant CI as GitHub Actions

    Dev->>Local: git checkout -b feature/ten-tinh-nang
    Dev->>Local: Lập trình & kiểm thử tại localhost:3000
    Dev->>Local: pnpm lint && pnpm build (tự kiểm tra)
    Dev->>Git: git push origin feature/ten-tinh-nang
    Dev->>Git: Tạo Pull Request (PR) vào nhánh main
    Git->>CI: Tự động chạy CI (Lint & Build Test)
    CI-->>Git: Báo cáo kết quả kiểm tra (Pass / Fail)
    Dev->>Git: Review mã nguồn và Merge PR vào main
```

#### Bước 1: Chuẩn bị môi trường làm việc
```bash
# Cài đặt đúng phiên bản thư viện
pnpm install

# Tạo nhánh làm việc mới từ main mới nhất
git checkout main
git pull origin main
git checkout -b feature/ten-tinh-nang
```

#### Bước 2: Lập trình & Kiểm tra cục bộ
```bash
# Khởi chạy server phát triển
pnpm dev

# Trước khi commit, bắt buộc chạy kiểm tra:
pnpm lint
pnpm build
```

#### Bước 3: Đẩy mã nguồn & Mở Pull Request (PR)
- Viết commit message theo chuẩn **Conventional Commits**:
  - `feat: thêm chức năng lọc theo học phí`
  - `fix: sửa lỗi căn lề trên màn hình iPhone SE`
  - `docs: cập nhật tài liệu hướng dẫn`
- Đẩy nhánh lên GitHub và tạo Pull Request vào nhánh `main`.
- Đảm bảo tất cả các bước kiểm tra CI của GitHub Actions đạt trạng thái xanh (Passed) trước khi merge.

---

## 3. QUY TRÌNH QUẢN LÝ & CẬP NHẬT NỘI DUNG (CONTENT MANAGEMENT WORKFLOW)

Hệ thống cho phép ban biên tập và quản lý trung tâm thay đổi nội dung nhanh chóng thông qua **Google Sheets** mà không cần liên hệ kỹ thuật để chỉnh sửa code:

```mermaid
flowchart LR
    S1[Mở Google Spreadsheet] --> S2[Chọn Tab cần sửa: news / about / faculty / programs]
    S2 --> S3[Thêm dòng mới hoặc sửa thông tin]
    S3 --> S4[Lưu lại trang tính]
    S4 --> S5[F5 Website - Nội dung cập nhật tức thì]
```

### 3.1. Danh mục các Tab dữ liệu:
| Tên Tab | Mục đích quản lý | Các trường chính |
| :--- | :--- | :--- |
| `news` | Bài viết tin tức, thông báo, học bổng | `slug`, `title`, `titleEn`, `category`, `date`, `excerpt`, `content`, `featured` |
| `about` | Nội dung trang Giới thiệu | `Mã nội dung`, `Tiếng Việt`, `Tiếng Anh` |
| `faculty` | Danh sách giảng viên & chuyên gia | `Tên`, `Chức danh`, `Chuyên môn`, `Tiểu sử`, `Hiển thị (TRUE/FALSE)` |
| `programs` | Thông tin khóa học | `slug`, `title`, `titleEn`, `category`, `duration`, `description`, `features` |

---

## 4. QUY TRÌNH CI/CD & TRIỂN KHAI (CI/CD DEPLOYMENT WORKFLOW)

Dự án áp dụng mô hình GitOps tự động hóa 100%:

```mermaid
flowchart TD
    A[Commit / Merge vào nhánh main] --> B{GitHub Actions Pipeline}
    
    subgraph Stage1_CI["1. Kiểm tra (Job CI)"]
        B --> C1[Setup Node.js 24 & pnpm]
        C1 --> C2[pnpm install --frozen-lockfile]
        C2 --> C3[pnpm lint]
        C3 --> C4[pnpm build]
    end

    subgraph Stage2_Publish["2. Đóng gói & Phát hành (Job Publish)"]
        C4 -->|Thành công| D1[Docker Build Multi-stage]
        D1 --> D2[Đăng nhập GHCR]
        D2 --> D3[Push Image: ghcr.io/smart-home-sh/demowebou:SHA]
    end

    subgraph Stage3_Promote["3. Đồng bộ Hạ tầng (Job Promote)"]
        D3 -->|Thành công| E1[Checkout Repo Infrastructure]
        E1 --> E2[Cập nhật image tag trong file patch YAML]
        E2 --> E3[Commit & Push vào repo hạ tầng]
        E3 --> E4[K3s Cluster đồng bộ Container mới]
    end
```

---

## 5. QUY TRÌNH TIẾP NHẬN & XỬ LÝ THÔNG TIN TUYỂN SINH (LEAD HANDLING WORKFLOW)

```mermaid
flowchart LR
    A[Học viên điền Form tại /admissions hoặc /contact] --> B[Client xác thực dữ liệu Input]
    B --> C[Thông báo xác nhận thành công cho học viên]
    C --> D[Chuyên viên tuyển sinh tiếp nhận thông tin]
    D --> E[Tư vấn trực tiếp & Đặt lịch kiểm tra năng lực]
    E --> F[Hoàn tất thủ tục nhập học & Lớp học chính thức]
```
