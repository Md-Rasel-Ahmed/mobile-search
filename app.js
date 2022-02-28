// All dom selector
let form = document.querySelector("form");
let inputField = document.getElementById("input-field");
let phoneName = document.getElementById("phone-name");
let phoneImg = document.getElementById("phone-img");
let row = document.querySelector(".row");
let detailsImg = document.getElementById("detailsImg");
let releaseDate = document.getElementById("releaseDate");
let showDetails = document.getElementById("showDetails");
let spinner = document.getElementById("spinnner");
let showAll = document.getElementById("showAll");
let notFounded = document.querySelector(".notFounded");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputField.value === "") {
    alert("Please provide the valid name!!");
    return false;
  } else {
    loadData();
  }
  inputField.value = "";
  spinner.style.display = "block";
  // phoneDetails();
});
const loadData = () => {
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputField.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data.slice(0, 20));
      // phoneDetails(data.data.slug);
    })
    .catch((error) => {
      notFounded.style.display = "block";
      console.log(error);
    });
};
// loadData();
const displayData = (data) => {
  // console.log(data.slice(0, 20));
  spinner.style.display = "none";
  row.textContent = "";
  // console.log(data);
  data.forEach((phone) => {
    // console.log(phone);
    let div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.innerHTML = `
                  <div class="card m-2 p-2">
                      <div class="card-img">
                          <img id="phone-img" src="${phone.image}" alt="phone img" class="img-fluid w-50 mx-auto d-block">
                      </div>
                      <div class="card-body text-center">
                          <div class="card-title">
                              <h5>Name : <span  id="phone-name">${phone.phone_name}</span></h5>
                              <h5>Brand :<span  id="phone-name">${phone.brand}</span></h5>
                      
                      <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-primary">
                                Details
                         </button>
                         <div/>
                         <div/>
                  
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
      // main features
      mainFeatures(`chipSet`, data.data.mainFeatures.chipSet);
      mainFeatures(`displaySize`, data.data.mainFeatures.displaySize);
      mainFeatures(`memory`, data.data.mainFeatures.memory);
      mainFeatures(`storage`, data.data.mainFeatures.storage);
      // sensors details
      let sensors = "";
      data.data.mainFeatures.sensors.map((allSensors) => {
        sensors += " ," + allSensors;
      });
      document.getElementById("sensor").textContent = sensors;
      // others
      if (data.data?.others) {
        others("Bluetooth", data.data.others.Bluetooth);
        others("GPS", data.data.others.GPS);
        others("NFC", data.data.others.NFC);
        others("Radio", data.data.others.Radio);
        others("USB", data.data.others.USB);
        others("WLAN", data.data.others.WLAN);
      } else {
        others("Bluetooth", "Not founded!!");
        others("GPS", "Not founded!!");
        others("NFC", "Not founded!!");
        others("Radio", "Not founded!!");
        others("USB", "Not founded!!");
        others("WLAN", "Not founded!!");
      }
    });
  showDetails.style.display = "block";
};

const mainFeatures = (id, text) => {
  let feature = (document.getElementById(id).textContent = text);
  return feature;
};
const others = (id, text) => {
  let others = (document.getElementById(id).textContent = text);
  return others;
};
