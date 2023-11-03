class App {
  static init() {
    var timerId;
    console.log("Hi");
    const button1 = document.getElementById("1");
    button1.addEventListener("click", startScriptThatTriggersTimeout);
    const button2 = document.getElementById("2");
    button2.addEventListener("click", clearExistingTimeout);

    function startScriptThatTriggersTimeout() {
      console.log("Hello");
      timerId = setTimeout(() => {
        console.log("My name is Yogi");
      }, 5000);
      console.log("Time created for 5 seconds with id ", timerId)
      console.log("Bye");
    }
  
    function clearExistingTimeout() {
      console.log("Stopping timer associated with id ", timerId)
      clearTimeout(timerId);
    }
  }
}

App.init();
