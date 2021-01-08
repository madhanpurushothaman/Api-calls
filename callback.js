let form = document.getElementById("form"); //initialisation of variables
let submit = document.getElementById("submit1");
let loader = document.getElementById("loader");
let output = document.getElementById("output");
let reset = document.getElementById("reset1");



/**
 * Event listener for submit button
 */
form.addEventListener("submit", (e) => {
  
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  if (name == "") {
    alert("Type some name");
  } else {
    formSubmit(name, callback1);
  } 
});
/**
 * Event listener for reset button
 */
form.addEventListener("reset", (e) => {

  submit.style.display = "flex";
  output.style.display = "none";
  reset.style.display = "none";

  document.getElementById("output").innerHTML =
    '<span id="name1"></span >&nbsp; has a gender  &nbsp;<span id="gender"></span>&nbsp; with probability of &nbsp;<span id="probability"></span>';
});
/**callback function */
async function callback1(inputname) {
  
  let response = await fetch(
    "https://api.genderize.io/?name=".concat(inputname)
  ); 
  let data = await response.json(); 
  console.log(data);
  let api1 = data.name;
  if (typeof data.name != "undefined") {
    var gender = data.gender;
    var probability = data.probability;
    document.getElementById("name1").innerHTML = data.name; 
    document.getElementById("gender").innerHTML = data.gender;
    document.getElementById("probability").innerHTML = data.probability;
  } else {
    document.getElementById("output").innerHTML = "invalid name";
  }
  setTimeout(formReset, 1000); 
}
/** formSubmit */
function formSubmit(name, callback) {
  reset.style.display = "none"; 
  submit.style.display = "none";
  loader.style.display = "block";
  callback(name);
}
/**  formrest*/
function formReset() {
  loader.style.display = "none";
  output.style.display = "flex";
  reset.style.display = "flex";
}
