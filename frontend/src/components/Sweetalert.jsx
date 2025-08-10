import Swal from "sweetalert2";


export function SweetalertSucc(msg) {
  const swal = Swal.fire({
    title: msg,
    icon: "success",
    draggable: true,
  });
  return swal;
}


export function SweetalertErr(msg) {
  const swal = Swal.fire({
    title: msg,
    icon: "error",
    draggable: true,
  });
  return swal;
}



