class ToggleButton extends HTMLElement {
  #isHidden;
  #button;
  #infoEl;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
            display: none;
      }
      </style>
      <button>Show</button>
      <p id="info-box">
        <slot></slot>
      </p>
    `;

    //We can start querying the shadow DOM for elements in the constructor itself
    this.#button = this.shadowRoot.querySelector("button");
    this.#infoEl = this.shadowRoot.querySelector("p");

    this.#isHidden = true;
    console.log("Button elementin connectedCalleback ", this.#button);
    this.#button.addEventListener("click", () => {
      console.log("In  click listner on button with hidden ", this.#isHidden);
      if (this.#isHidden) {
        this.#infoEl.style.display = "block";
        this.#button.textContent = "Hide";
        this.#isHidden = false;
      } else {
        this.#infoEl.style.display = "none";
        this.#button.textContent = "Show";
        this.#isHidden = true;
      }
    });
  }
  connectedCallback() {
    if (this.hasAttribute("is-visible")) {
      if (this.getAttribute("is-visible") === "true") {
        this.#infoEl.style.display = "block";
        this.#button.textContent = "Hide";
        this.#isHidden = false;
      } else {
        this.#infoEl.style.display = "none";
        this.#button.textContent = "Show";
        this.#isHidden = true;
      }
    } else {
      this.#infoEl.style.display = "none";
      this.#button.textContent = "Show";
      this.#isHidden = true;
    }
  }
}

customElements.define("y-toggle-button", ToggleButton);
