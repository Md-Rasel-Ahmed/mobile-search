// All dom selector
let form = document.querySelector("form");
let inputField = document.getElementById("input-field");
let phoneName = document.getElementById("phone-name");
let phoneImg = document.getElementById("phone-img");
let row = document.querySelector(".row");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadData();
});
const loadData = () => {
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputField.value}`
  )
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
// loadData();
const displayData = (data) => {
  // console.log(data);
  data.forEach((phone) => {
    console.log(phone.brand);
    let div = document.createElement("div");
  });
};
