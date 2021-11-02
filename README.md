#### 🔥 WEB TÌM KIẾM GIA SƯ 🔥

## Mục đích để tạo ra trang web

- để kết nối phụ huynh và gia sư, đồng thời xác thực danh tính của phụ huynh và gia sư giúp tăng độ tin cậy của 2 bên.
- giúp phụ huynh tìm được người dạy phù hợp.
- giúp phụ huynh quản lí chất lượng của các buổi dạy.
- giúp gia sư tìm được lớp học một cách dễ dàng và quản lí lớp học.
- giúp gia sư bảo vệ quyền lợi của mình về lương.
- không mất phí.

## Cơ chế hoạt động của trang web
  - Phụ huynh tạo phòng học
  - Gia sư ứng tuyển vào phòng
  - Phụ huynh xem thông tin của gia sư nếu đủ tiêu chí thì đồng ý cho gia sư dạy, phòng học sẽ không còn hiện ở trang chủ
  - Nếu phụ huynh hoặc gia sư không còn muốn dạy thì xóa khỏi phòng khi đó phòng học sẽ hiển thị lại ở trang chủ để gia sư khác ứng tuyển

## Công nghệ

- Back-end: dùng django (framework được viết hoàn toàn bằng python):
  - Ưu điểm: giúp viết code nhanh, dễ dùng, có nhiều thư viện được viết sẵn, có thể áp dụng các công nghệ về bigdata, machine learning, AI, ...
  - Nhược điểm: tốc độ chậm (tốc độ của Python), đi sâu cần tốn thời gian nghiên cứu (khó dùng nếu muốn can thiệp sâu), thường chỉ dùng cho các dự án lớn, ...
- Front-end: ReactJs
- State Management: Redux
- Style: SCSS,TailwindCSS, Material UI 
- Giao tiếp giữa back-end và front-end: thông qua restful API, GraphQl.

## Bố cục của Code
  # Tổ chức thư mục
    src
      ├─ styles: chứa styles chung
      ├─ components: chứa components dùng chung giữa các features
        └─ Loading
        └─ location: components về địa điểm
        └─ Modal
        └─ Room: hiển thị phòng học
        └─ Skeleton: hiển thị skeleton khi page đang load dữ liệu
        └─ SlideShow: slide hình ảnh ở homepage
        └─ UploadImage
      ├─ containers: chứa một số file js chung 
        └─ date.js: xử lí ngày giờ
        └─ picture.js: chứa địa chỉ của ảnh
      └─ assets: các hình ảnh, âm thanh của app
      └─ graphql: xử lí query của GraphQl
      └─ namespace.js: chứa các endpoint
      └─ store.js: store của redux
      ├─ features: các tính năng chính của app
        └─ auth: tính năng đăng nhập, đăng xuất
        └─ SignUp: đăng kí tài khoản
        └─ RegisterRole: đăng kí vai trò tài khoản là gia sư hay phụ huynh
        └─ Home: phần trang chủ của app, hiển thị list các phòng học,...
        └─ Profile: thông tin cá nhân của gia sư và phụ huynh
        └─ Tutor: phòng cá nhân của gia sư, chứa các phòng mà gia sư đang ứng tuyển và phòng gia sư đang dạy học
        └─ Parent: phòng cá nhân của phụ huynh, chứa các phòng mà phụ huynh đã tạo
        └─ Notification: phần thông báo
        └─ Header: navigation, banner quảng cáo
        └─ ParentRoom: phòng học
        └─ Settings: cài đặt tài khoản, đổi mật khẩu, thông tin
        └─ 404NotFound
        └─ Message: tính năng nhắn tin
        └─ CreateRoom: tạo phòng học

# đọc biểu đồ graphQL:

## link diagram: https://drive.google.com/file/d/1X963zE-qAiYTSULvq8bAS9IiedaGeXnF/view?usp=sharing

## Sự liên quan giữa các bảng:
- các bảng được liên kết với nhau bằng các đường thẳng có mũi tên:
  - mũi tên một chiều: quan hệ one-to-many. Vd: một parent sẽ có nhiều paren-room
  - mũi tên 2 chiều: quan hệ one-to-one. Vd: mỗi user chỉ có một parent
- link test: 
  - Graphiql: https://findtutorapp.website/graphql/ (nhấn ctrl+space để xem các gợi ý)
  - Hoặc postman.

# document:

## link google doc: https://docs.google.com/document/d/1teGtkQkd7LnRMjg1-a-D2sICdsuvy2n5BWPyU0K5JvU/edit?usp=sharing

# Rest API:
- link API: https://findtutorapp.website/
- Hoac postman
