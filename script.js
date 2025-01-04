// SHOP

// let productsList = [
//   {
//     id: 1,
//     name: "Ролик для преса подвійний",
//     price: 299,
//     color: "червоний",
//     size: "Розмір: 250 мм",
//     image: "wheel.jpg",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: "Скакалка",
//     price: 94,
//     color: "зелений",
//     size: "Розмір: 2750х5 мм",
//     image: "jump_rope.jpg",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: "Балансувальна подушка масажна",
//     price: 399,
//     color: "синій",
//     size: "Розмір: 320х50 мм",
//     image: "balance.jpg",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     name: "Степ-платформа",
//     price: 1399,
//     color: "чорний-сірий",
//     size: "Розмір: 780х290х200 мм",
//     image: "step.jpg",
//     quantity: 1,
//   },
//   {
//     id: 5,
//     name: "Килимок для йоги та фітнесу",
//     price: 575,
//     color: "фіолетово-помаранчевий",
//     size: "Розмір: 1830х610х6 мм",
//     image: "mat.jpg",
//     quantity: 1,
//   },
//   {
//     id: 6,
//     name: "Fitball для фітнесу",
//     price: 1323,
//     color: "сірий",
//     size: "Розмір: 650 мм",
//     image: "fitball.jpg",
//     quantity: 1,
//   },
//   {
//     id: 7,
//     name: "Обтяжувачі-манжети для рук і ніг",
//     price: 459,
//     color: "чорний-помаранчевий",
//     size: "Вага: 2 х 0,5 кг",
//     image: "cuff_weight.jpg",
//     quantity: 1,
//   },
//   {
//     id: 8,
//     name: "Гантелі",
//     price: 724,
//     color: "зелений",
//     size: "Вага: 1х2,5 кг",
//     image: "dumbbell.jpg",
//     quantity: 1,
//   },
// ];

let number = document.querySelector(".number");
let productsList = [];
let productsInCart = [];

// перевірка наявності товарів в localStorage
const savedProducts = localStorage.getItem("shoppingCart");

if (savedProducts) {
  productsInCart = JSON.parse(savedProducts);
  console.log(productsInCart);
}

//- зчитування числа з іконки "кошик"
const savedNumber = localStorage.getItem("number");

if (savedNumber) {
  document.querySelector(".number").innerText = savedNumber;
}

const containerProducts = document.getElementById("container-products");

// - шаблон з товаром
function showData(productsList) {
  let productHTML = "";
  let addedToCart = false;
  let button = "";

  productsList.forEach((product) => {
    addedToCart = productsInCart.some((el) => el.id == product.id);
    // console.log(addedToCart);

    button = addedToCart
      ? `<button
            type="button"
            style="width: 100%; background-color:#ffd000; color: black"
            class="shop-item-button"
            data-product-id="${product.id}"
            disabled
          >
            ДОДАНО
          </button>`
      : `<button
            type="button"
            style="width: 100%"
            class="shop-item-button"
            data-product-id="${product.id}"
          >
            КУПИТИ
          </button>`;

    productHTML += `<div class="wrapper-item col-6 col-sm-4 col-lg-3">
    <div class="card product">
      <img
        src="./images/${product.image}"
        class="card-img-top shop-item-image"
        alt="..."
      />
      <div class="card-body px-1">
        <div>
          <h6 class="card-title shop-item-title">
            <a class="title" href="#">${product.name}</a>
          </h6>
          <p class="size">${product.size}</p>
          <p class="color">Колір: ${product.color}</p>
        </div>
  
        <div>
          <p class="text-center card-text shop-item-price">
            <strong class="price">${product.price}</strong><strong> &#8372;</strong>
          </p>
         ${button}
        </div>
      </div>
    </div>
  </div>`;
  });

  containerProducts.insertAdjacentHTML("beforeend", productHTML);
  getProduct();
}

// - створення запиту
function showProducts() {
  // let url = "https://run.mocky.io/v3/d3a3598b-a68e-4f7f-86ed-301913b6ce9c";
  let url = "./data/data.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onreadystatechange = function () {
    // console.log("xhr: ", xhr);

    if (xhr.readyState === 4) {
      productsList = JSON.parse(xhr.responseText);

      showData(productsList);
    }
  };
}

function getProduct() {
  // блоки з товарами
  const products = document.querySelectorAll(".product");

  // - click на кнопку "купити"
  products.forEach((product) => {
    product.addEventListener("click", function (e) {
      if (e.target.classList.contains("shop-item-button")) {
        e.target.innerText = "ДОДАНО";
        e.target.style.cssText += "background-color:#ffd000; color: black";
        e.target.disabled = true;

        const productID = e.target.dataset.productId;
        const productName = product.querySelector(".title").innerText;
        const productPrice = product.querySelector(".price").innerText;
        const productColor = product.querySelector(".color").innerText;
        const productSize = product.querySelector(".size").innerText;
        const productImage = product.querySelector("img").src;

        // збір даних, створення об'єкта
        let addToCart = {
          id: productID,
          name: productName,
          price: +productPrice,
          color: productColor,
          size: productSize,
          image: productImage,
          quantity: 1,
        };

        // додавання товару в кошик, перевірка по id
        if (!productsInCart.find((el) => el.id === addToCart.id)) {
          productsInCart.push(addToCart);
        }

        // збереження в localStorage числа на іконці "кошик"
        number.innerHTML = productsInCart.length;
        localStorage.setItem("number", productsInCart.length);

        // збереження масива в localStorage
        localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
      }
    });
  });
}

// - бургер-кнопка
function toggleMenu(menuCssSelector, className) {
  document.querySelector(menuCssSelector).classList.toggle(className);
}

// - блокування кнопки "пошук"
document.querySelector(".btn-form").addEventListener("click", function (e) {
  e.preventDefault();
});

// - блокування links у menu
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

// - блокування links у footer
document.querySelectorAll(".footer-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

// - init
showProducts();
