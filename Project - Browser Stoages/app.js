const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");
const userId = 123;

storeBtn.addEventListener("click", () => {
  localStorage.setItem("uid", userId);
});
retrBtn.addEventListener("click", () => {
  const uid = localStorage.getItem("uid");
  if (uid) console.log("User id ", uid);
  else console.log("User id not found");
});
