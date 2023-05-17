import { User } from "./entities/index.js";
import { CardRepository, TransactionRepository, UserRepository } from "./repository/index.js";
const userDataBase = [];
const constDataBase = [];
// selectors
const signUpForm = document.querySelector(".signUp-form");
const signUpElm = document.querySelector(".sign-up");
const signInElm = document.querySelector(".sign-in");
const registrationElm = document.querySelector(".registration");
const loginError = document.querySelector(".login-error");
const signUpError = document.querySelector(".signUp-error");
const wrapper = document.querySelector("main");
const firstNameInp = document.querySelector(".firstName");
const lastNameInp = document.querySelector(".lastName");
const phoneNumberInp = document.querySelector(".phoneNumber");
const passWordInp = document.querySelector(".passWord");
const fullNameElm = document.querySelector(".fullName");
const userService = new UserRepository();
const cardService = new CardRepository();
const transactionService = new TransactionRepository();
// const user1 = new User("Mark", "Kent", "+9989965763421", "root123");
// const user2 = new User("Peter", "Parker", "+9989965763467", "root124");
// userService.add(user1, user2);
// const card1 = new Card("8600 1348 1111 2232", 2020, "13/24", "UZCARD", 100, user1.getId(), "TBC BANK");
// const card2 = new Card("8600 1348 1111 2212", 1220, "13/24", "HUMO", 100, user2.getId(), "TBC BANK");
// cardService.add(card1, card2);
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = firstNameInp.value;
  const lastName = lastNameInp.value;
  const phoneNumber = phoneNumberInp.value;
  const passWord = passWordInp.value;
  const user = new User(firstName, lastName, phoneNumber, passWord);
  try {
    userDataBase.push(user);
    console.log(userDataBase);
    userService.add(...userDataBase);
    fullNameElm.textContent = user.getFullName();
    signUpElm.classList.add("disabled-signUp");
    signInElm.style.display = "block";
  } catch (error) {
    signUpError.classList.remove("disabled");
    setTimeout(() => {
      signUpError.classList.add("disabled");
    }, 2000);
    console.log(error);
  }
});
signInElm.addEventListener("submit", (e) => {
  e.preventDefault();
  const phoneNumber = phoneNumberInp.value;
  const passWord = passWordInp.value;
  const user = userDataBase.find((user) => user.phoneNumber === phoneNumber && user.passWord === passWord);
  console.log("user", user);
  console.log(userDataBase);
  if (user) {
    setTimeout(() => {
      mainPage();
    }, 1000);
  } else {
    loginError.classList.remove("disabled");
    setTimeout(() => loginError.classList.add("disabled"), 2000);
  }
  // user?.phoneNumber = "";
  // user?.passWord = "";
});
function mainPage() {
  registrationElm.style.display = "none";
  wrapper.classList.remove("disabled");
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
