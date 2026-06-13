# GGZone Backend Project Rules

Tài liệu này tổng hợp các quy ước hiện tại của project ggzone-be và các rule cần tuân thủ khi thêm/chỉnh sửa code.

## 1. Mục tiêu

- Giữ codebase nhất quán, dễ đọc, dễ maintain.
- Hạn chế bug do khác biệt style giữa các thành viên.
- Chuẩn hóa cách tổ chức file, naming, API contract và luồng xử lý dữ liệu.

## 2. Công nghệ và kiến trúc

- Framework: ASP.NET Core Web API (.NET 8).
- ORM: Entity Framework Core (SQL Server).
- Auth: JWT Bearer.
- Kiến trúc chính: Controller -> Service -> Repository -> DbContext/Database.
- Root namespace: `ggzone_be`.

## 3. Cấu trúc thư mục

Quy ước sử dụng các thư mục hiện có:

- `Controllers/`: Nhận request, validate input cơ bản, trả response.
- `Services/`: Chứa business logic.
- `Repositorys/`: Data access qua EF Core.
- `Interfaces/`: Hợp đồng cho Service/Repository.
- `Data/`: `AppDbContext`, cấu hình quan hệ và `DbSet`.
- `Models/`: Entity mapping DB.
- `Dtos/`: DTO cho request/response, chia theo feature (`Auth`, `User`, `Post`, ...).
- `Helpers/`: Helper dùng chung (response, pagination, validation, ...).
- `Extensions/`: Extension methods (queryable, claims principal, ...).
- `Mappers/`: Mapping model -> DTO/object trả về API.
- `Middleware/`: Middleware xử lý lỗi, logging request, ...
- `Constants/`: Hằng số toàn hệ thống.

Luu y:

- Tên thư mục `Repositorys` đang được dùng trong toàn project. Khong doi ten neu khong co ke hoach refactor dong bo.

## 4. Quy tắc bố trí file

Khi thêm tính năng mới, đi theo checklist sau:

1. Thêm/ cập nhật entity ở `Models/` (nếu có thay đổi dữ liệu).
2. Thêm `DbSet` và quan hệ trong `Data/AppDbContext.cs`.
3. Tạo DTO trong `Dtos/<Feature>/`.
4. Tạo interface trong `Interfaces/`.
5. Tạo implementation ở `Services/` hoặc `Repositorys/`.
6. Tạo/ cập nhật controller trong `Controllers/`.
7. Đăng ký dependency trong `Program.cs` (`AddScoped`).
8. Cập nhật tài liệu API nếu endpoint mới ảnh hưởng frontend.

## 5. Naming conventions

### 5.1 Class, interface, method, property

- Class: PascalCase. Vi du: `UserService`, `PostRepository`.
- Interface: prefix `I` + PascalCase. Vi du: `IUserService`, `IPostRepository`.
- Method: PascalCase.
- Async method: bat buoc suffix `Async`. Vi du: `GetByIdAsync`, `UpdateProfileAsync`.
- Property: PascalCase. Vi du: `CreatedAt`, `AvatarUrl`.

### 5.2 Field, variable, parameter

- Private readonly field: `_camelCase`. Vi du: `_context`, `_userService`.
- Local variable + parameter: camelCase. Vi du: `userId`, `pageSize`, `searchTerm`.
- Bien bool nen dung tien to ro nghia: `is`, `has`, `can`, `should`.

### 5.3 File naming

- Moi class/interface de trong file trung ten.
- Controller: `<Feature>Controller.cs`.
- Service: `<Feature>Service.cs`.
- Repository: `<Feature>Repository.cs`.
- DTO: `<Action><Feature>Dto.cs` hoac `<Feature>ResponseDto.cs`.

## 6. Quy ước API và controller

- Controller phai co `[ApiController]`.
- Route goc uu tien dang `api/[controller]` hoac route tuong minh khi can (`api/auth`, `api/posts`, ...).
- Segment route dung chu thuong, uu tien kebab-case cho tu ghep. Vi du: `recent-activities`, `unread-count`.
- Endpoint can xac thuc phai gan `[Authorize]`.
- Input can ro nguon:
- Query: `[FromQuery]`
- Body: `[FromBody]`
- Route param: trong template route (`{id}`, `{userId}`)
- Tra ve dung status code HTTP:
- `200 OK` cho thanh cong.
- `201 Created` neu tao moi va can location (khuyen nghi).
- `400 BadRequest` cho validate/input sai.
- `401 Unauthorized` khi chua auth.
- `404 NotFound` khi khong tim thay.

## 7. Quy ước response

- Uu tien dung wrapper `ApiResponse` / `ApiResponse<T>` trong `Helpers/ResponseHelper.cs`.
- Format phan hoi nen on dinh:
- `success`
- `message`
- `data`
- `errors`
- Neu can dung anonymous object cho endpoint nho, giu payload ngan gon va thong nhat cach dat ten.

## 8. Quy ước DTO, Model, Mapping

- DTO chi chua du lieu can trao doi qua API, khong chua business logic.
- DTO input can dung DataAnnotations (`[Required]`, `[MaxLength]`, `[RegularExpression]`, ...).
- Model la entity phan anh cau truc DB va navigation properties.
- Mapping model -> response tach rieng (Mapper hoac projection trong query) de controller gon.
- Khong tra truc tiep entity day du khi API chi can 1 phan du lieu.

## 9. Quy ước EF Core và truy vấn

- Moi entity moi phai duoc khai bao `DbSet` trong `AppDbContext`.
- Quan he khoa ngoai va on delete behavior dat trong `OnModelCreating`.
- Truy van read-only uu tien projection (`Select`) de giam payload.
- Khi can navigation data, dung `Include/ThenInclude` co chu dich.
- Co phan trang cho danh sach lon:
- Dung `page`, `pageSize`.
- Validate gia tri dau vao (`page >= 1`, `pageSize` hop le).

## 10. Thời gian và timezone

- Uu tien `DateTime.UtcNow` cho timestamp lien quan den token, log, so sanh theo thoi gian he thong.
- Chi dung `DateTime.Now` neu thuc su can local time.
- Neu thay doi quy uoc thoi gian, phai dong bo giua service, model va database.

## 11. Logging và xử lý lỗi

- Dung `ILogger<T>` cho logging.
- Khong nuot exception im lang. Neu catch exception thi can:
- Log du thong tin can thiet.
- Tra response phu hop cho client.
- Uu tien middleware xu ly loi cho truong hop chung; controller/service chi catch khi can custom message/behavior.

## 12. Dependency Injection

- Dang ky service/repository qua DI trong `Program.cs` voi lifetime `Scoped` (mac dinh cho DB-bound services).
- Khong tao truc tiep dependency bang `new` trong controller/service (tru model DTO/object don gian).

## 13. Comment và ngôn ngữ

- Comment ngan, giai thich "tai sao" thay vi "code dang lam gi".
- Han che comment du thua hoac comment loi thoi.
- Uu tien thong diep loi/API message nhat quan ngon ngu (hien tai co ca tieng Viet va tieng Anh). Team nen chon 1 chuan cho feature moi.

## 14. Checklist trước khi merge

1. Dung dung folder/layer cho file moi.
2. Ten class/method/variable theo convention.
3. Async method co suffix `Async`.
4. Route va status code hop ly.
5. Co validate input (DTO/DataAnnotations + ModelState neu can).
6. Co log cho cac nhanh xu ly quan trong/that bai.
7. Khong expose du lieu nhay cam trong response.
8. Kiem tra anh huong toi frontend contract.

---

Neu can, co the tao them file `CONTRIBUTING.md` de mo ta quy trinh branch/commit/review theo nhom, con file nay tap trung vao coding conventions va cau truc source code.
