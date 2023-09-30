// const { default: axios } = require("axios");

favNumUrl = "http://numbersapi.com/7";

// axios
//   .get(favNumUrl)
//   .then((data) => console.log(data.data))
//   .catch((err) => console.log(err.status));

// let array = [];

// function multiNum() {
//   return new Promise((resolve, reject) => {
//     request = axios
//       .get(`http://numbersapi.com/2,3,4,20`)
//       .then((data) => resolve(data));
//     console.log(request);
//   });
// }

// // multiNum().then((resp) => console.log(resp.data));
// array = [];
// function multiFact() {
//   for (let i = 0; i < 4; i++) {
//     array.push(axios.get("http://numbersapi.com/7"));
//   }
// }

// multiFact();

// Promise.all(array).then((arr) => {
//   arr.forEach((fact) => {
//     let li = document.createElement("li");
//     li.innerText = fact.data;
//     document.body.appendChild(li);
//   });
// });

//----------------------------DECK OF CARDS----------------------------

let firstResp = axios
  .get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
  .then((data) => {
    console.log("newly random shuffled deck card", data.data.cards);
  });

let deckId;
let button = document.querySelector(".drw-card");
let cards = document.querySelector(".cards");
let count = 0;

function getDeck() {
  return axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
}

function drawCard(deckId) {
  return axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );
}

document.addEventListener("DOMContentLoaded", function () {
  getDeck()
    .then((resp) => {
      console.log(resp.data);
      deckId = resp.data["deck_id"];
      return drawCard(deckId);
    })
    .then((resp) => {
      button.innerText = "Get card";
      button.style.display = "block";
      button.addEventListener("click", () => {
        return drawCard(deckId).then((resp) => {
          console.log(resp.data.cards[0].image);
          let card = document.createElement("div");
          let img = document.createElement("img");
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;
          img.src = resp.data.cards[0].image;
          img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
          card.classList.add(`card-${count++}`);
          card.appendChild(img);
          cards.appendChild(card);
        });
      });
    });
});
