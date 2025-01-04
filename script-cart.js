let arrayProducts = JSON.parse(localStorage.getItem("shoppingCart"));
console.log("array:", arrayProducts);

let number = localStorage.getItem("number");

const btnPlus = document.querySelector('[data-action="plus"]');
const btnMinus = document.querySelector('[data-action="minus"]');
const cartWrapper = document.querySelector(".cart-wrapper");

// шаблони
const caption = document.querySelector(".wrapper-caption");
const wrapperTotals = document.querySelector(".wrapper-totals");
const cartEmpty = document.querySelector(".cart-empty");
let cartItemHTML = "";

arrayProducts.forEach((el) => {
  cartItemHTML += `<div class="row cart-item" id="${el.id}">
          <div class="image-prod col-3 col-sm-2 col-md-2 col-lg-2">
            <img class="image" src="${el.image}" alt="" />
          </div>

          <div class="title-prod col-7 col-sm-7 col-md-3 col-lg-3">
            <h6><a class="title" href="#">${el.name}</a></h6>
            <p class="size">${el.size}</p>
            <p class="color">${el.color}</p>
          </div>

          <div class="price-prod col col-sm-3 col-md-2 col-lg-2">
            <p class="text-center"><strong class="price">${el.price}</strong> грн</p>
          </div>

          <div class="quantity-prod text-center col-5 col-sm-3 col-md-2 col-lg-2">
            <div class="text-center counter-wrapper">
              <button class="remove" type="button" data-action="minus"></button>
              <input class="quantity" type="text" value="${el.quantity}" data-counter />
              <button class="add" type="button" data-action="plus"></button>
            </div>
          </div>

          <div class="col col-sm-3 col-md-2 col-lg-2">
            <div class="subtotal-wrapper">
              <p class="text-center">
                <strong class="subtotal">${el.price}</strong> грн
              </p>
            </div>
          </div>
          <div class="delete-wrapper text-center col-2 col-sm-3 col-md-1 col-lg-1">
            <button class="delete" type="button" data-action="delete"></button>
          </div>
        </div>`;

  calcPrice();
});

cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
toggleCartStatus();

function toggleCartStatus() {
  if (cartWrapper.children.length > 0) {
    cartEmpty.style.cssText = "display: none";
    wrapperTotals.style.cssText = "display: block";
    caption.style.cssText = "display: block";
  } else {
    cartEmpty.style.cssText = "display: block";
    wrapperTotals.style.cssText = "display: none";
    caption.style.cssText = "display: none";
  }
}

cartWrapper.addEventListener("click", function (e) {
  // - кількість plus/minus
  if (
    e.target.dataset.action === "plus" ||
    e.target.dataset.action === "minus"
  ) {
    let input;
    const cartItem = e.target.closest(".cart-item");
    const counterWrapper = e.target.closest(".counter-wrapper");
    input = counterWrapper.querySelector("[data-counter]");

    if (e.target.dataset.action === "plus") {
      input.value = ++input.value;

      // - збереження quantity в localStorage для "plus"
      let ProdById = arrayProducts.find((el) => el.id == cartItem.id);
      ProdById.quantity = input.value;

      localStorage.setItem("shoppingCart", JSON.stringify(arrayProducts));
    }

    if (e.target.dataset.action === "minus") {
      if (parseInt(input.value) > 1) {
        input.value = --input.value;

        // - збереження quantity в localStorage для "minus"
        let ProdById = arrayProducts.find((el) => el.id == cartItem.id);
        ProdById.quantity = input.value;

        localStorage.setItem("shoppingCart", JSON.stringify(arrayProducts));
      }
    }
  }

  // видалення товару з кошика
  if (e.target.dataset.action === "delete") {
    let itemId = e.target.closest(".cart-item").id;

    // варіант 1
    arrayProducts = arrayProducts.filter((el) => el.id != itemId);

    // варіант 2
    // let itemIndex = arrayProducts.indexOf(arrayProducts.find((el) => el.id === itemId));
    // arrayProducts.splice(itemIndex, 1);

    console.log("arr", arrayProducts);

    // перезапис масива в localStorage
    localStorage.setItem("shoppingCart", JSON.stringify(arrayProducts));
    //console.log(JSON.stringify(arrayProducts));

    // цифра на iконці "кошик"
    localStorage.setItem("number", arrayProducts.length);

    e.target.closest(".cart-item").remove();
    toggleCartStatus();
  }

  if (e.target.hasAttribute("data-action")) {
    calcPrice();
    toggleCartStatus();
  }
});

function calcPrice() {
  const cartItems = document.querySelectorAll(".cart-item");
  const totals = document.querySelector(".total-sum");
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const quantity = item.querySelector(".quantity");
    const price = item.querySelector(".price");
    const subTotal = item.querySelector(".subtotal");

    const currentPrice = parseInt(quantity.value) * parseInt(price.innerText);
    totalPrice += currentPrice;

    subTotal.innerText = currentPrice;

    totals.innerText = totalPrice;
  });
  totals.innerText = totalPrice;
}
calcPrice();

// clear localStorage
const orderBtn = document.querySelector(".order");

orderBtn.addEventListener("click", function () {
  localStorage.clear();

  cartEmpty.style.cssText = "display: block";
  wrapperTotals.style.cssText = "display: none";
  caption.style.cssText = "display: none";
  cartWrapper.innerText = "";
});
