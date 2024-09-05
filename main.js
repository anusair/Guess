let name = document.querySelector(".name");

let score = document.querySelector(".score");

let gameContainer = document.querySelector(".game-struct");

let cards = document.querySelectorAll(".card");

let cardsArray = Array.from(cards);

let orderRange = [...Array(cardsArray.length).keys()];

function start() {
  let div = document.createElement("div");

  div.className = "startDiv";


  let input = document.createElement("input");
  let header = document.createElement("h2");
  let sub = document.createElement("input");
  header.textContent = "Enter Your Name : ";

  // input field
  input.type = "text";
  input.placeholder = "Your Name";

  // submit field
  sub.type = "submit";
  sub.style.cursor = "pointer";
  sub.style.display = "block";
  sub.className = "sub";

  sub.onclick = () => {

    document.querySelector(".start").style.display = "none";
    
    name.innerHTML = input.value.toUpperCase();
    if (input.value === "") {
      name.innerHTML = "Unkown";
    }
  
    score.innerHTML = 0;
  
    flipAllTheCard();
  };


  document.querySelector(".start").appendChild(div);
  div.appendChild(header);
  div.appendChild(input);
  div.appendChild(sub);

}

start();

function flipAllTheCard () {

cards.forEach(e => {

    e.classList.add("is-flipped");

    setTimeout(() => {
        e.classList.remove("is-flipped");
    } , 2000)
     
})
}



suffle(orderRange);

function suffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }

  return array;
}

cards.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", () => {
    block.classList.add("is-flipped");
    game();
  });
});

function game() {
  let chosenCards = cardsArray.filter((flippedCard) =>
    flippedCard.classList.contains("is-flipped")
  );

  let selectedCards = [...chosenCards];

  if (chosenCards.length === 2) {
    gameContainer.classList.add("no-click");
  }

  check(selectedCards[0], selectedCards[1]);

  if (parseInt(score.innerHTML) === cardsArray.length / 2) {
    document.querySelector(".state").style.display = "block";

    document.querySelector(".res").onclick = () => {
      location.reload();
    }
  }
}


function check(cardOne, cardTwo) {
  if (cardOne.dataset.guess === cardTwo.dataset.guess) {
    cardOne.classList.add("has-matched");
    cardTwo.classList.add("has-matched");

    cardOne.classList.remove("is-flipped");
    cardTwo.classList.remove("is-flipped");

    gameContainer.classList.remove("no-click");

    score.innerHTML = parseInt(score.innerHTML) + 1;
  } else {
    setTimeout(() => {
      cardOne.classList.remove("is-flipped");
      cardTwo.classList.remove("is-flipped");

      gameContainer.classList.remove("no-click");
    }, 1500);
  }
}


console.log(Math.abs(4 - 6))
console.log(4 - 6)