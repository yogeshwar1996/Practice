const storeBtnLocal = document.getElementById("store-btn-local");
const retrBtnLocal = document.getElementById("retrieve-btn-local");
const storeBtnSession = document.getElementById("store-btn-session");
const retrBtnSession = document.getElementById("retrieve-btn-session");
const storeBtnCookie = document.getElementById("store-btn-cookie");
const retrBtnCookie = document.getElementById("retrieve-btn-cookie");

const userId = 123;
const userDetails = {
  name: "Yogeshwar",
  id: 123,
  sports: ["Hockey", "Badminton"],
};

storeBtnLocal.addEventListener("click", () => {
  localStorage.setItem("uid", userId);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
});

storeBtnSession.addEventListener("click", () => {
  sessionStorage.setItem("uid", userId);
  sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
});

storeBtnCookie.addEventListener("click", () => {
  document.cookie = `uid=${userId}`;
  document.cookie = `userDetails=${JSON.stringify(userDetails)}`;
});

retrBtnLocal.addEventListener("click", () => {
  const uid = localStorage.getItem("uid");
  if (uid) console.log("User id  from local storage", uid);
  else console.log("User id not found");
  const udetails = localStorage.getItem("userDetails");
  console.log("User deails from local storage ", udetails);
});

retrBtnSession.addEventListener("click", () => {
  const uid = sessionStorage.getItem("uid");
  if (uid) console.log("User id from session", uid);
  else console.log("User id not found");
  const udetails = sessionStorage.getItem("userDetails");
  console.log("User deails from session storage ", udetails);
});
retrBtnCookie.addEventListener("click", () => {
  console.log("Accessing cookies ", document.cookie);
});
