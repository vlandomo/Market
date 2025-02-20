let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create"; // تحديد الوضع: إنشاء أو تعديل
let tmp; // متغير لتخزين الفهرس عند التعديل

// دالة حساب الإجمالي
function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// التحقق من وجود بيانات في localStorage
let dataPro = localStorage.getItem("Product")
  ? JSON.parse(localStorage.getItem("Product"))
  : [];

// إضافة أو تعديل المنتج
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value && price.value && category.value) {
    if (mode === "create") {
      dataPro.push(newPro);
    } else {
      dataPro[tmp] = newPro;
      mode = "create";
      submit.innerHTML = "Create";
    }

    localStorage.setItem("Product", JSON.stringify(dataPro));
    clearData();
    showData();
  } else {
    alert("يرجى ملء جميع الحقول المطلوبة!");
  }
};

// دالة مسح الحقول بعد الإضافة أو التعديل
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "red";
}

// دالة عرض البيانات في الجدول
function showData() {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].count || 1}</td>
              <td>${dataPro[i].taxes || 0}</td>
              <td>${dataPro[i].ads || 0}</td>
              <td>${dataPro[i].discount || 0}</td>
              <td>${dataPro[i].category}</td>
              <td>${dataPro[i].total}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

// دالة حذف عنصر معين
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("Product", JSON.stringify(dataPro));
  showData();
}

// دالة حذف جميع البيانات
function deleteAll() {
  localStorage.removeItem("Product"); // حذف بيانات المنتج فقط
  dataPro = [];
  showData();
}

// دالة تحديث البيانات
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.value = dataPro[i].count;
  getTotal();
  submit.innerHTML = "Update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  search.value = "";
}

// البحث
let searchMode = "title";

function getSearchMood(value) {
  let search = document.getElementById("search");
  if (value == "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Name";
  } else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].count || 1}</td>
              <td>${dataPro[i].taxes|| 0}</td>
              <td>${dataPro[i].ads || 0}</td>
              <td>${dataPro[i].discount || 0}</td>
              <td>${dataPro[i].category}</td>
              <td>${dataPro[i].total}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].count || 1}</td>
              <td>${dataPro[i].taxes || 0}</td>
              <td>${dataPro[i].ads || 0}</td>
              <td>${dataPro[i].discount || 0}</td>
              <td>${dataPro[i].category}</td>
              <td>${dataPro[i].total}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
