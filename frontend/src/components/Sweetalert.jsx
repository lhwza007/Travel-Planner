import Swal from "sweetalert2";

export function SweetalertSucc(msg) {
  const swal = Swal.fire({
    title: msg,
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload(); // รีเฟรชหน้า
    }
  });
  return swal;
}

export function SweetalertErr(msg) {
  const swal = Swal.fire({
    title: msg,
    icon: "error",confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload(); // รีเฟรชหน้า
    }
  });
  return swal;
}
