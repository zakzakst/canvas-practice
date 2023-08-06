export default class Switcher extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Switcher-${[this.threshold, this.namespaceURI, this.limit].join(
        ""
      )}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement("style");
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            gap: ${this.space};
          }
          [data-i="${this.i}"] > * {
            flex-basis: calc((${this.threshold} - 100%) * 999);
          }
          [data-i="${this.i}"] > :nth-last-child(n+${parseInt(this.limit) + 1}),
          [data-i="${this.i}"] > :nth-last-child(n+${
          parseInt(this.limit) + 1
        }) ~ * {
            flex-basis: 100%;
          }
        `
          .replace(/\s\s+/g, " ")
          .trim();
        document.head.appendChild(styleEl);
      }
    };
  }

  get threshold() {
    return this.getAttribute("threshold") || "var(--measure)";
  }

  set threshold(val) {
    return this.setAttribute("threshold", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  get limit() {
    return this.getAttribute("limit") || "5";
  }

  set limit(val) {
    return this.setAttribute("limit", val);
  }

  static get observedAttributes() {
    return ["threshold", "space", "limit"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("switcher-l", Switcher);
}
