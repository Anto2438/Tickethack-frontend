


fetch('http://localhost:3000/bookings')
.then(response=> response.json())
.then(data =>{
  console.log(data)
  const departure = data.data[0].departure
  const arrival = data.data[0].arrival
  const price = data.data[0].price
  
  const date = data.data[0].date
 //const hour = new Date(data.data[0].date).getHours
//console.log(departure, arrival, price, date)
console.log(document.querySelector('#hour'))
document.querySelector('#trajet').textContent = departure + '>' + arrival
document.querySelector('#price').textContent =price + "€"
document.querySelector('#hour').textContent = date

})



