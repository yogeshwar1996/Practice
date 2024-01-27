class Tooltip extends HTMLElement {
  #tooltipContainer;
  #tooltipText;
  constructor() {
    //Following will call the constructor of the parent class
    super();
    // Initialize the tooltip text
    this.#tooltipText = "Some dummy tooltip text";

    /*Attach shadow DOM to the custom element so that the styles of the custom element
      do not leak to the parent DOM and vice versa
      Note we can also access and use shadow DOM as its just an abstract layer so we need
      to wait the for the element to be rendered to real DOM*/
    this.attachShadow({ mode: "open" });

    /* Here we are fetching the template tag and adding it to the shadow dom
       Note we not need to do this when we can define innerHTML of the shadow dom*/
    // const template = document.querySelector("#tooltip-template");
    // this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.innerHTML = `
      <style>
        div {
            background-color: black;
            color: white;
            position: absolute;
            z-index: 10;
        }
      </style>
      <span> (?)</span>
      <slot>
          What we write in the slot tag is the fallback text if the custom
          element is empty i.e nothing between the opening and closing tag of the
          custom element
      </slot>`;
    /*Now one important thing, you might wonder how can I set the HTML content here inside my constructor?
      The reason is simple, innerHTML is just a property of our element here, of our object and this
      is just setting up some HTML code that will be rendered to to DOM once this element is mounted
      to the DOM.
      So unlike append child, this does not try to access the DOM at this point, it just prepares some content
      for the DOM once it later is available and the browser will take care about rendering this when it is
      able to.*/
  }

  connectedCallback() {
    // Upon connecting to the DOM
    // Check if the element has a text attribute then use it
    if (this.hasAttribute("text")) {
      this.#tooltipText = this.getAttribute("text");
    }

    // Here we create a span element and add the text to it
    // const tooltipIcon = document.createElement("span");
    // tooltipIcon.textContent = "(?)";
    /* Doing everything in Js can be cumbersome so we will use templates for this */
    const tooltipIcon = this.shadowRoot.querySelector("span");

    tooltipIcon.addEventListener("mouseenter", this.#showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this.#hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative"; // This is to limit the tooltip to the custom element's width
  }
  //Private method
  #showTooltip() {
    this.#tooltipContainer = document.createElement("div");
    this.#tooltipContainer.textContent = this.#tooltipText;
    // Styling the tooltip ,
    /*We can rid of this and add it to the style element in the shadow dom innerHTML */
    // this.#tooltipContainer.style.backgroundColor = "black";
    // this.#tooltipContainer.style.color = "white";
    // this.#tooltipContainer.style.position = "absolute";
    // this.#tooltipContainer.style.zIndex = "10";

    this.shadowRoot.appendChild(this.#tooltipContainer);
  }

  //Private method
  #hideTooltip() {
    this.shadowRoot.removeChild(this.#tooltipContainer);
  }
}

/*Following line is used to register the custom element
name of the custom element should be made of two words separated by a hyphen*/
customElements.define("y-tooltip", Tooltip);
