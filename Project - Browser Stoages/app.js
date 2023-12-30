const storeBtnLocal = document.getElementById("store-btn-local");
const retrBtnLocal = document.getElementById("retrieve-btn-local");
const storeBtnSession = document.getElementById("store-btn-session");
const retrBtnSession = document.getElementById("retrieve-btn-session");
const storeBtnCookie = document.getElementById("store-btn-cookie");
const retrBtnCookie = document.getElementById("retrieve-btn-cookie");
const storeBtnIndexedDb = document.getElementById("store-btn-indexdb");
const retrBtnIndexedDb = document.getElementById("retrieve-btn-indexdb");

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

storeBtnIndexedDb.addEventListener("click", () => {
  //Open or Create db on the indexedDB as follows
  let dbRequest = indexedDB.open("StorageDummy", 1);

  //when db is being created and you need to interact with it by adding listner to onupgradeneeded event
  dbRequest.onupgradeneeded = function (event) {
    //using event we can access the database
    let db = event.target.result;

    /* now we can create objectStore which is analogous to tables
     db.createObjectStore(<name>, <config for store where you can mention key which uniquely identifies each record>);
     */
    db.createObjectStore("products", { keyPath: "id" });
  };

  // Now interact with db once its created for example to add data to objectStore we can do the following in onsuccess callback
  dbRequest.onsuccess = function (event) {
    // Get db instance from the event
    let db = event.target.result;

    // Initiate a transaction on db by giving the objectStore name and mentioning how you want to transact
    const transaction = db.transaction("products", "readwrite");

    //Once you have a transaction get the objectStore
    const productStore = transaction.objectStore("products");

    //Then we add the record as a dict to the objectStore as shown below
    const record = {
      id: "p2",
      title: "A sexond product",
      price: 15.99,
      tags: ["Expensive", "Luxury"],
    };
    productStore.add(record);
  };

  dbRequest.onerror = function (event) {
    conso;
  };
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
  data = {};
  a = document.cookie.split(";");
  b = a.map((i) => i.trim());
  c = b.map((j) => j.split("="));
  c.map((k) => (data[k[0]] = k[1]));
  console.log("Cookie data dict is ", data);
});
retrBtnIndexedDb.addEventListener("click", () => {});
