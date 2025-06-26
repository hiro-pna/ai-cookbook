---
sidebar_position: 4
---

# ⚙️ Backend

:::info 🎯 Mục tiêu
Sau khi sử dụng các mẫu prompt này, backend developer sẽ có khả năng:
- ⚡ **Tăng tốc phát triển** với các prompt được tối ưu hóa
- 🎯 **Tạo mã nguồn chất lượng cao** tuân thủ best practices
- 🔧 **Gỡ lỗi hiệu quả** với sự hỗ trợ của AI
- 🏗️ **Xây dựng API services** nhanh chóng và nhất quán
:::

---

## 🚀 Các Kịch Bản Phát Triển Workflow

### 1️⃣ **Tạo CRUD Operations từ Database Schema**

**🎯 Tình huống:** Khởi tạo nhanh một feature slice hoàn chỉnh từ database design.

#### ☕ **Mẫu: Spring Boot Full Stack**

```
Tạo một complete feature slice cho Product Management trong Spring Boot.

**Context:**
- Framework: Spring Boot 3.2 + Java 17
- Database: PostgreSQL với JPA/Hibernate
- Architecture: Layered architecture (Controller → Service → Repository)
- Security: JWT authentication với Spring Security
- Documentation: OpenAPI 3.0 với Springdoc

**Database Schema:**
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category_id BIGINT NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

**Requirements:**

**1. JPA Entity:**
- Audit fields với `@CreationTimestamp`, `@UpdateTimestamp`
- Validation annotations (`@NotNull`, `@Positive`, `@Size`)
- Relationship mapping với Category entity
- Custom equals/hashCode based on business key

**2. Repository Layer:**
- Extend `JpaRepository<Product, Long>`
- Custom query methods với `@Query`
- Specification-based dynamic queries
- Pagination và sorting support

**3. Service Layer:**
- Interface và implementation separation
- DTO mapping với MapStruct
- Business validation rules
- Transaction management với `@Transactional`

**4. Controller Layer:**
- RESTful endpoints (`/api/v1/products`)
- Request/Response DTOs
- Validation với `@Valid`
- OpenAPI documentation annotations

**5. Exception Handling:**
- Custom exceptions (`ProductNotFoundException`)
- Global exception handler với `@ControllerAdvice`
- Structured error responses

**Expected File Structure:**
src/main/java/com/company/product/
├── entity/
│   └── Product.java
├── repository/
│   └── ProductRepository.java
├── service/
│   ├── ProductService.java
│   └── ProductServiceImpl.java
├── controller/
│   └── ProductController.java
├── dto/
│   ├── ProductRequestDto.java
│   ├── ProductResponseDto.java
│   └── ProductUpdateDto.java
├── mapper/
│   └── ProductMapper.java
└── exception/
    └── ProductNotFoundException.java
```

#### 🔷 **Mẫu: .NET Core Clean Architecture**

```
Implement Product Management feature trong .NET 8 với Clean Architecture.

**Architecture Layers:**
- **Domain:** Entities, Value Objects, Domain Services
- **Application:** Use Cases, DTOs, Interfaces
- **Infrastructure:** Data Access, External Services
- **Presentation:** API Controllers, Middleware

**Domain Requirements:**
// Domain Entity
public class Product : BaseEntity
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public Money Price { get; private set; }
    public int StockQuantity { get; private set; }
    public ProductSku Sku { get; private set; }
    public CategoryId CategoryId { get; private set; }
    public bool IsActive { get; private set; }
    
    // Domain methods
    public void UpdatePrice(Money newPrice);
    public void AdjustStock(int quantity);
    public void Activate();
    public void Deactivate();
}

**Application Layer:**
- **CQRS pattern** với MediatR
- **Command/Query separation**
- **Validation** với FluentValidation
- **Mapping** với AutoMapper

**Use Cases to Implement:**
1. `CreateProductCommand` - Tạo sản phẩm mới
2. `UpdateProductCommand` - Cập nhật thông tin
3. `GetProductQuery` - Lấy thông tin sản phẩm
4. `GetProductsQuery` - Lấy danh sách với filtering
5. `DeleteProductCommand` - Xóa sản phẩm

**Infrastructure:**
- **EF Core** với Code First approach
- **Repository pattern** implementation
- **Unit of Work** pattern
- **Database migrations**

**API Layer:**
- **Minimal APIs** hoặc Controller-based
- **Swagger/OpenAPI** documentation
- **Versioning** support
- **Rate limiting** và **CORS** configuration

**Error Handling:**
- Custom exceptions với specific error codes
- Global exception middleware
- Structured logging với Serilog
```

---

### 2️⃣ **Thiết Kế API & Documentation**

**🎯 Tình huống:** Thiết kế RESTful APIs chuẩn mực với comprehensive documentation.

#### 📡 **Mẫu: OpenAPI Specification**

```
Design comprehensive OpenAPI 3.0 specification cho E-commerce Product API.

**API Requirements:**

**Base Configuration:**
- Base URL: `https://api.example.com/v1`
- Authentication: Bearer JWT tokens
- Content-Type: `application/json`
- Error format: RFC 7807 Problem Details

**Endpoints to Design:**

**1. Product Management:**
GET    /products              # List products with filtering
POST   /products              # Create new product
GET    /products/{id}         # Get product by ID
PUT    /products/{id}         # Update product
DELETE /products/{id}         # Delete product
PATCH  /products/{id}/stock   # Update stock quantity

**2. Advanced Features:**
GET    /products/search       # Full-text search
GET    /products/categories/{categoryId}  # Products by category
POST   /products/bulk         # Bulk operations
GET    /products/export       # Export to CSV/Excel

**Schema Definitions:**
ProductResponse:
  type: object
  properties:
    id:
      type: integer
      format: int64
      example: 123
    name:
      type: string
      maxLength: 255
      example: "Wireless Headphones"
    description:
      type: string
      example: "High-quality noise-cancelling headphones"
    price:
      type: number
      format: decimal
      minimum: 0
      example: 299.99
    stockQuantity:
      type: integer
      minimum: 0
      example: 50
    sku:
      type: string
      pattern: "^[A-Z0-9-]+$"
      example: "WH-001"
    category:
      $ref: '#/components/schemas/CategoryResponse'
    isActive:
      type: boolean
      example: true
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time

**Error Handling:**
- 400: Bad Request với validation details
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (duplicate SKU)
- 422: Unprocessable Entity
- 500: Internal Server Error

**Query Parameters:**
- Pagination: `page`, `size`, `sort`
- Filtering: `category`, `priceMin`, `priceMax`, `inStock`
- Search: `q` (full-text search)

**Response Headers:**
- `X-Total-Count`: Total number of items
- `X-Page-Count`: Total number of pages
- `Link`: Pagination links (RFC 5988)
```

#### 🔒 **Mẫu: Authentication & Authorization**

```
Implement JWT-based authentication system với role-based authorization.

**Authentication Flow:**
1. **Login:** Username/password → JWT access + refresh tokens
2. **Token Refresh:** Refresh token → new access token
3. **Logout:** Invalidate refresh token
4. **Password Reset:** Email-based reset flow

**Security Requirements:**

**JWT Configuration:**
- **Access Token:** 15 minutes expiry, contains user claims
- **Refresh Token:** 7 days expiry, stored securely
- **Algorithm:** RS256 với key rotation
- **Claims:** userId, roles, permissions, iat, exp

**Authorization Levels:**
public enum Role {
    ADMIN("admin", Set.of(
        Permission.PRODUCT_CREATE,
        Permission.PRODUCT_UPDATE,
        Permission.PRODUCT_DELETE,
        Permission.USER_MANAGE
    )),
    MANAGER("manager", Set.of(
        Permission.PRODUCT_CREATE,
        Permission.PRODUCT_UPDATE,
        Permission.PRODUCT_VIEW
    )),
    USER("user", Set.of(
        Permission.PRODUCT_VIEW
    ));
}

**Security Implementation:**
- **Password hashing:** BCrypt với salt rounds 12
- **Rate limiting:** 5 login attempts per 15 minutes
- **Account lockout:** After 5 failed attempts
- **Session management:** Redis-based token blacklist
- **CSRF protection:** For web clients
- **CORS configuration:** Restricted origins

**API Endpoints:**
POST /auth/login           # Authenticate user
POST /auth/refresh         # Refresh access token
POST /auth/logout          # Logout user
POST /auth/forgot-password # Request password reset
POST /auth/reset-password  # Reset password with token
GET  /auth/profile         # Get current user profile
PUT  /auth/profile         # Update user profile

**Security Headers:**
- `Authorization: Bearer {access_token}`
- `X-CSRF-Token: {csrf_token}` (for web clients)
- Security response headers (HSTS, CSP, etc.)
```

---

### 3️⃣ **Thiết Kế Database & Tối Ưu Hóa**

**🎯 Tình huống:** Thiết kế database schema và optimize performance.

#### 🗄️ **Mẫu: Thiết Kế Database Phức Tạp**

```
Design database schema cho Multi-tenant E-commerce Platform.

**Business Requirements:**
- **Multi-tenancy:** Multiple stores on same platform
- **Product Catalog:** Complex product variations
- **Order Management:** Complete order lifecycle
- **Inventory Tracking:** Real-time stock management
- **User Management:** Customers, store owners, admins

**Core Entities:**

**1. Tenant Management:**
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    domain VARCHAR(255),
    plan_type VARCHAR(50) NOT NULL DEFAULT 'basic',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    settings JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX idx_tenants_domain ON tenants(domain);

**2. Product Catalog với Variations:**
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES categories(id),
    brand_id UUID REFERENCES brands(id),
    status VARCHAR(20) DEFAULT 'active',
    attributes JSONB, -- Flexible attributes
    seo_data JSONB,   -- SEO metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, sku)
);

CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    price_adjustment DECIMAL(10,2) DEFAULT 0,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    variant_attributes JSONB, -- Size, Color, etc.
    is_default BOOLEAN DEFAULT false,
    UNIQUE(product_id, sku)
);

**3. Order Management:**
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    customer_id UUID REFERENCES customers(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    shipping_address JSONB,
    billing_address JSONB,
    payment_status VARCHAR(20) DEFAULT 'pending',
    fulfillment_status VARCHAR(20) DEFAULT 'unfulfilled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_variant_id UUID NOT NULL REFERENCES product_variants(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    product_snapshot JSONB -- Store product data at time of order
);

**Performance Optimizations:**
- **Partitioning:** Orders by tenant_id và date
- **Indexing Strategy:** Composite indexes for common queries
- **Materialized Views:** For reporting và analytics
- **Connection Pooling:** PgBouncer configuration
- **Query Optimization:** EXPLAIN ANALYZE for slow queries

**Data Integrity:**
- **Foreign Key Constraints:** Maintain referential integrity
- **Check Constraints:** Business rule validation
- **Triggers:** Audit trails và automatic updates
- **Row Level Security:** Tenant isolation
```

#### 🔍 **Mẫu: Tối Ưu Hóa Query**

```
Optimize slow-performing queries trong e-commerce database.

**Scenario:** Product search và filtering queries đang chậm.

**Current Slow Query:**
SELECT p.*, c.name as category_name, b.name as brand_name,
       AVG(r.rating) as avg_rating, COUNT(r.id) as review_count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN reviews r ON p.id = r.product_id
WHERE p.tenant_id = $1
  AND p.status = 'active'
  AND p.name ILIKE '%wireless%'
  AND p.base_price BETWEEN $2 AND $3
  AND c.name = $4
GROUP BY p.id, c.name, b.name
ORDER BY avg_rating DESC, p.created_at DESC
LIMIT 20 OFFSET $5;

**Performance Analysis:**
1. **EXPLAIN ANALYZE** the query
2. **Identify bottlenecks:** Sequential scans, expensive sorts
3. **Check index usage:** Missing or inefficient indexes
4. **Analyze query plan:** Nested loops vs hash joins

**Optimization Strategy:**

**1. Index Optimization:**
-- Composite index for common filters
CREATE INDEX idx_products_tenant_status_price 
ON products(tenant_id, status, base_price) 
WHERE status = 'active';

-- Full-text search index
CREATE INDEX idx_products_name_gin 
ON products USING gin(to_tsvector('english', name));

-- Category filtering
CREATE INDEX idx_products_category_tenant 
ON products(category_id, tenant_id, status);

**2. Query Rewrite:**
-- Split into multiple queries to avoid expensive JOINs
WITH product_base AS (
  SELECT id, name, base_price, category_id, brand_id, created_at
  FROM products 
  WHERE tenant_id = $1 
    AND status = 'active'
    AND base_price BETWEEN $2 AND $3
    AND to_tsvector('english', name) @@ to_tsquery('wireless')
),
product_ratings AS (
  SELECT product_id, AVG(rating) as avg_rating, COUNT(*) as review_count
  FROM reviews 
  WHERE product_id IN (SELECT id FROM product_base)
  GROUP BY product_id
)
SELECT pb.*, c.name as category_name, b.name as brand_name,
       COALESCE(pr.avg_rating, 0) as avg_rating,
       COALESCE(pr.review_count, 0) as review_count
FROM product_base pb
LEFT JOIN categories c ON pb.category_id = c.id AND c.name = $4
LEFT JOIN brands b ON pb.brand_id = b.id
LEFT JOIN product_ratings pr ON pb.id = pr.product_id
WHERE c.id IS NOT NULL
ORDER BY pr.avg_rating DESC NULLS LAST, pb.created_at DESC
LIMIT 20 OFFSET $5;

**3. Materialized Views:**
```sql
-- Pre-computed product ratings
CREATE MATERIALIZED VIEW product_ratings_mv AS
SELECT product_id, 
       AVG(rating) as avg_rating,
       COUNT(*) as review_count,
       MAX(created_at) as last_review_at
FROM reviews 
GROUP BY product_id;

CREATE UNIQUE INDEX ON product_ratings_mv(product_id);

-- Refresh strategy
CREATE OR REPLACE FUNCTION refresh_product_ratings()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY product_ratings_mv;
END;
$$ LANGUAGE plpgsql;

**4. Application-Level Optimizations:**
- **Query result caching** với Redis
- **Database connection pooling**
- **Read replicas** cho search queries
- **Elasticsearch** cho complex search requirements
```

---

### 4️⃣ **Chiến Lược Testing**

**🎯 Tình huống:** Comprehensive testing cho backend services.

#### 🧪 **Mẫu: Unit Testing**

```
Viết comprehensive unit tests cho ProductService trong Spring Boot.

**Testing Framework:**
- JUnit 5 + Mockito + AssertJ
- Testcontainers cho integration tests
- WireMock cho external service mocking

**Test Structure:**

**1. Service Layer Tests:**
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    
    @Mock private ProductRepository productRepository;
    @Mock private CategoryRepository categoryRepository;
    @Mock private ProductMapper productMapper;
    @Mock private ProductValidator productValidator;
    
    @InjectMocks private ProductServiceImpl productService;
    
    @Test
    @DisplayName("Should create product successfully when valid data provided")
    void shouldCreateProductSuccessfully() {
        // Given
        ProductCreateRequest request = ProductTestData.createValidRequest();
        Product product = ProductTestData.createProduct();
        ProductResponse expectedResponse = ProductTestData.createResponse();
        
        when(productValidator.validate(request)).thenReturn(ValidationResult.valid());
        when(categoryRepository.existsById(request.getCategoryId())).thenReturn(true);
        when(productMapper.toEntity(request)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(product);
        when(productMapper.toResponse(product)).thenReturn(expectedResponse);
        
        // When
        ProductResponse actualResponse = productService.createProduct(request);
        
        // Then
        assertThat(actualResponse).isEqualTo(expectedResponse);
        verify(productRepository).save(product);
        verifyNoMoreInteractions(productRepository);
    }
    
    @Test
    @DisplayName("Should throw exception when category not found")
    void shouldThrowExceptionWhenCategoryNotFound() {
        // Given
        ProductCreateRequest request = ProductTestData.createValidRequest();
        when(categoryRepository.existsById(request.getCategoryId())).thenReturn(false);
        
        // When & Then
        assertThatThrownBy(() -> productService.createProduct(request))
            .isInstanceOf(CategoryNotFoundException.class)
            .hasMessage("Category not found with id: " + request.getCategoryId());
            
        verify(productRepository, never()).save(any());
    }
}

**2. Repository Tests:**
@DataJpaTest
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:testdb"
})
class ProductRepositoryTest {
    
    @Autowired private TestEntityManager entityManager;
    @Autowired private ProductRepository productRepository;
    
    @Test
    @DisplayName("Should find products by category and price range")
    void shouldFindProductsByCategoryAndPriceRange() {
        // Given
        Category category = CategoryTestData.createCategory();
        entityManager.persistAndFlush(category);
        
        Product product1 = ProductTestData.createProduct(category, new BigDecimal("100.00"));
        Product product2 = ProductTestData.createProduct(category, new BigDecimal("200.00"));
        Product product3 = ProductTestData.createProduct(category, new BigDecimal("300.00"));
        
        entityManager.persistAndFlush(product1);
        entityManager.persistAndFlush(product2);
        entityManager.persistAndFlush(product3);
        
        // When
        List<Product> results = productRepository.findByCategoryAndPriceRange(
            category.getId(), 
            new BigDecimal("150.00"), 
            new BigDecimal("250.00")
        );
        
        // Then
        assertThat(results).hasSize(1);
        assertThat(results.get(0).getBasePrice()).isEqualTo(new BigDecimal("200.00"));
    }
}

**3. Test Data Builders:**
public class ProductTestData {
    
    public static ProductCreateRequest createValidRequest() {
        return ProductCreateRequest.builder()
            .name("Test Product")
            .description("Test Description")
            .basePrice(new BigDecimal("99.99"))
            .sku("TEST-001")
            .categoryId(1L)
            .stockQuantity(100)
            .build();
    }
    
    public static Product createProduct() {
        return Product.builder()
            .id(1L)
            .name("Test Product")
            .description("Test Description")
            .basePrice(new BigDecimal("99.99"))
            .sku("TEST-001")
            .stockQuantity(100)
            .isActive(true)
            .createdAt(Instant.now())
            .build();
    }
}
```

#### 🔗 **Mẫu: Integration Testing**

```
Viết integration tests cho Product API endpoints.

**Test Setup:**
- **Testcontainers:** PostgreSQL container cho database
- **MockWebServer:** Mock external services
- **TestRestTemplate:** API endpoint testing

**Integration Test Structure:**

**1. API Integration Tests:**
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class ProductControllerIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @Autowired private TestRestTemplate restTemplate;
    @Autowired private ProductRepository productRepository;
    @Autowired private CategoryRepository categoryRepository;
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Test
    @Sql("/test-data/categories.sql")
    @DisplayName("Should create product and return 201 status")
    void shouldCreateProductSuccessfully() {
        // Given
        ProductCreateRequest request = ProductTestData.createValidRequest();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(getValidJwtToken());
        HttpEntity<ProductCreateRequest> entity = new HttpEntity<>(request, headers);
        
        // When
        ResponseEntity<ProductResponse> response = restTemplate.postForEntity(
            "/api/v1/products", 
            entity, 
            ProductResponse.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getName()).isEqualTo(request.getName());
        
        // Verify database state
        Optional<Product> savedProduct = productRepository.findBySku(request.getSku());
        assertThat(savedProduct).isPresent();
    }
    
    @Test
    @DisplayName("Should return 400 when validation fails")
    void shouldReturnBadRequestForInvalidData() {
        // Given
        ProductCreateRequest invalidRequest = ProductCreateRequest.builder()
            .name("") // Invalid: empty name
            .basePrice(new BigDecimal("-10.00")) // Invalid: negative price
            .build();
            
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(getValidJwtToken());
        HttpEntity<ProductCreateRequest> entity = new HttpEntity<>(invalidRequest, headers);
        
        // When
        ResponseEntity<ErrorResponse> response = restTemplate.postForEntity(
            "/api/v1/products", 
            entity, 
            ErrorResponse.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().getErrors()).hasSize(2);
    }
}

**2. Database Integration Tests:**
@DataJpaTest
@Testcontainers
class ProductRepositoryIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");
    
    @Test
    @Transactional
    @DisplayName("Should handle concurrent product updates correctly")
    void shouldHandleConcurrentUpdates() throws InterruptedException {
        // Given
        Product product = ProductTestData.createProduct();
        entityManager.persistAndFlush(product);
        
        CountDownLatch latch = new CountDownLatch(2);
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failureCount = new AtomicInteger(0);
        
        // When - Simulate concurrent updates
        ExecutorService executor = Executors.newFixedThreadPool(2);
        
        executor.submit(() -> {
            try {
                productRepository.updateStock(product.getId(), 10);
                successCount.incrementAndGet();
            } catch (Exception e) {
                failureCount.incrementAndGet();
            } finally {
                latch.countDown();
            }
        });
        
        executor.submit(() -> {
            try {
                productRepository.updateStock(product.getId(), -5);
                successCount.incrementAndGet();
            } catch (Exception e) {
                failureCount.incrementAndGet();
            } finally {
                latch.countDown();
            }
        });
        
        latch.await(5, TimeUnit.SECONDS);
        
        // Then
        assertThat(successCount.get()).isEqualTo(2);
        assertThat(failureCount.get()).isEqualTo(0);
        
        Product updatedProduct = productRepository.findById(product.getId()).orElseThrow();
        assertThat(updatedProduct.getStockQuantity()).isEqualTo(105); // 100 + 10 - 5
    }
}
```

---

### 5️⃣ **Hiệu Suất & Giám Sát**

**🎯 Tình huống:** Optimize performance và implement monitoring.

#### ⚡ **Mẫu: Tối Ưu Hóa Hiệu Suất**

```
Optimize Spring Boot application performance cho high-traffic e-commerce system.

**Performance Goals:**
- **Response Time:** P95 < 200ms cho API calls
- **Throughput:** 1000+ requests/second
- **Memory Usage:** < 2GB heap size
- **Database:** < 50ms query response time

**Optimization Areas:**

**1. JVM Tuning:**
# Production JVM settings
-Xms2g -Xmx2g
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:+UseStringDeduplication
-XX:+OptimizeStringConcat
-Dspring.profiles.active=prod

**2. Database Optimization:**
@Configuration
public class DatabaseConfig {
    
    @Bean
    @Primary
    public DataSource primaryDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(env.getProperty("spring.datasource.url"));
        config.setUsername(env.getProperty("spring.datasource.username"));
        config.setPassword(env.getProperty("spring.datasource.password"));
        
        // Connection pool optimization
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        config.setLeakDetectionThreshold(60000);
        
        return new HikariDataSource(config);
    }
    
    @Bean
    @Qualifier("readOnly")
    public DataSource readOnlyDataSource() {
        // Configure read replica connection
        return createReadOnlyDataSource();
    }
}

**3. Caching Strategy:**
@Service
@CacheConfig(cacheNames = "products")
public class ProductService {
    
    @Cacheable(key = "#id", unless = "#result == null")
    public ProductResponse getProduct(Long id) {
        return productRepository.findById(id)
            .map(productMapper::toResponse)
            .orElseThrow(() -> new ProductNotFoundException(id));
    }
    
    @CacheEvict(key = "#result.id")
    public ProductResponse updateProduct(Long id, ProductUpdateRequest request) {
        // Update logic
    }
    
    @Cacheable(key = "'search:' + #searchCriteria.hashCode()", 
               condition = "#searchCriteria.cacheable")
    public Page<ProductResponse> searchProducts(ProductSearchCriteria searchCriteria) {
        // Search implementation
    }
}

@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        RedisCacheManager.Builder builder = RedisCacheManager
            .RedisCacheManagerBuilder
            .fromConnectionFactory(redisConnectionFactory())
            .cacheDefaults(cacheConfiguration());
            
        return builder.build();
    }
    
    private RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }
}

**4. Async Processing:**
@Service
public class OrderService {
    
    @Async("taskExecutor")
    public CompletableFuture<Void> processOrderAsync(Order order) {
        // Heavy processing logic
        inventoryService.reserveItems(order.getItems());
        paymentService.processPayment(order.getPayment());
        emailService.sendConfirmation(order.getCustomer());
        
        return CompletableFuture.completedFuture(null);
    }
}

@Configuration
@EnableAsync
public class AsyncConfig {
    
    @Bean(name = "taskExecutor")
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-task-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }
}
```

#### 📊 **Mẫu: Giám Sát & Observability**

```
Implement comprehensive monitoring cho Spring Boot application.

**Monitoring Stack:**
- **Metrics:** Micrometer + Prometheus
- **Logging:** Logback + ELK Stack
- **Tracing:** Spring Cloud Sleuth + Zipkin
- **Health Checks:** Spring Boot Actuator
- **Alerting:** Grafana + AlertManager

**Implementation:**

**1. Metrics Configuration:**
@Configuration
public class MetricsConfig {
    
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
    
    @Bean
    public CounterService counterService(MeterRegistry registry) {
        return new CounterService(registry);
    }
}

@RestController
@Timed(name = "product.api", description = "Product API operations")
public class ProductController {
    
    private final Counter productCreatedCounter;
    private final Timer productSearchTimer;
    
    public ProductController(MeterRegistry registry) {
        this.productCreatedCounter = Counter.builder("product.created")
            .description("Number of products created")
            .tag("api", "product")
            .register(registry);
            
        this.productSearchTimer = Timer.builder("product.search.duration")
            .description("Product search duration")
            .register(registry);
    }
    
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductCreateRequest request) {
        ProductResponse response = productService.createProduct(request);
        productCreatedCounter.increment();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(ProductSearchCriteria criteria) {
        return Timer.Sample.start(registry)
            .stop(productSearchTimer)
            .recordCallable(() -> {
                Page<ProductResponse> results = productService.searchProducts(criteria);
                return ResponseEntity.ok(results);
            });
    }
}

**2. Logging Có Cấu Trúc:**
@Component
public class AuditLogger {
    
    private final Logger logger = LoggerFactory.getLogger(AuditLogger.class);
    private final ObjectMapper objectMapper;
    
    public void logProductCreated(ProductResponse product, String userId) {
        AuditEvent event = AuditEvent.builder()
            .eventType("PRODUCT_CREATED")
            .userId(userId)
            .resourceId(product.getId().toString())
            .resourceType("PRODUCT")
            .timestamp(Instant.now())
            .details(Map.of("productName", product.getName(), "sku", product.getSku()))
            .build();
            
        logger.info("audit_event={}", toJson(event));
    }
    
    public void logApiCall(String endpoint, String method, int statusCode, long duration) {
        ApiCallEvent event = ApiCallEvent.builder()
            .endpoint(endpoint)
            .method(method)
            .statusCode(statusCode)
            .duration(duration)
            .timestamp(Instant.now())
            .build();
            
        logger.info("api_call={}", toJson(event));
    }
}

**3. Kiểm Tra Sức Khỏe:**
@Component
public class CustomHealthIndicator implements HealthIndicator {
    
    private final ProductRepository productRepository;
    private final RedisTemplate<String, String> redisTemplate;
    
    @Override
    public Health health() {
        try {
            // Check database connectivity
            long productCount = productRepository.count();
            
            // Check Redis connectivity
            redisTemplate.opsForValue().set("health:check", "ok", Duration.ofSeconds(30));
            
            // Check external service
            boolean externalServiceUp = checkExternalService();
            
            if (externalServiceUp) {
                return Health.up()
                    .withDetail("database", "UP")
                    .withDetail("redis", "UP")
                    .withDetail("external-service", "UP")
                    .withDetail("product-count", productCount)
                    .build();
            } else {
                return Health.down()
                    .withDetail("external-service", "DOWN")
                    .build();
            }
        } catch (Exception e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}

**4. Theo Dõi Phân Tán:**
# application.yml
spring:
  sleuth:
    zipkin:
      base-url: http://zipkin:9411
    sampler:
      probability: 0.1  # Sample 10% of requests
  application:
    name: product-service

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always
  metrics:
    export:
      prometheus:
        enabled: true
```
---

## 🎯 Best Practices & Tips

### 💡 **Tip Prompt Engineering**

#### ✅ **Prompting Hiệu Quả cho Backend:**
```markdown
✅ "Implement ProductService trong Spring Boot với JPA, validation, 
   exception handling, và unit tests. Include DTO mapping với MapStruct."

❌ "Tạo service cho product"
```

#### 🏗️ **Context IS KING:**
```markdown
**Luôn chỉ định:**
- Framework version (Spring Boot 3.2, .NET 8)
- Database type (PostgreSQL, MySQL, MongoDB)
- Architecture pattern (Layered, Clean, Hexagonal)
- Testing framework (JUnit 5, xUnit, Mocha)
- Additional tools (Docker, Redis, Elasticsearch)
```

#### 🔄 **Phát Triển Lặp Lại:**
```markdown
1. **Bắt đầu với cấu trúc:** "Tạo basic CRUD operations"
2. **Thêm business logic:** "Implement validation rules"
3. **Thêm bảo mật:** "Add JWT authentication"
4. **Thêm giám sát:** "Add metrics và logging"
5. **Tối ưu hóa:** "Add caching và performance tuning"
```

### 🚀 **Kỹ Thuật Nâng Cao**

#### 📚 **Tham Khảo Mã Hiện Có:**
```markdown
"Implement OrderService tương tự như ProductService trong @/services/ProductService.java
 nhưng với additional business rules cho order processing"
```

#### 🔗 **Chuỗi Workflows Phức Tạp:**
```markdown
Prompt 1: "Design database schema"
Prompt 2: "Generate JPA entities"
Prompt 3: "Create repository layer"
Prompt 4: "Implement service layer"
Prompt 5: "Add REST controllers"
Prompt 6: "Write comprehensive tests"
```

:::tip 💡 Pro Tips
- **Cụ thể về ràng buộc:** Kích thước database, yêu cầu hiệu suất, nhu cầu bảo mật
- **Bao gồm kịch bản lỗi:** Cách xử lý failures, timeouts, data inconsistencies
- **Chỉ định yêu cầu testing:** Unit tests, integration tests, performance tests
- **Xem xét scalability:** Horizontal scaling, caching strategies, async processing
:::

:::warning ⚠️ Lưu Ý Bảo Mật
- **Không bao giờ expose dữ liệu nhạy cảm:** Database credentials, API keys, thông tin cá nhân
- **Validate tất cả inputs:** SQL injection, XSS, data validation
- **Implement authentication đúng cách:** JWT tokens, role-based access control
- **Sử dụng parameterized queries:** Ngăn chặn SQL injection attacks
:::
