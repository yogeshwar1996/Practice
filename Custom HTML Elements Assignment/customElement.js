class ToggleButton extends HTMLElement {
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
    const button = this.shadowRoot.querySelector("button");
    const infoEl = this.shadowRoot.querySelector("p");

    let isHidden = true;
    console.log("Button elementin connectedCalleback ", button);
    button.addEventListener("click", () => {
      console.log("In  click listner on button with hidden ", isHidden);
      if (isHidden) {
        infoEl.style.display = "block";
        button.textContent = "Hide";
        isHidden = false;
      } else {
        infoEl.style.display = "none";
        button.textContent = "Show";
        isHidden = true;
      }
    });
  }
}

customElements.define("y-toggle-button", ToggleButton);
