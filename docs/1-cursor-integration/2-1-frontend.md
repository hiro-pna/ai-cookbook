---
sidebar_position: 3
---

# 🎨 Frontend

:::info 🎯 Mục tiêu
Sau khi sử dụng các mẫu prompt này, frontend developer sẽ có khả năng:
- ⚡ **Tăng tốc phát triển** với các prompt được tối ưu hóa
- 🎯 **Tạo mã nguồn chất lượng cao** tuân thủ best practices  
- 🔧 **Gỡ lỗi hiệu quả** với sự hỗ trợ của AI
- 📱 **Xây dựng UI components** nhanh chóng và nhất quán
:::

---

## 🚀 Các Kịch Bản Phát Triển Workflow

### 1️⃣ **Tạo Logic và Utility Functions**

**🎯 Tình huống:** Cần viết các hàm tiện ích, xử lý API calls, hoặc logic business phức tạp.

#### 🔧 **Mẫu: Tích Hợp API**

```
Hãy viết một custom hook React TypeScript tên là `useApiCall`.

**Bối cảnh:**
- Dự án: Ứng dụng web thương mại điện tử sử dụng React 18 + TypeScript
- API: RESTful API với JWT authentication
- Quản lý trạng thái: Zustand hoặc Context API

**Yêu cầu:**
1. **Generic hook** có thể tái sử dụng cho nhiều endpoints
2. **Quản lý trạng thái:** loading, data, error states
3. **Xử lý lỗi:** Network errors, HTTP status codes, timeout
4. **Xác thực:** Tự động đính kèm JWT token vào headers
5. **Cơ chế retry:** Tự động thử lại 3 lần khi thất bại
6. **TypeScript:** Đảm bảo type safety hoàn toàn với generic types

**Kết quả mong đợi:**
const { data, loading, error, refetch } = useApiCall<UserProfile>({
  url: '/api/users/profile',
  method: 'GET',
  dependencies: [userId]
});

**Xử lý lỗi:**
- 401: Chuyển hướng đến trang đăng nhập
- 403: Hiển thị thông báo từ chối quyền truy cập
- 500: Hiển thị thông báo lỗi chung
- Network: Hiển thị thông báo lỗi kết nối
```

#### 🎨 **Mẫu: Xử Lý Dữ Liệu**

```
Tạo một utility function TypeScript để xử lý dữ liệu thương mại điện tử.

**Tên hàm:** `processProductData`

**Kiểu dữ liệu đầu vào:**
```typescript
interface RawProduct {
  id: string;
  name: string;
  price: number;
  discount?: number;
  tags: string[];
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  images: string[];
}

**Logic xử lý:**
1. **Tính toán giá:** Tính giá cuối cùng sau khi giảm giá
2. **Tối ưu hình ảnh:** Thêm query params cho responsive images
3. **Chuẩn hóa tags:** Chuyển tags thành lowercase, loại bỏ trùng lặp
4. **Ánh xạ trạng thái:** Chuyển đổi sang nhãn tiếng Việt
5. **Kiểm tra dữ liệu:** Xác minh các trường bắt buộc, giá > 0

**Kiểu dữ liệu đầu ra:**

interface ProcessedProduct {
  id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  tags: string[];
  availabilityLabel: string;
  isAvailable: boolean;
  optimizedImages: {
    thumbnail: string;
    medium: string;
    large: string;
  };
}

**Xử lý lỗi:** Ném ra các lỗi mô tả rõ ràng cho dữ liệu không hợp lệ
```

---

### 2️⃣ **Phát Triển Component**

**🎯 Tình huống:** Xây dựng UI components tái sử dụng với tính nhất quán trong design system.

#### 📱 **Mẫu: Component Phức Tạp**

```
Tạo một React component `ProductCard` sử dụng TypeScript và Tailwind CSS.

**Bối cảnh Design System:**
- Màu sắc: Primary (#3B82F6), Secondary (#64748B), Success (#10B981)
- Typography: Inter font family
- Spacing: Hệ thống lưới 4px
- Border radius: 8px tiêu chuẩn, 12px cho cards
- Shadow: shadow-md cho cards, shadow-lg cho hover

**Yêu cầu Component:**

**Thiết kế trực quan:** Có thể thay thế bằng image từ figma
Đây là ví dụ minh họa
┌─────────────────────────────┐
│ [Hình ảnh sản phẩm]         │
│                             │
├─────────────────────────────┤
│ Tên sản phẩm                │
│ ⭐⭐⭐⭐⭐ (4.5) 123 đánh giá │
│                             │
│ ₫299,000  ₫399,000 (-25%)   │
│                             │
│ [Thêm vào giỏ] [❤ Yêu thích]│
└─────────────────────────────┘

**Giao diện Props:**
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    isInWishlist?: boolean;
  };
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

**Yêu cầu hành vi:**
1. **Hiệu ứng hover:** Smooth scale transform và tăng shadow
2. **Trạng thái loading:** Skeleton loader khi hình ảnh đang tải
3. **Responsive:** Thiết kế mobile-first
4. **Khả năng tiếp cận:** ARIA labels, keyboard navigation
5. **Hiển thị giá:** Format tiền tệ, hiển thị phần trăm giảm giá
6. **Hiển thị đánh giá:** Star icons với hỗ trợ fractional rating

**Animation:** Framer Motion cho micro-interactions
```

#### 🔄 **Mẫu: Form Component**

```
Tạo một form component `ContactForm` với validation và UX tối ưu.

**Tech Stack:**
- React Hook Form + Zod validation
- TypeScript
- Tailwind CSS + Headless UI
- React Hot Toast cho thông báo

**Các trường Form:**
1. **Tên** (bắt buộc, tối thiểu 2 ký tự)
2. **Email** (bắt buộc, định dạng email hợp lệ)
3. **Số điện thoại** (tùy chọn, định dạng Việt Nam)
4. **Chủ đề** (bắt buộc, dropdown selection)
5. **Tin nhắn** (bắt buộc, tối thiểu 10 ký tự, tối đa 500 ký tự)
6. **Tệp đính kèm** (tùy chọn, tối đa 3 files, 5MB mỗi file)

**Yêu cầu UX:**
- **Validation thời gian thực:** Hiển thị lỗi khi blur
- **Progressive enhancement:** Vô hiệu hóa submit cho đến khi hợp lệ
- **Trạng thái loading:** Hiển thị spinner trong quá trình gửi
- **Phản hồi thành công:** Toast notification + reset form
- **Xử lý lỗi:** Network errors, validation errors
- **Khả năng tiếp cận:** Thân thiện với screen reader

**Schema Validation (Zod):**
const contactSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Vui lòng chọn chủ đề'),
  message: z.string()
    .min(10, 'Tin nhắn phải có ít nhất 10 ký tự')
    .max(500, 'Tin nhắn không được quá 500 ký tự'),
});

**Tích hợp API:** POST tới `/api/contact` với xử lý lỗi phù hợp
```
---

### 3️⃣ **Tái Cấu Trúc Mã & Tối Ưu Hóa**

**🎯 Tình huống:** Hiện đại hóa legacy code và cải thiện hiệu suất.

#### ⚡ **Mẫu: Tối Ưu Hóa Hiệu Suất**

```
Tái cấu trúc component React cũ để cải thiện hiệu suất và áp dụng modern practices.

**Vấn đề hiện tại:**
- Re-renders không cần thiết
- Không có memoization
- Inline functions trong render
- Bundle size lớn
- Prop drilling

**Legacy Component:** `@/components/ProductList.jsx`

**Mục tiêu tối ưu hóa:**
1. **React.memo:** Ngăn chặn re-renders không cần thiết
2. **useMemo/useCallback:** Memoize các tính toán tốn kém
3. **Code splitting:** Dynamic imports cho large components
4. **Tối ưu bundle:** Tree shaking, loại bỏ mã không sử dụng
5. **Quản lý trạng thái:** Thay thế prop drilling bằng Context/Zustand

**Patterns hiện đại:**
- **Custom hooks:** Trích xuất logic có thể tái sử dụng
- **Compound components:** Composition component tốt hơn
- **Render props:** Patterns component linh hoạt
- **Error boundaries:** Xử lý lỗi một cách duyên dáng

**Metrics hiệu suất:**
- Điểm Lighthouse trên 90
- First Contentful Paint dưới 2s
- Largest Contentful Paint dưới 2.5s
- Cumulative Layout Shift dưới 0.1

**Migration TypeScript:** Chuyển đổi từ JavaScript sang TypeScript với typing phù hợp
```

#### 🔧 **Mẫu: Tái Cấu Trúc Kiến Trúc**

```
Tái cấu trúc ứng dụng React từ class components sang modern functional components.

**Kiến trúc hiện tại:**
- Class components với lifecycle methods
- Redux với connect() HOC
- CSS Modules
- Webpack 4

**Kiến trúc mục tiêu:**
- Functional components với hooks
- Zustand/Jotai cho quản lý trạng thái
- Tailwind CSS + CSS-in-JS
- Vite build tool

**Chiến lược Migration:**
1. **Giai đoạn 1:** Chuyển đổi class components sang functional
2. **Giai đoạn 2:** Thay thế Redux bằng modern state management
3. **Giai đoạn 3:** Migration hệ thống styling
4. **Giai đoạn 4:** Nâng cấp build tools

**Yêu cầu tương thích:**
- Duy trì các API contracts hiện có
- Không có breaking changes cho end users
- Migration từ từ (không big bang)
- Chiến lược testing toàn diện

**Cấu trúc File:**

src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── layouts/      # Layout components
├── hooks/            # Custom hooks
├── stores/           # State management
├── utils/            # Utility functions
└── types/            # TypeScript definitions
```

---

### 4️⃣ **Testing & Đảm Bảo Chất Lượng**

**🎯 Tình huống:** Viết comprehensive tests cho components và logic.

#### 🧪 **Mẫu: Component Testing**

```
Viết bộ test toàn diện cho component `ProductCard`.

**Framework Testing:**
- Jest + React Testing Library
- MSW (Mock Service Worker) cho API mocking
- @testing-library/user-event cho user interactions

**Danh mục Test:**

**1. Rendering Tests:**
describe('ProductCard Rendering', () => {
  test('hiển thị thông tin sản phẩm chính xác')
  test('hiển thị phần trăm giảm giá khi có')
  test('hiển thị rating stars và số lượng đánh giá')
  test('xử lý optional props một cách duyên dáng')
})

**2. Interaction Tests:**
describe('ProductCard Interactions', () => {
  test('gọi onAddToCart khi click nút thêm vào giỏ')
  test('gọi onToggleWishlist khi click icon trái tim')
  test('hiển thị trạng thái loading trong async operations')
  test('xử lý keyboard navigation đúng cách')
})

**3. Accessibility Tests:**
describe('ProductCard Accessibility', () => {
  test('có ARIA labels phù hợp')
  test('hỗ trợ keyboard navigation')
  test('duy trì focus management')
  test('cung cấp screen reader announcements')
})

**4. Visual Regression Tests:**
describe('ProductCard Visual', () => {
  test('khớp snapshot ở trạng thái mặc định')
  test('khớp snapshot ở trạng thái loading')
  test('khớp snapshot ở trạng thái lỗi')
  test('responsive design trên các kích thước màn hình khác nhau')
})

**Mock Data Factory:**
const createMockProduct = (overrides = {}) => ({
  id: 'prod-123',
  name: 'Sản phẩm Test',
  price: 299000,
  originalPrice: 399000,
  rating: 4.5,
  reviewCount: 123,
  ...overrides
});
```

#### 📊 **Mẫu: Integration Testing**

```
Viết integration tests cho checkout flow.

**Kịch bản Test:** User journey từ trang sản phẩm đến xác nhận đơn hàng

**Thiết lập:**
- MSW server để mock APIs
- React Router để test navigation
- LocalStorage mock cho cart persistence

**Luồng Test:**
1. **Chọn sản phẩm:** Thêm sản phẩm vào giỏ hàng
2. **Xem lại giỏ hàng:** Thay đổi số lượng, áp dụng coupon
3. **Checkout Form:** Điền thông tin giao hàng và thanh toán
4. **Xác nhận đơn hàng:** Xác minh chi tiết đơn hàng

**API Mocking:**
const handlers = [
  rest.post('/api/cart/add', (req, res, ctx) => {
    return res(ctx.json({ success: true, cartId: 'cart-123' }))
  }),
  rest.post('/api/orders', (req, res, ctx) => {
    return res(ctx.json({ orderId: 'order-456', status: 'confirmed' }))
  }),
]
**Triển khai Test:**
test('luồng checkout hoàn chình', async () => {
  // 1. Render trang sản phẩm
  // 2. Thêm vào giỏ hàng
  // 3. Điều hướng đến checkout
  // 4. Điền form
  // 5. Gửi đơn hàng
  // 6. Xác minh confirmation
})

**Kịch bản lỗi:**
- Lỗi mạng
- Lỗi validation
- Lỗi thanh toán
- Vấn đề tồn kho
```

---

### 5️⃣ **TypeScript & Type Safety**

**🎯 Tình huống:** Tạo TypeScript definitions và cải thiện type safety.

#### 🏗️ **Mẫu: Tạo API Type**

```
Tạo TypeScript types từ OpenAPI specification.

**Bối cảnh:**
- Backend API có OpenAPI 3.0 spec
- Frontend cần type-safe API calls
- Tự động tạo type trong CI/CD

**Yêu cầu:**
1. **Tạo types** từ OpenAPI spec file
2. **API client** với type safety hoàn toàn
3. **Request/Response types** cho tất cả endpoints
4. **Error types** cho error handling
5. **Enum types** cho constants

**Tích hợp Tools:**
- `openapi-typescript` để tạo types
- `openapi-fetch` cho type-safe API calls
- `zod` cho runtime validation

**Cấu trúc được tạo:**
// Được tạo từ OpenAPI spec
export interface paths {
  '/api/products': {
    get: operations['getProducts']
    post: operations['createProduct']
  }
  '/api/products/{id}': {
    get: operations['getProduct']
    put: operations['updateProduct']
    delete: operations['deleteProduct']
  }
}

export interface components {
  schemas: {
    Product: {
      id: string
      name: string
      price: number
      // ... các trường khác
    }
    ProductCreateRequest: {
      name: string
      price: number
      // ... các trường khác
    }
  }
}

**Ví dụ sử dụng:**
import { paths } from './generated/api-types'

const api = createApiClient<paths>({ baseUrl: '/api' })

// Type-safe API call
const { data, error } = await api.GET('/api/products', {
  params: { query: { limit: 10, offset: 0 } }
})
```


#### 🎯 **Mẫu: Patterns TypeScript Nâng Cao**

```
Triển khai advanced TypeScript patterns cho complex component props.

**Kịch bản:** Polymorphic component có thể render như các HTML elements khác nhau

**Yêu cầu:**
1. **Polymorphic `as` prop** để chỉ định loại element
2. **Conditional props** dựa trên loại element
3. **Ref forwarding** với typing phù hợp
4. **Event handlers** với correct event types

**Pattern triển khai:**
type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

**Triển khai Component:**
interface BoxOwnProps {
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

type BoxProps<C extends React.ElementType> = 
  PolymorphicComponentPropWithRef<C, BoxOwnProps>

const Box = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    { as, color, size, children, ...rest }: BoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div'
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    )
  }
)

**Ví dụ sử dụng:**
// Render as div
<Box color="primary">Nội dung</Box>

// Render as button với button props
<Box as="button" onClick={handleClick} disabled>
  Nhấn vào đây
</Box>

// Render as Link với Link props
<Box as={Link} to="/products" color="secondary">
  Xem sản phẩm
</Box>
```

---

### 6️⃣ **Debug & Fixed Bug**

**🎯 Tình huống:** Phân tích và sửa các lỗi phức tạp với sự hỗ trợ của AI.

#### 🐛 **Mẫu: Phân Tích Lỗi**

```
Phân tích và sửa lỗi React sau đây:

**Bối cảnh lỗi:**
- Môi trường: Production React app
- Hành động của user: Nhấp nút "Thêm vào giỏ hàng"
- Tần suất: 15% người dùng bị ảnh hưởng
- Trình duyệt: Chrome 120 trở lên, Safari 17 trở lên

**Error Stack Trace:**
TypeError: Cannot read properties of undefined (reading 'map')
  at ProductList.render (ProductList.jsx:45:31)
  at finishClassComponent (react-dom.production.min.js:15:1234)
  at updateClassComponent (react-dom.production.min.js:15:5678)


**Mã nguồn liên quan:** `@/components/ProductList.jsx` dòng 45

**Phân tích cần thiết:**
1. **Xác định nguyên nhân gốc:** Tại sao `products` array lại undefined?
2. **Phân tích data flow:** Theo dõi dữ liệu từ API call đến component
3. **Kiểm tra race condition:** Có phải vấn đề về timing không?
4. **Error boundary:** Tại sao error boundary không bắt được?

**Chiến lược sửa lỗi:**
1. **Sửa chữa ngay lập tức:** Thêm defensive programming
2. **Sửa chữa dài hạn:** Cải thiện kiến trúc data flow
3. **Phòng ngừa:** Thêm TypeScript types phù hợp
4. **Giám sát:** Thêm error tracking với Sentry

**Giải pháp mong đợi:**
- Sửa mã với proper null checking
- Cải thiện chiến lược error handling
- Unit tests để ngăn regression
- Tối ưu hóa hiệu suất nếu áp dụng được
```

#### 🔍 **Mẫu: Điều Tra Hiệu Suất**

```
Điều tra các vấn đề hiệu suất trong ứng dụng React.

**Vấn đề hiệu suất:**
- Thời gian tải trang: 8-12 giây (mục tiêu: dưới 5s)
- JavaScript bundle: 2.5MB (mục tiêu: dưới 500KB)
- Time to Interactive: 15 giây
- Sử dụng bộ nhớ: hơn 150MB (nghi ngờ memory leaks)

**Các khu vực điều tra:**

**1. Phân tích Bundle:**
npm run build:analyze
# Xác định các dependencies lớn nhất
# Kiểm tra các packages trùng lặp
# Tìm cơ hội unused code


**2. Hiệu suất Runtime:**
- Phân tích React DevTools Profiler
- Chrome DevTools Performance tab
- Phát hiện memory leak
- Phân tích component re-render

**3. Tối ưu hóa Network:**
- Cơ hội tối ưu hóa hình ảnh
- Hiệu quả API call
- Xem xét chiến lược caching
- Cấu hình CDN

**Chiến lược tối ưu hóa:**
1. **Code splitting:** Dựa trên route và component
2. **Tree shaking:** Loại bỏ mã không sử dụng
3. **Tối ưu hóa hình ảnh:** Định dạng WebP, lazy loading
4. **Memoization:** React.memo, useMemo, useCallback
5. **Tối ưu bundle:** Tinh chỉnh config Webpack/Vite

**Thiết lập giám sát:**
- Theo dõi Core Web Vitals
- Real User Monitoring (RUM)
- Tích hợp error tracking
- Performance budgets

**Metrics thành công:**
- Điểm Lighthouse trên 90
- Kích thước bundle dưới 500KB
- First Contentful Paint dưới 2s
- Time to Interactive dưới 3s
```
---

## 🎯 Best Practices & Tip

### 💡 **Tip Prompt Engineering**

#### ✅ **Prompting hiệu quả:**

```
✅ "Tạo React component `UserProfile` với TypeScript, Tailwind CSS, 
   validation bằng Zod, và responsive design cho mobile-first approach"

❌ "Tạo component hiển thị thông tin user"
```

#### 🎯 **Context IS KING:**

```
**Luôn cung cấp:**
- Chi tiết tech stack (React 18, TypeScript, Tailwind)
- Bối cảnh dự án (thương mại điện tử, dashboard, blog)
- Ràng buộc yêu cầu (hiệu suất, khả năng tiếp cận, mobile-first)
- Nhu cầu tích hợp (APIs, quản lý trạng thái, routing)
```

#### 🔄 **Tinh chỉnh lặp đi lặp lại:**

```
1. **Bắt đầu rộng:** "Tạo component ProductCard"
2. **Thêm chi tiết:** "Thêm hover effects và loading states"
3. **Tối ưu hóa:** "Tối ưu hiệu suất với React.memo"
4. **Test:** "Viết unit tests cho component này"
```

### 🚀 **Kỹ Thuật Nâng Cao**

#### 📚 **Tham khảo mã hiện có:**

```
"Tham khảo styling pattern từ @/components/Button.tsx và 
 áp dụng tương tự cho component ProductCard mới"
```

#### 🔗 **Chuỗi Prompts:**

```
Prompt 1: "Tạo cấu trúc component"
Prompt 2: "Thêm TypeScript types"
Prompt 3: "Thêm unit tests"
Prompt 4: "Tối ưu hóa hiệu suất"
```

#### 🎨 **Tích hợp Design System:**

```
"Sử dụng design tokens từ @/styles/tokens.ts và 
 component patterns từ thư mục @/components/ui/"
```

:::tip 💡 Pro Tip
- **Bắt đầu cụ thể:** Càng cụ thể về yêu cầu, kết quả càng chính xác
- **Sử dụng ví dụ:** Cung cấp ví dụ mã để AI hiểu pattern mong muốn
- **Lặp từ từ:** Xây dựng độ phức tạp từng bước thay vì một lần
- **Tham chiếu codebase:** Dùng `@file` để duy trì tính nhất quán
:::

:::warning ⚠️ Lưu ý bảo mật
- **Không bao giờ chia sẻ:** API keys, secrets, hoặc dữ liệu nhạy cảm trong prompts
- **Làm sạch ví dụ:** Loại bỏ dữ liệu cá nhân/khách hàng trước khi chia sẻ
- **Xem xét mã được tạo:** Luôn kiểm tra các tác động bảo mật
:::

---