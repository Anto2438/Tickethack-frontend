const cardContainer = document.querySelector("#cart-container");
const defaultCart = document.querySelector("#default-cart");
const ifCartTitle = document.querySelector("#if-cart");
const cartItems = document.querySelector("#cart-items");

fetch("http://localhost:3000/carts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data) {
      defaultCart.style.display = "none";
      ifCartTitle.style.display = "flex";
      
      let totalPrice = data.data.reduce(
        (sum, elem) => sum + elem.tripId.price,
        0
      );
      
      data.data.forEach((elem) => {
        cartItems.innerHTML += `
        <div class="item">
          <div>${elem.tripId.departure} > ${elem.tripId.arrival}</div>
          <div>${elem.tripId.hour}</div>
          <div>${elem.tripId.price}€</div>
          <div class="delete-btn">x</div>
        </div>
        `;
      });
      
      cardContainer.innerHTML += `
        <div id="price-container">
            <p id="total">Total : ${totalPrice}€</p>
            <div id="purchase">Purchase</div>
        </div>
        `;  
    }
  });
