import {ToastOptions} from 'ng2-toastr';

export class CustomToastOption extends ToastOptions {
  animate = 'fade';
  newestOnTop = true;
  showCloseButton = true;
  // "position-class" = "toast-bottom-center";
  positionClass:"toast-bottom-right";
  toastLife = 3000;
  titleClass:"SUCCESS";
}