const cardContainer = document.querySelector("#cart-container");
const defaultCart = document.querySelector("#default-cart");
const ifCartTitle = document.querySelector("#if-cart");
const cartItems = document.querySelector("#cart-items");

fetch("http://localhost:3000/carts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.result ===true) {
      if (defaultCart) {defaultCart.style.display = "none";}
      ifCartTitle.style.display = "flex";

      let totalPrice = data.data.reduce(
        (sum, elem) => sum + elem.tripId.price,
        0
      );

      data.data.forEach((elem) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const tripInfo = document.createElement("div");
        tripInfo.textContent = `${elem.tripId.departure} > ${elem.tripId.arrival}`;
        itemDiv.appendChild(tripInfo);

        const tripHour = document.createElement("div");
        tripHour.textContent = elem.tripId.hour;
        itemDiv.appendChild(tripHour);

        const tripPrice = document.createElement("div");
        tripPrice.textContent = `${elem.tripId.price}€`;
        itemDiv.appendChild(tripPrice);

        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.setAttribute("data-id", elem._id);
        deleteBtn.textContent = "x";

        deleteBtn.addEventListener("click", (event) => {
          const cartId = event.target.getAttribute("data-id");
          fetch(`http://localhost:3000/carts/${cartId}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.result) {
                itemDiv.remove();
              } else {
                console.error("Erreur lors de la suppression :", result.error);
              }
            })
            .catch((err) => console.error("Erreur réseau :", err));
        });

        itemDiv.appendChild(deleteBtn);

        cartItems.appendChild(itemDiv);
      });

      const priceContainer = document.createElement("div");
      priceContainer.id = "price-container";

      const totalPriceText = document.createElement("p");
      totalPriceText.id = "total";
      totalPriceText.textContent = `Total : ${totalPrice}€`;
      priceContainer.appendChild(totalPriceText);

      const purchaseButton = document.createElement("div");
      purchaseButton.id = "purchase";
      purchaseButton.textContent = "Purchase";
      priceContainer.appendChild(purchaseButton);

      cardContainer.appendChild(priceContainer);
    }
  })
  .catch((err) => console.error(err));

