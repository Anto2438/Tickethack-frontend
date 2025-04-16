const cardContainer = document.querySelector("#cart-container");

fetch("http://localhost:3000/carts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // if (data) {
    //     cardContainer.innerHTML =""
    //     data.forEach(elem => {
    //         cardContainer.innerHTML += `
            
    //         `
    //     })
    // }

  });
