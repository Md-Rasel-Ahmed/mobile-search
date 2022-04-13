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
let notFounded = document.querySelector("#notFounded");

// ADD evenet listener
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
  document.querySelector(".results").style.display = "block";
});
// load data from API
const loadData = () => {
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputField.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data);
    });
};

// Display data showing function
const displayData = (data) => {
  let allData = data.length;
  // console.log(data);
  let prevData = data.slice(0, 20);
  let lastData = data.slice(20);
  // showAll button click start
  document.querySelector(".showAll").addEventListener("click", () => {
    lastData.forEach((last) => {
      let div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.innerHTML = `
                  <div class="card m-2 p-2">
                      <div class="card-img">
                          <img id="phone-img" src="${last.image}" alt="phone img" class="img-fluid w-50 mx-auto d-block">
                      </div>
                      <div class="card-body text-center">
                          <div class="card-title">
                              <h5>Name : <span  id="phone-name">${last.phone_name}</span></h5>
                              <h5>Brand :<span  id="phone-name">${last.brand}</span></h5>
                      
                      <button onclick="phoneDetails('${last.slug}')" type="button" class="btn btn-primary">
                                Details
                         </button>
                         <div/>
                         <div/>
                  
    `;
      row.appendChild(div);
      if (prevData.length + lastData.length === allData) {
        document.querySelector(".showAll").style.display = "none";
      }
    });
  });
  // Show all button end;

  // condition cheking
  if (data.length <= 0) {
    notFounded.style.display = "block";
    document.querySelector(".results").style.display = "none";
    showDetails.style.display = "none";
  } else if (data.length > 20) {
    document.querySelector(".showAll").style.display = "block";
  } else {
    notFounded.style.display = "none";
  }
  spinner.style.display = "none";
  row.textContent = "";
  data.slice(0, 20).forEach((phone) => {
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

// Phone details showing function
const phoneDetails = (id) => {
  // api calling from the phone id
  let url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      detailsImg.src = data.data.image;
      document.querySelector("#detialsName").textContent = data.data.name;
      if (data.data.releaseDate) {
        releaseDate.textContent = data.data.releaseDate;
      } else {
        releaseDate.textContent = "No release date has been given yet";
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
      // others details
      if (data.data?.others) {
        others("Bluetooth", data.data.others.Bluetooth);
        others("GPS", data.data.others.GPS);
        others("NFC", data.data.others.NFC);
        others("Radio", data.data.others.Radio);
        others("USB", data.data.others.USB);
        others("WLAN", data.data.others.WLAN);
      } else {
        others("Bluetooth", "Don,t have!!");
        others("GPS", "Don,t have!!");
        others("NFC", "Don,t have!!");
        others("Radio", "Don,t have!!");
        others("USB", "Don,t have!!");
        others("WLAN", "Don,t have!!");
      }
    });
  showDetails.style.display = "block";
};

// main features function
const mainFeatures = (id, text) => {
  let feature = (document.getElementById(id).textContent = text);
  return feature;
};
// others features function
const others = (id, text) => {
  let others = (document.getElementById(id).textContent = text);
  return others;
};
