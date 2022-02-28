// All dom selector
let form = document.querySelector("form");
let inputField = document.getElementById("input-field");
let phoneName = document.getElementById("phone-name");
let phoneImg = document.getElementById("phone-img");
let row = document.querySelector(".row");
let detailsImg = document.getElementById("detailsImg");
let releaseDate = document.getElementById("releaseDate");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadData();
  // phoneDetails();
});
const loadData = () => {
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputField.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data);
      // phoneDetails(data.data.slug);
    });
};
// loadData();
const displayData = (data) => {
  row.textContent = "";
  // console.log(data);
  data.forEach((phone) => {
    // console.log(phone);
    let div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.innerHTML = `
                  <div class="card m-2 p-2">
                      <div class="card-img">
                          <img id="phone-img" src="${phone.image}" alt="card ung">
                      </div>
                      <div class="card-body">
                          <div class="card-title">
                              <h3>Name : <span  id="phone-name">${phone.phone_name}</span></h3>
                              <h3>Brand :<span  id="phone-name">${phone.brand}</span></h3>
                             
                              
                              <!-- Button trigger modal -->
<button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-primary">
  Details
</button>
                  
    `;
    row.appendChild(div);
  });
};

const phoneDetails = (id) => {
  let url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      detailsImg.src = data.data.image;
      if (data.data.releaseDate) {
        releaseDate.textContent = data.data.releaseDate;
      } else {
        releaseDate.textContent = "Release Date don,t have";
      }
      mainFeatures(`chipSet`, data.data.mainFeatures.chipSet);
      mainFeatures(`displaySize`, data.data.mainFeatures.displaySize);
      mainFeatures(`memory`, data.data.mainFeatures.memory);
      mainFeatures(`storage`, data.data.mainFeatures.storage);
    });
};

const mainFeatures = (id, text) => {
  let feature = (document.getElementById(id).textContent = text);
  return feature;
};
// mainFeatures("releaseDate", "fh");
