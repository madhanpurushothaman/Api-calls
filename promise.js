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
    console.log(name);
    reset.style.display = "none"; 
    submit.style.display = "none";
    loader.style.display = "block";
    promise1(name);
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
    '<span id="name1"></span >&nbsp; has a gender  &nbsp;<span id="country"></span>&nbsp; with probability of &nbsp;<span id="probability"></span>';
});
/**promise function */
function promise1(inputname) {
 
  new Promise((resolve, reject) => {
    fetch("https://api.genderize.io/?name=".concat(inputname)).then(
      (response) => {
        
        if (response.ok) {
          let data = response.json().then(data => {
  if (typeof (data.name) != "undefined") {
    document.getElementById("name1").innerHTML = data.name; //paint the results
    document.getElementById("country").innerHTML = data.gender;
    document.getElementById("probability").innerHTML = data.probability;
            } else {
              document.getElementById("output").innerHTML = "invalid name";
            }
          });
        } else {
          document.getElementById("output").innerHTML = "invalid name";
        }
        setTimeout(() => {
        

          loader.style.display = "none";
          output.style.display = "flex";
          reset.style.display = "flex";
        }, 1000);
      }
    );
  });
}
