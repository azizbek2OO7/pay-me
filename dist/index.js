import { Card, User } from "./entities/index.js";
import { CardRepository, TransactionRepository, UserRepository } from "./repository/index.js";
// selectors
let currentUser;
const signUpForm = document.querySelector(".signUp-form");
const signInForm = document.querySelector(".signIn-form");
const signUpBox = document.querySelector(".sign-up");
const signInBox = document.querySelector(".sign-in");
const registrationElm = document.querySelector(".registration");
const loginErrorText = document.querySelector(".signIn-error");
const signUpErrorText = document.querySelector(".signUp-error");
const signUpNow = document.querySelector(".signUp-text");
const signInNow = document.querySelector(".signIn-text");
const wrapper = document.querySelector("main");
const firstNameInp = document.querySelector(".firstName");
const lastNameInp = document.querySelector(".lastName");
const phoneNumberInp = document.querySelector(".phoneNumber");
const passWordInp = document.querySelector(".passWord");
const signInPhoneNumber = document.querySelector(".signInPhoneNumber");
const signInPassWord = document.querySelector(".signInPassWord");
const fullNameElm = document.querySelector(".fullName");
const cardsContainer = document.querySelector(".cards-container");
const backMainBtn = document.querySelector(".backMain");
const menuSection = document.querySelector(".menuSections");
const addCardForm = document.querySelector(".addCardForm");
const newCardNumber = document.querySelector("#newCardNumber");
const newCardExpiry = document.querySelector("#newCardExpiry");
const newCardPin = document.querySelector("#newCardPin");
const addCardSection = document.querySelector(".addCardSection");
const addCardBtn = document.querySelector(".addCard");
const userDataBase = new UserRepository();
const cardDataBase = new CardRepository();
const transactionService = new TransactionRepository();
// const user1 = new User("Mark", "Kent", "+9989965763421", "root123");
// const user2 = new User("Peter", "Parker", "+9989965763467", "root124");
// userService.add(user1, user2);
// const card1 = new Card("8600 1348 1111 2232", 2020, "13/24", "UZCARD", 100, user1.getId(), "TBC BANK");
// const card2 = new Card("8600 1348 1111 2212", 1220, "13/24", "HUMO", 100, user2.getId(), "TBC BANK");
// cardService.add(card1, card2);
let userRepo = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
let cardRepo = JSON.parse(localStorage.getItem("cards")) ? JSON.parse(localStorage.getItem("cards")) : [];
signUpNow.addEventListener("click", () => {
  signUpBox.classList.remove("disabled");
  signInBox.classList.add("disabled");
});
signInNow.addEventListener("click", () => {
  signInBox.classList.remove("disabled");
  signUpBox.classList.add("disabled");
});
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = firstNameInp.value;
  const lastName = lastNameInp.value;
  const phoneNumber = phoneNumberInp.value;
  const passWord = passWordInp.value;
  const user = new User(firstName, lastName, phoneNumber, passWord);
  try {
    userRepo.push(user);
    userDataBase.add(...userRepo);
    currentUser = user;
    localStorage.setItem("users", JSON.stringify(userRepo));
    setTimeout(() => {
      init(user);
    }, 500);
  } catch (error) {
    signUpErrorText.classList.remove("disabled");
    setTimeout(() => {
      signUpErrorText.classList.add("disabled");
      signUpForm.reset();
    }, 2000);
    console.log(error);
  }
});
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const phoneNumber = signInPhoneNumber.value;
  const passWord = signInPassWord.value;
  const user = userRepo.find((user) => user.phoneNumber === phoneNumber && user.passWord === passWord);
  console.log(user);
  if (user) {
    setTimeout(() => {
      currentUser = user;
      init(user);
    }, 500);
  } else {
    loginErrorText.classList.remove("disabled");
    setTimeout(() => loginErrorText.classList.add("disabled"), 2000);
  }
  signInForm.reset();
});
function mainPage() {
  registrationElm.style.display = "none";
  wrapper.classList.remove("disabled");
  menuSection.classList.add("disabled");
}
function init(user) {
  fullNameElm.textContent = `${user.firsName} ${user.lastName}`;
  if (cardDataBase.getList().length < 1) {
    for (let card of cardRepo) {
      cardDataBase.add(card);
      console.log("card", card);
    }
    createCard(cardDataBase);
  }
  console.log(cardDataBase.getList());
  if (cardDataBase.getList().length) {
    let cards = cardDataBase.getCardsByOwnerPhoneNumber(currentUser.phoneNumber);
    console.log(cards);
  }
  registrationElm.classList.add("disabled");
  wrapper.classList.remove("disabled");
  console.log(currentUser);
}
addCardBtn.addEventListener("click", () => {
  addCardSection.classList.remove("disabled");
  wrapper.classList.add("disabled");
});
// backMainBtn.addEventListener("click", mainPage);
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const card = new Card(newCardNumber.value, +newCardPin.value, newCardExpiry.value, "HUMO", 35000, currentUser.phoneNumber, "Agrobank");
  try {
    cardDataBase.add(card);
    cardRepo.push(card);
    localStorage.setItem("cards", JSON.stringify(cardRepo));
    createCard(cardDataBase);
    wrapper?.classList.remove("disabled");
    addCardSection?.classList.add("disabled");
  } catch (err) {
    console.log(err);
  }

  addCardForm.reset();
});
function createCard(cardBase) {
  const cardList = [];
  for (let card of cardBase.getList()) {
    if (card.ownerPhoneNumber === currentUser.phoneNumber) {
      cardList.push(card);
    }
  }
  for (let card of cardList) {
    let cardBox = document.createElement("div");
    cardBox.classList.add("card");
    cardBox.innerHTML = `
      <h2 class="ownerCard">${currentUser.firsName} ${currentUser.lastName}</h2>
      <div class="card-center">
        <img src="../assets/images/card-item.png" alt="" />
        <div class="card-balance">35000 so'm</div>
      </div>
      <h1 class="cardNumber">${card.cardNumber}</h1>
      <p class="cardExpiry">${card.expiry}</p>
    `;
    cardsContainer.appendChild(cardBox);
  }
}
// function transaction(senderCardNumber: string, receivedCardNumber: string, amount: number) {
//   const senderCard = cardService.getCardByCardNumber(senderCardNumber);
//   const receivedCard = cardService.getCard ByCardNumber(receivedCardNumber);
//   const senderName = userService.getById(senderCard.ownerId);
//   const receivedName = userService.getById(receivedCard.ownerId);
//   const transaction = new Transaction(senderCard, receivedCard, amount, senderName.getFullName(), receivedName.getFullName());
//   transactionService.add(transaction);
// }
// transaction("8600 1348 1111 2232", "8600 1348 1111 2212", 50);
// transaction("8600 1348 1111 2212", "8600 1348 1111 2232", 120);
// console.log("CARDS: ", cardService.getList());
// console.log(transactionService.getList());
// transactionService.getResult();
// transactionService.getTransactionsByCardNumber("8600 1348 1111 2232");
