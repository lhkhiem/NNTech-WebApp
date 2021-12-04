import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const equalPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const name = control.get('password');
  const alterEgo = control.get('confirmPassword');
  /* Trên trang chủ angular.io nói rằng:
  Nếu các giá trị không khớp, danh tính của anh hùng vẫn được giữ bí mật, 
  cả hai đều hợp lệ và trình xác thực trả về null. Nếu chúng khớp nhau, 
  danh tính của anh hùng sẽ được tiết lộ và trình xác thực phải đánh dấu 
  biểu mẫu là không hợp lệ bằng cách trả về một đối tượng lỗi.
  Biểu mẫu trên trang chủ hướng dẫn:
  return name && alterEgo && name.value === alterEgo.value ? { identityRevealed: true } : null;
  Điều này có nghĩa là khi biểu mẫu giống nhau thì là lỗi, khác nhau mới là true.
  Nhưng ta cần đều ngược lại để áp dụng cho confirmPassword ta sửa lại biểu mẫu như sau:
  return name && alterEgo && name.value !== alterEgo.value ? { identityRevealed: true } : null;
  */
  return name && alterEgo && name.value !== alterEgo.value ? { identityRevealed: true } : null;
};