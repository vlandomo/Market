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
let langtag;

// دالة حساب الإجمالي
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
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
      alert("The product has been added successfully");
    } else {
      alert("The product has been updated successfully");

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
              <td><button onclick="updateData(${i})" id="update" class="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete" class="delete">Delete</button></td>
        </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAllDataTable");
  let proNamber = document.getElementById("proNamber");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()" id="deleteAllDataTable">Delete All</button>`;
    proNamber.innerHTML = `<button>(${dataPro.length})</button>`;

  } else {
    btnDelete.innerHTML = "";
    proNamber.innerHTML = "";
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
  localStorage.removeItem("Product"); // حذف جميع البيانات من التخزين المحلي
  dataPro = []; // إعادة تعيين المصفوفة إلى فارغة
  showData(); // إعادة عرض البيانات بعد التحديث
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

// search
let searchMode = "title";

function getSearchMood(value) {
  let search = document.getElementById("search");
  if (value == "searchTitle") {
    searchMode = "title";
    if (langtag == "en") {
      search.placeholder = "Search By Name";
    } else {
      search.placeholder = "البحث بالاسم";
    }
  } else {
    searchMode = "category";
    if (langtag == "en") {
      search.placeholder = "Search By Category";
    } else {
      search.placeholder = "البحث الفئة";
    }
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
              <td>${dataPro[i].taxes || 0}</td>
              <td>${dataPro[i].ads || 0}</td>
              <td>${dataPro[i].discount || 0}</td>
              <td>${dataPro[i].category}</td>
              <td>${dataPro[i].total}</td>
              <td><button onclick="updateData(${i})" id="update" class="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete" class="delete">Delete</button></td>
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
              <td><button onclick="updateData(${i})" id="update" class="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete" class="delete">Delete</button></td>
        </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// scroll
// document.querySelectorAll("nav a").forEach((anchor) => {
//   anchor.addEventListener("click", function (event) {
//     event.preventDefault(); // منع التنقل الفوري
//     const targetId = this.getAttribute("href"); // جلب ID القسم المستهدف
//     const targetElement = document.querySelector(targetId);

//     window.scrollTo({
//       top: targetElement.offsetTop - 50, // تعويض ارتفاع الـ nav
//       behavior: "smooth", // التمرير السلس
//     });
//   });
// });

// change lang
function toggleLanguage() {
  let htmlTag = document.documentElement;
  let currentLang = htmlTag.lang === "ar" ? "en" : "ar";

  // تغيير لغة واتجاه الصفحة
  htmlTag.lang = currentLang;
  htmlTag.dir = currentLang === "ar" ? "rtl" : "ltr";

  // تحديث النصوص بناءً على اللغة المختارة
  let elements = [
    "Market", "Input_Data", "submit", "prodacteTitle", "priceTitle",
    "countTitle", "taxesTitle", "absTitle", "discountTitle", "categoryTitle",
    "totalTitle", "updateTitle", "deleteTitle", "searchTitleh2",
    "update", "delete"
  ];
  let placeholders = [
    "title", "price", "count", "taxes", "ads", "discount", "category", "search", "deleteAllData"
  ];

  // تغيير النصوص العادية
  elements.forEach((id) => {
    let el = document.getElementById(id);
    if (el) el.textContent = translations[currentLang][id];
  });

  // تغيير النصوص داخل العناصر التي تحتوي على `class` معين
  elements.forEach((className) => {
    let elms = document.querySelectorAll(`.${className}`);
    elms.forEach((el) => {
      el.textContent = translations[currentLang][className];
    });
  });

  // تغيير الـ placeholder للمدخلات
  placeholders.forEach((id) => {
    let el = document.getElementById(id);
    if (el) el.setAttribute("placeholder", translations[currentLang][id]);
  });

  // تحديث نصوص الخيارات داخل <select>
  let searchMode = document.getElementById("searchMode");
  if (searchMode) {
    searchMode.options[0].textContent = translations[currentLang].searchTitle;
    searchMode.options[1].textContent = translations[currentLang].searchCategory;
  }

  // تحديث زر "حذف الكل" إذا كان موجودًا
  let deleteAllBtn = document.getElementById("deleteAllDataTable");
  if (deleteAllBtn && deleteAllBtn.firstChild) {
    deleteAllBtn.firstChild.textContent = translations[currentLang].deleteAllDataTable;
  }
}

// كائن يحتوي على الترجمات باللغتين
const translations = {
  ar: {
    Market: "متـــــجر",
    Input_Data: "ادخــل البيانــات",
    title: "اسم المنتج",
    price: "السعر",
    count: "العدد",
    taxes: "الضرائب",
    ads: "الإعلانات",
    discount: "الخصم",
    category: "الفئة",
    submit: "اضافة",
    searchTitleh2: "البـــحــــــــث",
    search: "البحث بالاسم",
    searchTitle: "البحث بالاسم",
    searchCategory: "البحث بالفئة",
    deleteAllDataTable: "حذف الكل",
    prodacteTitle: "المنتج",
    priceTitle: "السعر",
    countTitle: "العدد",
    taxesTitle: "الضرائب",
    absTitle: "الإعلانات",
    discountTitle: "الخصم",
    categoryTitle: "الفئة",
    totalTitle: "الاجمالي",
    updateTitle: "تحديث",
    deleteTitle: "حذف",
    update: "تحديث",
    delete: "حذف",
  },
  en: {
    Market: "Market",
    Input_Data: "Input Data",
    title: "Product Name",
    price: "Price",
    count: "Count",
    taxes: "Taxes",
    ads: "Ads",
    discount: "Discount",
    category: "Category",
    submit: "Create",
    searchTitleh2: "Search",
    search: "Search",
    searchTitle: "Search By Name",
    searchCategory: "Search By Category",
    deleteAllDataTable: "Delete All",
    prodacteTitle: "Product",
    priceTitle: "Price",
    countTitle: "Count",
    taxesTitle: "Taxes",
    absTitle: "Ads",
    discountTitle: "Discount",
    categoryTitle: "Category",
    totalTitle: "Total",
    updateTitle: "Update",
    deleteTitle: "Delete",
    update: "Update",
    delete: "Delete",
  },
};
