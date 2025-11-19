# Tính năng Giỏ hàng (Shopping Cart)

## Tổng quan
Hệ thống giỏ hàng hoàn chỉnh với giao diện đẹp mắt, cho phép người dùng thêm sản phẩm, xem chi tiết, và quản lý đơn hàng.

## Các tính năng chính

### 1. **CartContext** - Quản lý trạng thái giỏ hàng
- Lưu trữ giỏ hàng trong localStorage
- Thêm/xóa/cập nhật số lượng sản phẩm
- Tính tổng giá trị và số lượng items
- Xóa toàn bộ giỏ hàng

### 2. **Cart Page** - Trang giỏ hàng
**Đường dẫn:** `/cart`

**Tính năng:**
- ✅ Hiển thị danh sách sản phẩm trong giỏ hàng
- ✅ Xem hình ảnh, tên, giá, rating của sản phẩm
- ✅ Điều chỉnh số lượng (+/-)
- ✅ Xóa sản phẩm khỏi giỏ hàng
- ✅ Xem chi tiết sản phẩm (click vào icon Eye)
- ✅ Áp dụng mã giảm giá (coupon)
- ✅ Tính toán tự động: Subtotal, Shipping, Discount, Total
- ✅ Nút "Proceed to Checkout"
- ✅ Responsive design

**Mã giảm giá có sẵn:**
- `GGZONE10` - Giảm 10%
- `WELCOME20` - Giảm 20%

### 3. **Header Cart Dropdown**
- Icon giỏ hàng với badge hiển thị số lượng items
- Dropdown xem nhanh giỏ hàng
- Hiển thị preview sản phẩm
- Nút "View Cart" để đi đến trang giỏ hàng đầy đủ

### 4. **Tích hợp với Marketplace**
- Nút "Add to Cart" trên mỗi sản phẩm
- Nút "Buy Now" (thêm vào giỏ và chuyển đến checkout)
- Tích hợp với ProductDetail page

## Cấu trúc file

```
ggzone-fe/src/
├── context/
│   └── CartContext.tsx          # Context quản lý giỏ hàng
├── pages/
│   ├── Cart.tsx                 # Trang giỏ hàng chính
│   ├── Marketplace.tsx          # Đã tích hợp addToCart
│   └── ProductDetail.tsx        # Đã tích hợp addToCart
├── components/
│   └── layout/
│       └── Header.tsx           # Đã tích hợp cart dropdown
└── routes/
    └── index.tsx                # Đã thêm route /cart
```

## Cách sử dụng

### 1. Thêm sản phẩm vào giỏ hàng
```typescript
import { useCart } from "../context/CartContext";

const { addToCart } = useCart();

// Thêm 1 sản phẩm
addToCart(product, 1);

// Thêm nhiều sản phẩm
addToCart(product, 5);
```

### 2. Xem giỏ hàng
```typescript
const { cartItems, getTotalPrice, getTotalItems } = useCart();

console.log(cartItems);           // Danh sách items
console.log(getTotalPrice());     // Tổng giá
console.log(getTotalItems());     // Tổng số lượng
```

### 3. Cập nhật số lượng
```typescript
const { updateQuantity } = useCart();

updateQuantity(productId, newQuantity);
```

### 4. Xóa sản phẩm
```typescript
const { removeFromCart } = useCart();

removeFromCart(productId);
```

### 5. Xóa toàn bộ giỏ hàng
```typescript
const { clearCart } = useCart();

clearCart();
```

## Giao diện

### Trang giỏ hàng trống
- Icon giỏ hàng lớn
- Thông báo "Your Cart is Empty"
- Nút "Continue Shopping"

### Trang giỏ hàng có sản phẩm
- **Bên trái:** Danh sách sản phẩm
  - Hình ảnh sản phẩm (hover để xem chi tiết)
  - Tên, category, platform
  - Rating và reviews
  - Mô tả ngắn
  - Điều chỉnh số lượng
  - Giá và tổng giá
  - Nút xóa

- **Bên phải:** Order Summary
  - Nhập mã giảm giá
  - Subtotal
  - Shipping fee
  - Discount (nếu có)
  - Total
  - Nút "Proceed to Checkout"
  - Thông tin bảo mật

## Styling
- Sử dụng Tailwind CSS
- Màu chủ đạo: Orange (#EA580C)
- Responsive: Mobile, Tablet, Desktop
- Hover effects và transitions
- Shadow và border radius

## Tính năng nâng cao (có thể mở rộng)
- [ ] Lưu giỏ hàng theo user (backend)
- [ ] Wishlist / Favorites
- [ ] Checkout flow hoàn chỉnh
- [ ] Payment integration
- [ ] Order history
- [ ] Email notifications
- [ ] Inventory management
- [ ] Product recommendations

## Testing
Để test tính năng:
1. Đăng nhập vào hệ thống
2. Vào Marketplace (`/marketplace`)
3. Click "Add to Cart" trên bất kỳ sản phẩm nào
4. Click icon giỏ hàng ở header để xem dropdown
5. Click "View Cart" để xem trang giỏ hàng đầy đủ
6. Thử các tính năng: thay đổi số lượng, xóa, áp dụng coupon
7. Click icon Eye để xem chi tiết sản phẩm

## Notes
- Giỏ hàng được lưu trong localStorage, không mất khi refresh
- Tự động tính toán lại khi có thay đổi
- Shipping fee cố định: $30,000
- Free shipping khi đơn hàng > $50
