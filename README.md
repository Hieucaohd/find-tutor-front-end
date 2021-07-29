## MỤC LỤC

- [Tổng quan về trang web](#tổng-quan-về-trang-web)
  - [Mục đích để tạo ra trang web](#mục-đích-để-tạo-ra-trang-web)
  - [Cơ chế hoạt động của trang web](#cơ-chế-hoạt-động-của-trang-web)
  - [Công nghệ](#công-nghệ)
- [Bố cục của Code](#bố-cục-của-code)
  - [auth](#auth)
  - [header](#header)
  - [home](#home)
  - [parent_room](#parent_room)
  - [parent](#parent)
  - [tutor](#tutor)
- [API document](#API-document)
  - [login và register](#login-và-register)

## Tổng quan về trang web

### Mục đích để tạo ra trang web

- để kết nối phụ huynh và gia sư, đồng thời xác thực danh tính của phụ huynh và gia sư giúp tăng độ tin cậy của 2 bên.
- giúp phụ huynh tìm được người dạy phù hợp.
- giúp phụ huynh quản lí chất lượng của các buổi dạy.
- giúp gia sư tìm được lớp học một cách dễ dàng và quản lí lớp học.
- giúp gia sư bảo vệ quyền lợi của mình về lương.
- không mất phí.

### Cơ chế hoạt động của trang web

Bước 1: phụ huynh tạo lớp học trên trang web.
Bước 2: các gia sư sau khi nhìn thấy lớp học sẽ tham giư ứng tuyển (thêm vào waitingList của lớp học).
Bước 3: phụ huynh sau khi tìm hiểu về thông tin của gia sư trong danh sách ứng tuyển sẽ mời một số gia sư mà mình thấy thích hợp (thêm vào invitedList của lớp học).
Bước 4: gia sư sẽ thấy thông báo được mời của phụ huynh và có 2 lựa chọn: đồng ý hoặc không đồng ý.
Bước 5: nếu gia sư đồng ý thì sẽ được thêm vào danh sách dạy thử của lớp học đó và sẽ đến lớp học để dạy thử (thêm vào tryTeachingList của lớp học)
Bước 6: sau một khoảng thời gian dạy thử, phụ huynh và gia sư sẽ quyết định có tiếp tục dạy nữa hay không.
Bước 7: nếu 2 bên thống nhất tiếp tục dạy thì sẽ kí hợp đồng điện tử trên trang web và trang web sẽ giúp gia sư và phụ huynh quản lí BUỔI DẠY và HỌC PHÍ của lớp học (thêm vào teachingList của lớp học)

### Công nghệ

- Back-end: dùng django (framework được viết hoàn toàn bằng python):
  - Ưu điểm: giúp viết code nhanh, dễ dùng, có nhiều thư viện được viết sẵn, có thể áp dụng các công nghệ về bigdata, machine learning, AI, ...
  - Nhược điểm: tốc độ chậm (tốc độ của Python), đi sâu cần tốn thời gian nghiên cứu (khó dùng nếu muốn can thiệp sâu), thường chỉ dùng cho các dự án lớn, ...
- Front-end: dùng reactjs, redux, css (chưa áp dụng):
  - Ưu điểm: code dễ tái sử dụng, logic rõ ràng, thời gian phát triển nhanh, có nhiều thư viện hỗ trợ, có thể dễ dàng để chuyển đổi sang app mobie (react-native), ...
  - Nhược điểm: bố cục không được thống nhất, ...
- Giao tiếp giữa back-end và front-end: thông qua rest API.

## Bố cục của Code

(front-end):

- Chia ra làm 6 feature chính:
  - auth: dùng để lưu thông tin đăng nhập, các thông tin về user
  - header: dùng để chuyển hướng qua lại giữa các trang.
    Các trang gồm:
  - home: hiển thị danh sách các lớp học, nơi phụ huynh tạo lớp học, ...
  - parent_room: hiển thị chi tiết thông tin của từng lớp học.
  - parent: nếu user là phụ huynh thì đây là trang các nhân giúp phụ huynh quản lí các lớp học đã tạo, ...
  - tutor: nếu user là gia sư thì đây là trang cá nhân giúp gia sư quản lí các lớp học đã ứng tuyển, các lớp mà gia sư được mời dạy, ...

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

- Có 1 thanh nav bar trong file MainNavigation.js

### home

- Có 1 slice:
  - homeSlice.js:
    - Nạp danh sách lớp học từ server, thêm lớp học, xóa lớp học, ...

- Có 3 component:
  - Home.js:
    - Hiển thị danh sách lớp học.

  - component/Room.js:
    - Hiện thị thông tin chi tiết của lớp học.

  - CreateRoom.js:
    - Hiện thị form để tạo lớp học.

### parent_room:

- Có 5 slice:
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

- Có 5 component:
  - ParentRoom.js:
    - Hiện thị danh sách waitingList, invitedList, tryTeachingList, teachingList cho lớp học.

  - WaitingList.js:
    - Hiện thị danh sách waitingList.

  - InvitedList.js:
    - Hiện thị danh sách invitedList.

  - TryTeaching.js:
    - Hiện thị danh sách tryTeachingList.
    
  - Teaching.js:
    - Hiện thị danh sách teachingList.

## API ducument

### login và register


args = {
  username
  pasword
}
"http://localhost:8000/findTutor/getToken/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }
=> Mục đích: để đăng nhập và lấy mã token, id, type_tutor, type_parent

args = {
  username
  pasword
}
"http://localhost:8000/findTutor/userList/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }
=> Mục đích: để đăng kí, tạo mã token của user trong database.

"http://localhost:8000/findTutor/informationAboutRoomOfTutorList/",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: để lấy danh sách các waitingList, invitedList, tryTeachingList, teachingList của gia sư.

### home:

"http://localhost:8000/findTutor/roomList/", 
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: để lấy danh sách tất cả các lớp học.

"http://localhost:8000/findTutor/roomList/", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(roomInfor),
  }
=> Mục đích: để tạo lớp học.

`http://localhost:8000/findTutor/roomDetail/${roomId}`, 
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: để xóa lớp học.

### parent_room

* waitingListForRoom

`http://localhost:8000/findTutor/waitingTutorList/?pk_room=${roomId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: dùng để lấy danh sách gia sư ứng tuyển vào lớp học.

`http://localhost:8000/findTutor/waitingTutorList/?pk_room=${roomId}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: dùng để cho gia sư ứng tuyển vào lớp học.

`http://localhost:8000/findTutor/waitingTutorDetail/${waitingId}`,
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: dùng để xóa gia sư khỏi danh sách ứng tuyển.

* invitedListForRoom

`http://localhost:8000/findTutor/listInvitedList/?pk_room=${roomId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: dùng để lấy danh sách các gia sư đã được mời để dạy thử.

`http://localhost:8000/findTutor/waitingTutorDetail/${waitingId}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: dùng để gia sư chấp nhận dạy thử.

`http://localhost:8000/findTutor/listInvitedDetail/${invitedId}`,
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
=> Mục đích: dùng để xóa gia sư khỏi danh sách mời dạy thử.
