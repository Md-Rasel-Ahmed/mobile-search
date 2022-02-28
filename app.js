// All dom selector
let form = document.querySelector("form");
let inputField = document.getElementById("input-field");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("done");
});
