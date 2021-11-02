### 🔥 App tìm kiếm gia sư 🔥

- [Tổng quan về trang web] (#tổng-quan-về-trang-web)
  - [Mục đích để tạo ra trang web] (#mục-đích-để-tạo-ra-trang-web)
  - [Cơ chế hoạt động của trang web] (#cơ-chế-hoạt-động-của-trang-web)
  - [Công nghệ] (#công-nghệ)
- [Bố cục của Code] (#bố-cục-của-code)
  - [auth] (#auth)
  - [header] (#header)
  - [home] (#home)
  - [CreateRoom] (#CreateRoom)
  - [parent_room] (#parent_room)
  - [parent] (#parent)
  - [tutor] (#tutor)
  - [profile] (#profile)
  - [register] (#register)

## Tổng quan về trang web

### Mục đích để tạo ra trang web

- để kết nối phụ huynh và gia sư, đồng thời xác thực danh tính của phụ huynh và gia sư giúp tăng độ tin cậy của 2 bên.
- giúp phụ huynh tìm được người dạy phù hợp.
- giúp phụ huynh quản lí chất lượng của các buổi dạy.
- giúp gia sư tìm được lớp học một cách dễ dàng và quản lí lớp học.
- giúp gia sư bảo vệ quyền lợi của mình về lương.
- không mất phí.

### Cơ chế hoạt động của trang web

* Bước 1: phụ huynh tạo lớp học trên trang web.
* Bước 2: các gia sư sau khi nhìn thấy lớp học sẽ tham giư ứng tuyển (thêm vào waitingList của lớp học).
* Bước 3: phụ huynh sau khi tìm hiểu về thông tin của gia sư trong danh sách ứng tuyển sẽ mời một số gia sư mà mình thấy thích hợp (thêm vào invitedList của lớp học).
* Bước 4: gia sư sẽ thấy thông báo được mời của phụ huynh và có 2 lựa chọn: đồng ý hoặc không đồng ý.
* Bước 5: nếu gia sư đồng ý thì sẽ được thêm vào danh sách dạy thử của lớp học đó và sẽ đến lớp học để dạy thử (thêm vào tryTeachingList của lớp học)
* Bước 6: sau một khoảng thời gian dạy thử, phụ huynh và gia sư sẽ quyết định có tiếp tục dạy nữa hay không.
* Bước 7: nếu 2 bên thống nhất tiếp tục dạy thì sẽ kí hợp đồng điện tử trên trang web và trang web sẽ giúp gia sư và phụ huynh quản lí BUỔI DẠY và HỌC PHÍ của lớp học (thêm vào teachingList của lớp học)

### Công nghệ

- Back-end: dùng django (framework được viết hoàn toàn bằng python):
  - Ưu điểm: giúp viết code nhanh, dễ dùng, có nhiều thư viện được viết sẵn, có thể áp dụng các công nghệ về bigdata, machine learning, AI, ...
  - Nhược điểm: tốc độ chậm (tốc độ của Python), đi sâu cần tốn thời gian nghiên cứu (khó dùng nếu muốn can thiệp sâu), thường chỉ dùng cho các dự án lớn, ...
- Front-end: dùng reactjs, redux, redux toolkit, scss, Matterial Ui,  React Icon, React Hook Form... :
  - Ưu điểm: code dễ tái sử dụng, logic rõ ràng, thời gian phát triển nhanh, có nhiều thư viện hỗ trợ, có thể dễ dàng để chuyển đổi sang app mobie (react-native), ...
  - Nhược điểm: bố cục không được thống nhất, ...
- Giao tiếp giữa back-end và front-end: thông qua rest API.

## Bố cục của Code

(front-end):

- Chia ra làm 8 feature chính:
  - auth: dùng để lưu thông tin đăng nhập, các thông tin về user
  - header: dùng để chuyển hướng qua lại giữa các trang.
    Các trang gồm:
  - home: hiển thị danh sách các lớp học, nơi phụ huynh tạo lớp học, ...
  - parent_room: hiển thị chi tiết thông tin của từng lớp học.
  - parent: nếu user là phụ huynh thì đây là trang các nhân giúp phụ huynh quản lí các lớp học đã tạo, ...
  - tutor: nếu user là gia sư thì đây là trang cá nhân giúp gia sư quản lí các lớp học đã ứng tuyển, các lớp mà gia sư được mời dạy, ...
  - create room: tạo phòng dành cho phụ huynh
  - register: đăng kí tài khoản, đăng kí làm gia sư phụ huynh
**note: thư mục components trong feature là thư mục chứa các components dùng chung giữa các feature
### auth

- Có 2 slice:
  - authSlice.js:
    - Lưu thông tin đăng nhập của user bao gồm:
      - id của user trong database.
      - token: mã được gửi về sau khi user đăng nhập và mình sẽ dùng mã này để giúp back-end xác thực user.
      - type_tutor: true nếu user là gia sư.
      - type_parent: true nếu user là phụ huynh.
  - roomRelateTutorSlice.js:
    - Lưu danh sách các lớp học mà gia sư đã ứng tuyển, lớp học mà gia sư được phụ huynh mời, danh sách các lớp học mà gia sư đang dạy, danh sách các lớp học mà gia sư dang dạy chính thức.
- Có 1 component Login.js: để đăng nhập
- Có 1 component Register.js: để đăng kí

### header
  - MainNavigation.js: hiển thị thanh navbar 
  - components: 
    - ToggleMenu.jsx: hiển thị phần toggle menu của navbar, khi bấm vào avatar hiện phần điều hướng tới profile và đăng xuất
### home
  - getRoom.js: lấy các phòng học hiện có, lấy phòng học được lọc theo yêu cầu
  - homeSlice.js: (phần cũ chưa xử lí)
  - Home.js hiển thị home
  - components
    - Room.js: hiển thị 1 phòng
    - FilterBar
      - Hiển thị thanh lọc phòng
### parent_room:
  - waitingListForRoomSlice.js:
    - Nạp waitingList của lớp học từ server, thêm vào waitingList, xóa khỏi waitingList.

  - invitedListForRoomSlice.js:
    - Nạp invitedList của lớp học từ server, thêm vào invitedList, xóa khỏa invitedList.

  - tryTeachingForRoomSlice.js:
    - Nạp tryTeachingList của lớp học từ server, thêm vào tryTeachingList, xóa khỏa tryTeachingList.

  - teachingForRoomSlice.js:
    - Nạp teachingList của lớp học từ server.

  - parentRoomSlice.js:
    - Tổng hợp các danh sách waitingList, invitedList, tryTeachingList, teachingList.
  - components
    - components
      - invitedList.jsx : hiển thị invited list
      - teachingList.jsx : hiern thị teaching list
      - waitingList.jsx: hiển thị waiting list
      - tryTeachingList.jsx: hiển thị try teaching list
      - tutorItem.jsx
    - ParentRoomMain.jsx: hiển thị phần chính của phòng bao gồm các list với thông tin phòng

### profile :
 - profile.js : các hàm lấy thông tin của user qua tutor id và parent id
 - ParentProfile: Hiển thị thông tin của parent
 - TutorProfile: hiển thị thông tin của tutor

### register: 
  - registerAccount.js: các hàm đăng kí user, đăng kí làm gia sư, đăng kí làm phụ huynh
  - Register.jsx: hiển thị form đăng kí tài khoản
  - components
    - RegisterRole: hiển thị chọn vai trò giữa phụ huynh và gia sư
    - RegisterParent: hiển thị form đăng kí làm phụ huynh
    - RegisterTutor: hiển thị form đăng kí làm gia sư

### CreateRoom:
  - createRoom.jsx: hiển thị form tạo phòng

### parent:
  - parent.js: chứa hàm xóa phòng học
  - ParentInfor.js: hiển thị các phòng học của parent đã tạo

### tutor:
  - Các Slice:
    - tutorInforSlice.js: slice tổng các list slice
    - waitingListForTutorInforSlice.js: lấy dữ liệu waiting list, thêm vào waiting list, xóa khỏi waiting list
    - invitedListForTutorInforSlice.js: lấy dữ liệu invited list, thêm vào invited list, xóa khỏi invited list
    - tryTeachingForTutorInforSlice.js: lấy dữ liệu try teaching list, thêm vào try teaching list,
    xóa khỏi try teaching list
    - teachingForTutorInforSlice.js: lấy dữ liệu teaching list
  - tutorInfor.js: hiển thị các phòng đã thêm của gia sư
  - components: 
    - 4 file jsx hiển thị các list của gia sư
  
  
