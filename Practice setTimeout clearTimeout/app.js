class App {
  static init() {
    var timeoutId;
    var intervalId;
    console.log("Hi");
    const button1 = document.getElementById("1");
    button1.addEventListener("click", startScriptThatTriggersTimeout);
    const button2 = document.getElementById("2");
    button2.addEventListener("click", clearExistingTimeout);
    const button3 = document.getElementById("3");
    button3.addEventListener("click", startScriptThatTriggersInterval);
    const button4 = document.getElementById("4");
    button4.addEventListener("click", clearExistingInterval);

    function startScriptThatTriggersTimeout() {
      console.log("Hello");
      timeoutId = setTimeout(() => {
        console.log("My name is Yogi");
      }, 5000);
      console.log("Timeout created for 5 seconds with id ", timeoutId)
      console.log("Bye");
    }
  
    function clearExistingTimeout() {
      console.log("Stopping timer associated with id ", timeoutId)
      clearTimeout(timeoutId);
    }
    
    function startScriptThatTriggersInterval() {
      console.log("Hello");
      intervalId = setInterval(() => {
        console.log("My name is Yogi");
      }, 2000);
      console.log("Interval created for 2 seconds with id ", intervalId)
      console.log("Bye");
    }
  
    function clearExistingInterval() {
      console.log("Stopping interval associated with id ", intervalId)
      clearInterval(intervalId);
    }
  }
}

App.init();
