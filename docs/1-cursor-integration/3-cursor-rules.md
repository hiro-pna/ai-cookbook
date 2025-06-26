---
sidebar_position: 4
---

# Cursor Rules

## 🤔 Tại sao cần Cursor Rules?

Cursor Rules giống như việc "dạy" AI hiểu cách làm việc của team. Thay vì phải giải thích đi giải thích lại cùng một quy tắc mỗi khi dùng AI, lập trình viên chỉ cần setup một lần và AI sẽ tự động áp dụng.

**Lợi ích thực tế:**
- **Tiết kiệm thời gian:** Không cần nhắc AI về coding style mỗi lần
- **Code nhất quán:** Cả team viết code theo cùng một chuẩn
- **Giảm conflict trong code review:** Ít tranh cãi về format và structure
- **Onboarding nhanh:** Dev mới có thể tạo code đúng chuẩn ngay từ đầu

:::tip Kinh nghiệm thực tế
Thay vì viết comment "// TODO: Fix this later" hoài không fix, hãy tạo rule để AI tự động viết code đúng chuẩn từ đầu.
:::

---

## Cách setup cơ bản

### Tạo file Rules đầu tiên

1. **Tạo thư mục:** `.cursor/rules` ở root của project
2. **Tạo file:** Với đuôi `.mdc` (Markdown Cursor)
3. **Cấu trúc:** Frontmatter + nội dung

**Ví dụ đơn giản: `vietnamese-comments.mdc`**

```markdown
---
name: Vietnamese Comments
---

# Quy tắc comment tiếng Việt

Tất cả comment trong code phải viết bằng tiếng Việt, dễ hiểu cho team Việt Nam:

```javascript
// ❌ Không nên
// Calculate total price with tax
const totalPrice = price * (1 + taxRate);

// ✅ Nên viết
// Tính tổng giá bao gồm thuế
const totalPrice = price * (1 + taxRate);
```

**Exception:** Comment cho public API hoặc library có thể viết tiếng Anh.
```

### Áp dụng Rules cho team

```bash
# Commit vào Git để share với team
git add .cursor/rules/
git commit -m "Add cursor rules for team"
git push
```

**Lưu ý quan trọng:** Mọi người trong team phải pull về để có cùng rules.

---

## Ba cấp độ Rules thực tế

### Cấp 1: Rules cơ bản (Bắt buộc cho mọi project)

**`basic-standards.mdc`**
```markdown
---
name: Chuẩn code cơ bản
---

# Quy tắc code cơ bản

## 1. Naming Convention
- **File:** kebab-case (vd: `user-profile.js`)
- **Variable:** camelCase (vd: `userName`)
- **Constant:** UPPER_SNAKE_CASE (vd: `API_BASE_URL`)

## 2. Code Quality
- Không dùng `var`, chỉ dùng `let` và `const`
- Không để magic number, phải dùng constant có tên
- Mọi function phải có return type rõ ràng (TypeScript)

## 3. Error Handling
```typescript
// ❌ Không bắt lỗi
const data = await fetchUserData(userId);

// ✅ Luôn bắt lỗi
try {
  const data = await fetchUserData(userId);
  // xử lý data
} catch (error) {
  console.error('Lỗi khi lấy dữ liệu user:', error);
  // xử lý lỗi
}
```

### Cấp 2: Rules theo project (Quan trọng nhất)

Đây là phần tạo ra sự khác biệt lớn - dạy AI học từ code hiện có của project.

**`react-component-pattern.mdc`**
```
---
name: React Component Pattern
---

# Quy tắc React Component

Khi tạo component mới, học theo pattern từ code hiện có:

## Structure chuẩn
Tham khảo `@/components/common/Button.tsx` để hiểu cách:
- Định nghĩa Props interface
- Sử dụng forwardRef
- Export component và types

## Folder structure
components/
├── common/          # Component dùng chung
├── forms/           # Component liên quan form
└── pages/           # Component specific cho từng page

## Template component mới
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Props definition
  className?: string;
  children?: React.ReactNode;
}

const ComponentName: React.FC<ComponentNameProps> = ({ 
  className,
  children,
  ...props 
}) => {
  return (
    <div className={cn('default-styles', className)} {...props}>
      {children}
    </div>
  );
};

export default ComponentName;
export type { ComponentNameProps };

## Styling
- Dùng Tailwind classes, tham khảo `@/components/ui/button.tsx`
- Dùng `cn()` utility để merge classes
- Responsive design: mobile-first approach
```

**`api-integration.mdc`**
```
---
name: API Integration Pattern
---

# Quy tắc tích hợp API

## Hook pattern
Tham khảo `@/hooks/useApiCall.ts` cho cách:
- Handle loading state
- Error handling
- Data caching

## Service layer
Tham khảo `@/services/userService.ts` cho:
- API endpoint organization
- Request/response types
- Error transformation

## Ví dụ tạo API hook mới

export function useGetUserProfile(userId: string) {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const profile = await userService.getProfile(userId);
        setData(profile);
      } catch (err) {
        setError('Không thể tải thông tin user');
        console.error('Lỗi get user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { data, loading, error };
}
```

### Cấp 3: Rules nâng cao (Tùy project)

**`database-pattern.mdc`** (Cho backend project)
```
---
name: Database Pattern
---

# Quy tắc Database

## Entity naming
- Table: snake_case (vd: `user_profiles`)
- Entity class: PascalCase (vd: `UserProfile`)

## Repository pattern
Tham khảo `@/repositories/UserRepository.java`:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Query method naming convention
    Optional<User> findByEmail(String email);
    List<User> findByStatusAndCreatedAtAfter(UserStatus status, LocalDateTime date);
    
    // Custom query với @Query
    @Query("SELECT u FROM User u WHERE u.lastLoginAt < :date")
    List<User> findInactiveUsers(@Param("date") LocalDateTime date);
}

## Service layer
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    // Constructor injection (không dùng @Autowired)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public UserDto createUser(CreateUserRequest request) {
        // Validate input
        validateCreateUserRequest(request);
        
        // Business logic
        User user = User.builder()
            .email(request.getEmail())
            .name(request.getName())
            .status(UserStatus.ACTIVE)
            .build();
            
        User savedUser = userRepository.save(user);
        
        // Convert to DTO
        return UserMapper.toDto(savedUser);
    }
}
```

---

## Rules thực tế theo tech stack

### React + TypeScript

**`form-handling.mdc`**
```
---
name: Form Handling
---

# Quy tắc xử lý Form

## React Hook Form pattern
Tham khảo `@/components/forms/LoginForm.tsx`:

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema validation
const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.login(data);
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Lỗi đăng nhập:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}

## Validation rules
- Dùng Zod cho schema validation
- Error message bằng tiếng Việt
- Loading state cho submit button
```

### Node.js + Express

**`express-controller.mdc`**
```
---
name: Express Controller
---

# Quy tắc Express Controller

## Controller structure
Tham khảo `@/controllers/userController.js`:

const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

// @desc    Lấy danh sách users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  
  try {
    const users = await userService.getUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    });
    
    res.status(200).json({
      success: true,
      data: users,
      message: 'Lấy danh sách users thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách users',
      error: error.message,
    });
  }
});

module.exports = {
  getUsers,
};

## Response format
// Success response
{
  "success": true,
  "data": {...},
  "message": "Thông báo thành công"
}

// Error response
{
  "success": false,
  "message": "Thông báo lỗi",
  "error": "Chi tiết lỗi"
}
```

---

## Workflow setup thực tế

### Bước 1: Xác định pain points
Quan sát code review gần đây và liệt kê những vấn đề lặp đi lặp lại:
- Naming convention không nhất quán
- Error handling thiếu
- Comment không rõ ràng
- API response format khác nhau

### Bước 2: Tạo rules cơ bản
Bắt đầu với 3-5 rules quan trọng nhất:
```bash
.cursor/rules/
├── basic-standards.mdc      # Quy tắc cơ bản
├── naming-convention.mdc    # Quy tắc đặt tên
└── error-handling.mdc       # Quy tắc xử lý lỗi
```

### Bước 3: Thêm context từ project
Dùng `@file` references để AI học từ code hiện có:
```markdown
Tham khảo `@/components/common/Button.tsx` cho component structure
Tham khảo `@/hooks/useApiCall.ts` cho API integration pattern
```

### Bước 4: Test và cải thiện
- Thử tạo code mới với AI
- Kiểm tra AI có follow rules không
- Adjust rules nếu cần thiết

### Bước 5: Share với team
```bash
git add .cursor/rules/
git commit -m "feat: add cursor rules cho team"
git push

# Thông báo team pull về
```

---

## 💡 Tips

### 1. Rules ngắn gọn, cụ thể
```markdown
❌ "Viết code clean và maintainable"
✅ "Mọi async function phải có try-catch block"
```

### 2. Dùng ví dụ thực tế
```markdown
❌ "Follow best practices"
✅ "Tham khảo @/services/userService.js cho error handling pattern"
```

### 3. Ưu tiên rules có impact cao
- Naming convention (ảnh hưởng readability)
- Error handling (ảnh hưởng stability)
- Code structure (ảnh hưởng maintainability)

### 4. Update rules thường xuyên
- Remove rules không còn dùng
- Add rules cho pattern mới
- Refine rules dựa trên feedback team

:::warning Lưu ý quan trọng
- **Luôn commit `.cursor/rules`** vào Git
- **Sync với team** trước khi áp dụng rules mới
- **Bắt đầu nhỏ** - 3-5 rules là đủ, không tạo quá nhiều
- **Test thường xuyên** - đảm bảo AI follow rules đúng cách
:::

---

## Troubleshooting

### AI không follow rules
1. **Kiểm tra syntax:** File `.mdc` có đúng format không
2. **Restart Cursor:** Đôi khi cần restart để load rules mới
3. **Simplify rules:** Rules quá phức tạp AI có thể không hiểu

### Rules conflict nhau
1. **Ưu tiên rules:** Specific rules override general rules
2. **Organize rules:** Chia thành categories rõ ràng
3. **Review regularly:** Remove rules không cần thiết

### Team không follow
1. **Document benefits:** Giải thích lợi ích cụ thể
2. **Start small:** Bắt đầu với rules đơn giản
3. **Lead by example:** Senior dev dùng trước, junior follow

Cursor Rules không phải magic - đó là cách để team làm việc nhất quán và hiệu quả hơn.