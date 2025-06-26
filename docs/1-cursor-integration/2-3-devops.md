---
sidebar_position: 5
---

# 🚀 DevOpp
:::info 🎯 Mục tiêu
Sau khi sử dụng các prompt templates này, DevOps engineer sẽ có khả năng:
- 🐳 **Containerize applications** hiệu quả với Docker best practices
- 🔄 **Build CI/CD pipelines** robust và scalable
- ☁️ **Manage infrastructure** as code với Terraform/Kubernetes
- 📊 **Implement monitoring** comprehensive cho production systems
:::

---

## 🐳 Containerization & Infrastructure

### 1️⃣ **Docker Optimization & Security**

**🎯 Tình huống:** Containerize applications với security và performance best practices.

#### 🔧 **Template: Multi-stage Dockerfile cho Node.js**

:::info Tại sao phải dùng Multi-stage build?
**Multi-stage build** là một kỹ thuật cốt lõi để tối ưu hóa `Dockerfile`. Nó cho phép bạn tách biệt môi trường build (chứa SDK, dependencies, công cụ biên dịch) khỏi môi trường chạy ứng dụng (chỉ chứa các file thực thi cần thiết). Kết quả là một image cuối cùng có kích thước nhỏ hơn đáng kể, giúp **giảm thời gian triển khai, tiết kiệm chi phí lưu trữ và thu hẹp bề mặt tấn công (attack surface)**.
:::

**Prompt:**
```
Viết một `Dockerfile` tối ưu sử dụng kỹ thuật multi-stage build cho một ứng dụng Node.js Express.

Yêu cầu chi tiết:

Stage 1: `builder`
- Sử dụng base image `node:18-alpine` để có kích thước nhỏ.
- Đặt thư mục làm việc là `/app`.
- Sao chép `package.json` và `package-lock.json` trước.
- Chạy `npm ci --only=production` để cài đặt dependencies một cách nhất quán và an toàn.
- Sao chép toàn bộ mã nguồn còn lại.
- (Tùy chọn) Chạy lệnh build của ứng dụng, ví dụ: `npm run build`.

Stage 2: Production (`final`)
- Bắt đầu từ một base image gọn nhẹ `node:18-alpine`.
- Đặt thư mục làm việc là `/app`.
- Sao chép các dependencies đã được cài đặt từ stage `builder`.
- Sao chép thư mục `dist` (kết quả của quá trình build) từ stage `builder`.
- Tạo một người dùng và nhóm không phải `root` tên là `appuser` và chuyển sang người dùng đó.
- Expose cổng 3000.
- Đặt lệnh khởi động mặc định là `node dist/index.js`.
```

:::tip Mẹo tối ưu hóa & Bảo mật
Để làm cho `Dockerfile` của bạn hiệu quả hơn nữa, hãy yêu cầu AI:
- **Tạo file `.dockerignore`:** `"Hãy tạo một file .dockerignore tiêu chuẩn cho một dự án Node.js để loại trừ các file không cần thiết như node_modules, .env, và logs."` Điều này giúp tăng tốc độ build và giảm kích thước context.
- **Chạy với người dùng không phải root:** Yêu cầu trên đã bao gồm bước này (`USER appuser`). Đây là một **thực hành bảo mật quan trọng** để hạn chế quyền hạn của container.
:::

---

## 🚀 CI/CD Pipeline

### 2. Xây dựng Pipeline CI/CD với GitLab Enterprise

**Tình huống:** Bạn cần thiết lập một quy trình CI/CD tự động cho dự án Spring Boot (Java) sử dụng Maven trong môi trường GitLab Enterprise. Pipeline phải tự động build, kiểm thử và có khả năng mở rộng cho các bước phức tạp hơn.

**Prompt:**
```
Tạo một file `.gitlab-ci.yml` để thực hiện CI/CD cho một dự án Spring Boot sử dụng Maven trong GitLab Enterprise.

Yêu cầu pipeline:

Stages: Define các giai đoạn `build`, `test`, `security-scan`, `package`

Variables:
- MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"
- MAVEN_CLI_OPTS: "--batch-mode --errors --fail-at-end --show-version"

Cache:
- Cache thư mục `.m2/repository` để tăng tốc độ build cho các lần chạy sau

Jobs:
1. build-job (stage: build):
   - Sử dụng image `maven:3.8.4-openjdk-17`
   - Chạy `mvn $MAVEN_CLI_OPTS compile`
   - Artifacts: lưu trữ thư mục `target/` với thời gian hết hạn 1 giờ

2. test-job (stage: test):
   - Depends on build-job
   - Chạy unit tests với `mvn $MAVEN_CLI_OPTS test`
   - Reports: xuất JUnit test reports định dạng XML

3. package-job (stage: package):
   - Only chạy trên branch `main`
   - Chạy `mvn $MAVEN_CLI_OPTS package -DskipTests`
   - Artifacts: lưu trữ file JAR với thời gian hết hạn 1 tuần
```

:::tip Mẹo mở rộng Pipeline
Bạn có thể dễ dàng yêu cầu AI nâng cấp pipeline này. Hãy thử các prompt nối tiếp:
- **Quét bảo mật:** `"Dựa trên pipeline trên, hãy thêm một job security-scan sử dụng GitLab SAST (Static Application Security Testing) để quét lỗ hổng bảo mật trong mã nguồn."`
- **Build Docker Image:** `"Thêm một job 'docker-build' để build Docker image và đẩy lên GitLab Container Registry. Sử dụng $CI_REGISTRY_USER và $CI_REGISTRY_PASSWORD để đăng nhập."`
- **Deploy to Kubernetes:** `"Thêm một job 'deploy-staging' sử dụng kubectl để deploy ứng dụng lên Kubernetes namespace 'staging'. Chỉ chạy khi có merge request vào branch 'main'."`
:::

---

## ☁️ Infrastructure as Code

### 3. Khởi tạo hạ tầng AWS với Terraform

**Tình huống:** Bạn cần tạo một module Terraform có thể tái sử dụng để khởi tạo một S3 bucket trên AWS, được cấu hình để lưu trữ một trang web tĩnh.

:::info Tại sao dùng Terraform Module?
**Terraform Module** là một tập hợp các file `.tf` được gom lại thành một đơn vị logic. Việc sử dụng module giúp bạn **đóng gói và tái sử dụng** các cấu hình hạ tầng, đảm bảo tính nhất quán, giảm lặp lại mã và đơn giản hóa việc quản lý các môi trường phức tạp (dev, staging, prod).
:::

**Prompt:**
```
Hãy viết một module Terraform để tạo một S3 bucket trên AWS cho việc lưu trữ website tĩnh.

Yêu cầu cấu trúc module:

main.tf:
- Khai báo tài nguyên `aws_s3_bucket` với tên bucket được truyền vào qua biến.
- Khai báo tài nguyên `aws_s3_bucket_website_configuration` để kích hoạt tính năng website hosting.
- Khai báo tài nguyên `aws_s3_bucket_public_access_block` để chỉ cho phép truy cập công khai thông qua policy.
- Khai báo tài nguyên `aws_s3_bucket_policy` để cấp quyền đọc công khai (`s3:GetObject`) cho bucket.

variables.tf:
- Định nghĩa biến `bucket_name` (kiểu string) cho tên bucket.
- Định nghĩa biến `tags` (kiểu map(string)) cho các tag của tài nguyên.

outputs.tf:
- Xuất ra `bucket_id` (ID của bucket).
- Xuất ra `bucket_website_endpoint` (endpoint của website).

Hãy đảm bảo code tuân thủ các thực hành tốt nhất của Terraform.
```

### 4. Cấu hình Kubernetes Deployment với Helm

**Tình huống:** Bạn cần tạo một Helm chart để deploy một ứng dụng microservice lên Kubernetes cluster với các thành phần cần thiết như Deployment, Service, và Ingress.

:::info Helm - Package Manager cho Kubernetes
**Helm** là công cụ quản lý package cho Kubernetes, giúp đơn giản hóa việc deploy và quản lý ứng dụng. Helm chart cho phép bạn template hóa các manifest Kubernetes, giúp dễ dàng quản lý cấu hình cho nhiều môi trường khác nhau.
:::

**Prompt:**
```
Hãy tạo một Helm chart hoàn chỉnh cho việc deploy một ứng dụng web microservice lên Kubernetes.

Yêu cầu cấu trúc Helm chart:

Chart.yaml:
- apiVersion: v2
- name: microservice-app
- version: 0.1.0
- appVersion: "1.0.0"

values.yaml:
- image: repository, tag, pullPolicy
- replicaCount: 3
- service: type, port, targetPort
- ingress: enabled, host, tls settings
- resources: requests và limits cho CPU/Memory
- autoscaling: enabled, minReplicas, maxReplicas, targetCPUUtilizationPercentage

templates/deployment.yaml:
- Kubernetes Deployment với container spec
- Sử dụng values từ values.yaml
- Health checks (livenessProbe, readinessProbe)

templates/service.yaml:
- Kubernetes Service để expose application

templates/ingress.yaml:
- Kubernetes Ingress để routing traffic từ bên ngoài
- Conditional dựa trên ingress.enabled

templates/hpa.yaml:
- HorizontalPodAutoscaler cho auto scaling
- Conditional dựa trên autoscaling.enabled
```

### 5. Setup GitLab Runner cho CI/CD

**Tình huống:** Bạn cần cấu hình GitLab Runner trong môi trường Kubernetes để chạy các CI/CD pipeline của GitLab Enterprise.

**Prompt:**
```
Hãy hướng dẫn cách setup GitLab Runner trong Kubernetes cluster để phục vụ cho GitLab Enterprise CI/CD.

Yêu cầu setup:

Chuẩn bị:
- Lấy registration token từ GitLab Enterprise (Settings > CI/CD > Runners)
- Tạo namespace `gitlab-runner` trong Kubernetes

GitLab Runner ConfigMap:
- Tạo ConfigMap chứa cấu hình runner
- Cấu hình executor là `kubernetes`
- Set resource limits cho các job container
- Cấu hình pull policy cho Docker images

GitLab Runner Deployment:
- Sử dụng image `gitlab/gitlab-runner:latest`
- Mount ConfigMap và registration token qua Secret
- Set resource requests/limits cho runner container
- Cấu hình RBAC permissions cần thiết

RBAC Setup:
- Tạo ServiceAccount cho GitLab Runner
- Tạo ClusterRole với permissions cần thiết (pods, services, deployments)
- Bind ClusterRole với ServiceAccount

Verification:
- Commands để verify runner đã đăng ký thành công
- Test pipeline đơn giản để kiểm tra runner hoạt động
```