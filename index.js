function handleChange() {
  var menuType = document.getElementsByName("food");
  for (i = 0; i < menuType.length; i++) {
    if (menuType[i].checked) {
      let menuSelected = menuType[i].value;
      if (menuSelected == "veg") {
        let vegMenu = async () => {
          let data = await window.fetch("./menu.json");
          let finalData = await data.json();
          //   console.log(finalData);
          finalData.map(val => {
            let veg = val.veg;
            document.getElementById("dropdown").innerHTML = "";
            // console.log(veg);
            for (i of veg) {
              //   console.log(i.name);
              document.getElementById(
                "dropdown"
              ).innerHTML += `<option>${i.name} : &#8377; ${i.price}</option>`;
            }
          });
        };
        vegMenu();
      } else {
        let nonVegMenu = async () => {
          let data = await window.fetch("./menu.json");
          let finalData = await data.json();
          //   console.log(finalData);
          finalData.map(val => {
            document.getElementById("dropdown").innerHTML = "";
            let veg = val.nonVeg;
            // console.log(veg);
            for (i of veg) {
              //   console.log(i.name);

              document.getElementById(
                "dropdown"
              ).innerHTML += `<option>${i.name} : &#8377; ${i.price}</option>`;
            }
          });
        };
        nonVegMenu();
      }
    }
  }
}
let sum = 0;
let increment = () => {
  document.querySelector(".quan").innerHTML = ++sum;
};
let decrement = () => {
  document.querySelector(".quan").innerHTML = --sum;
};
let form = document.querySelector("#menuForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector("#displayBill").style.display = "block";
  let inv = Math.floor(Math.random() * 999);
  document.querySelector(".invoice").innerHTML = `A${inv}`;
  let name = e.target[0].value;
  let foodName = e.target[3].value;
  let foodFinal = foodName.slice(0, 15);
  let price = e.target[3].value;
  let finalPrice = parseInt(price.slice(-3));
  let intPrice = parseInt(finalPrice);
  let qty = document.querySelector(".quan").innerHTML;
  let fQty = parseInt(qty);
  document.querySelector(".cName").innerHTML = `${name}`;
  document.querySelector(
    "tbody"
  ).innerHTML += `<tr><td>${foodFinal}</td><td>${finalPrice}</td><td>${qty}</td><td>${eval(
    intPrice * fQty
  )} <span><i class="fa-solid fa-trash delete"></i></span></td></tr>`;
  document.querySelector(".quan").innerHTML = 1;
  document.querySelectorAll(".delete").forEach(span1 => {
    span1.addEventListener("click", e => {
      e.target.parentElement.parentElement.parentElement.remove();
      console.log(e);
    });
  });
});
