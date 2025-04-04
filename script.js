var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

// Lấy số ngày trong tháng hiện tại
function daysInMonth(m, y) {
  return new Date(y, m, 0).getDate();
}

var totalDays = daysInMonth(month, year);

// Xác định ngày hôm qua
var dayYesterday = day - 1;
if (dayYesterday < 1) {
  var prevMonth = new Date(year, month - 1, 0);
  dayYesterday = prevMonth.getDate();
}

var dayYesterday = day - 1;
if (dayYesterday < 1) {
  var prevMonth = new Date(year, month - 1, 0);
  dayYesterday = prevMonth.getDate();
}

// Định dạng ngày
var formattedDate = day + "/" + month + "/" + year;
var formattedDate_1 = dayYesterday + "/" + month + "/" + year;

// Gán giá trị vào HTML
document.getElementById("currentDate").textContent = formattedDate;
document.getElementById("currentDate_1").textContent = formattedDate;
document.getElementById("currentDate_2").textContent = formattedDate;
document.getElementById("currentDate_3").textContent = formattedDate;
document.getElementById("currentDate_4").textContent = formattedDate;

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn form reload trang

  let alertBox = document.querySelector(".alert-suc");
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.opacity = "1";
  }, 100); // Bắt đầu hiệu ứng hiện dần

  // Ẩn sau 5 giây với hiệu ứng mờ dần
  setTimeout(() => {
    alertBox.style.opacity = "0";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 1000); // Đợi hiệu ứng mờ xong mới ẩn hoàn toàn
  }, 3000);

  // Lấy dữ liệu từ form
  let formData = new FormData(this);
  let selectedProduct = document.querySelector('input[name="product"]:checked');

  formData.append("originalPrice", selectedProduct.getAttribute("data-price"));
  formData.append(
    "discountPrice",
    selectedProduct.getAttribute("data-discount")
  );

  // Gửi dữ liệu lên Google Sheets nhưng không chờ phản hồi
  fetch(
    "https://script.google.com/macros/s/AKfycbyYZgOJ-LA_u1hjAAIAGF2Ni7zDQKSBeHBD_Unymbmbt-ZFio9-xqFA_qeBmOKtfvxI/exec",
    {
      // Thay bằng URL Web App từ Apps Script
      method: "POST",
      body: new URLSearchParams(formData),
    }
  ).catch((error) => console.error("Lỗi:", error));

  // Reset form ngay sau khi bấm gửi
  this.reset();
  document.getElementById("originalPrice").textContent = "0đ";
  document.getElementById("discountPrice").textContent = "0đ";
  document.getElementById("discountPercent").textContent = "-0%";
});

document.querySelectorAll('input[name="product"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    let originalPrice = this.getAttribute("data-price");
    let discountPrice = this.getAttribute("data-discount");

    let discountPercent = Math.round((1 - discountPrice / originalPrice) * 100); // Tính % giảm giá

    // Cập nhật giá trong giao diện
    document.getElementById("originalPrice").textContent =
      formatCurrency(originalPrice);
    document.getElementById("discountPrice").textContent =
      formatCurrency(discountPrice);
    document.getElementById(
      "discountPercent"
    ).textContent = `-${discountPercent}%`;
  });
});

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

document.querySelectorAll('input[name="product"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    let kgValue = this.getAttribute("data-kg");

    document.getElementById("kg").textContent = kgValue;
  });
});

//mail
(function () {
  emailjs.init("TWB0PBHRrC275e5pX"); // 🛠️ Thay bằng Public Key của bạn
})();
function sendEmail() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const selectedProduct = document.querySelector(
    'input[name="product"]:checked'
  );

  let productText = "";
  let productDiscount = "";

  if (selectedProduct) {
    productText = selectedProduct.value; // "5kg tặng 20 súp"
    productDiscount = selectedProduct.getAttribute("data-discount");
  } else {
    alert("❗ Bạn chưa chọn sản phẩm!");
    return;
  }

  const message = `
🔹 Tên + SĐT: ${name}
🔹 Địa chỉ: ${address}
🔹 Ghi chú: ${phone}
🔹 Sản phẩm: ${productText}
🔹 Giá: ${productDiscount}đ
  `;

  const emailParams = {
    to_email: "contact.titiay@gmail.com",
    subject: "📦 Đơn Hàng Mới",
    message: message,
  };

  emailjs
    .send("service_mwwqgmt", "template_98oxct3", emailParams)
}

function showSuccess() {
  let alertBox = document.querySelector(".alert-suc");
  alertBox.style.display = "block";

  // Ẩn sau 3 giây
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}
