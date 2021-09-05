# NNTech
## 1.Chú ý cách thêm các file css và js và angular.json phải đúng ở phần biuld(hay thêm nhằm chổ phần test là không hoạt động).
## 2.Một số file js được load sau jquery chỉ hoạt động khi jquery đc load trước ở angular.json, nên ta phải đặt file js vào thư mục src/assets và 3.gọi nó trong component dùng phương thức ngAfterViewInit.
## 4.Để bảo vệ route ta dùng guard và phương thức canActivate để check trong tất cả các route (kể cả route con).
## Trong AppModule ta cần đặt LoginModule lên trên hết các module khác để guard hoạt động hiệu quả.