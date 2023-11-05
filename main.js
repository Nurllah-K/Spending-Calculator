const harcamaInput = document.querySelector("#harcama");

// console.log(harcamaInput)
const fiyatInput = document.querySelector("#fiyat");

// console.log(fiyatInput)
const formBtn = document.querySelector(".ekle-btn");

// console.log(formBtn)
const list = document.querySelector(".list")

// console.log(list)
const totalInfo = document.querySelector("#total-info")
const nameInput = document.getElementById("name-input")
console.log(nameInput)
const userName = localStorage.getItem("name")
const statusCheck = document.getElementById("status-input")
const selectFilter = document.getElementById("filter-select")

nameInput.value = userName
nameInput.addEventListener("change", (e) => {
 // console.log(e.target.value)
 localStorage.setItem("name", e.target.value)
})

// console.log(totalInfo)
formBtn.addEventListener("click", addExpense)
list.addEventListener("click", handleClick)

selectFilter.addEventListener("change", handleFilter)

let toplam = 0

function updateToplam(fiyatBilgisi) {
 console.log(fiyatBilgisi)
 toplam += Number(fiyatBilgisi);
 totalInfo.innerText = toplam

}

function addExpense(e) {
 e.preventDefault();
 if (!harcamaInput.value || !fiyatInput.value) {
  alert("Fill in all the blanks");

 }
 else {
  const harcamaDiv = document.createElement("div")

  harcamaDiv.classList.add("expense")
  if (statusCheck.checked) {
   harcamaDiv.classList.add("payed")
  }

  harcamaDiv.innerHTML = `  <h2>${harcamaInput.value}</h2>
  <h2 id="value">${fiyatInput.value}</h2>
  <div class="buttons">
   <img id="payment" src="/img/pay.png" alt="">
   <img  id="remove" src="/img/remove.png" alt="">`
  list.appendChild(harcamaDiv);
  // console.log(harcamaDiv);
  updateToplam(fiyatInput.value)
 }
 // console.log(harcamaInput.value)


 harcamaInput.value = "";
 fiyatInput.value = "";
}
function handleClick(e) {
 // console.log(e.target)
 let tiklanilanEleman = e.target
 if (tiklanilanEleman.id === "remove") {
  const kapsayiciEleman = tiklanilanEleman.parentElement.parentElement

  const deletedPrice = kapsayiciEleman.querySelector("#value").innerText
  console.log(deletedPrice)

  updateToplam(-Number(deletedPrice))

  kapsayiciEleman.remove()
 }
}
function handleFilter(e) {
 const harcamaKartlari = list.childNodes;
 const filterValue = e.target.value;
 // console.log(filterValue)
 harcamaKartlari.forEach((harcamaKarti) => {
  switch (filterValue) {
   case "all":
    harcamaKarti.style.display = "flex";
    break;

   case "payed":
    if (!harcamaKarti.classList.contains("payed")) {
     harcamaKarti.style.display = "none";
    } else {
     harcamaKarti.style.display = "flex";
    }
    break;
   case "not-payed":
    if (harcamaKarti.classList.contains("payed")) {
     harcamaKarti.style.display = "none"
    } else {
     harcamaKarti.style.display = "flex"
    }
    break;
  }
 });
}

