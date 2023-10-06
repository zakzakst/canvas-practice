export default class Grid extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Grid-${[this.min, this.space].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement("style");
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            grid-gap: ${this.space};
          }
          @supports (width: min(${this.min}, 100%)) {
            [data-i="${this.i}"] {
              grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
            }
          }
        `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }

  get min() {
    return this.getAttribute("min") || "250px";
  }

  set min(val) {
    return this.setAttribute("min", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  static get observedAttributes() {
    return ["min", "space"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("grid-l", Grid);
}
