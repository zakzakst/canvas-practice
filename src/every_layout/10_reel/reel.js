export default class Reel extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Reel-${[
        this.itemWidth,
        this.clientHeight,
        this.namespaceURI,
        this.noBar,
      ].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement("style");
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            height: ${this.height};
          }
          [data-i="${this.i}"] > * {
            flex: 0 0 ${this.itemWidth};
          }
          [data-i="${this.i}"] > img {
            height: 100%;
            flex-basis: auto;
            width: auto;
          }
          [data-i="${this.i}"] > * + * {
            margin-inline-start: ${this.space};
          }
          [data-i="${this.i}"].overflowing {
            ${!this.noBar ? `padding-bottom: ${this.space};` : ""}
          }
          ${
            this.noBar
              ? `
              [data-i="${this.i}"] {
                scrollbar-width: none;
              }
              [data-i="${this.i}"]::-webkit-scrollbar {
                display: none;
              }
            `
              : ""
          }
        `
          .replace(/\s\s+/g, " ")
          .trim();
        document.head.appendChild(styleEl);
      }
    };
  }

  toggleOverflowClass(elem) {
    elem.classList.toggle("overflowing", this.scrollWidth > this.clientWidth);
  }

  get itemWidth() {
    return this.getAttribute("itemWidth") || "auto";
  }

  set itemWidth(val) {
    return this.setAttribute("itemWidth", val);
  }

  get height() {
    return this.getAttribute("height") || "auto";
  }

  set height(val) {
    return this.setAttribute("height", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s0)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  get noBar() {
    return this.hasAttribute("noBar");
  }

  set noBar(val) {
    if (val) {
      this.setAttribute("noBar", "");
    } else {
      this.removeAttribute("noBar");
    }
  }

  static get observedAttributes() {
    return ["itemWidth", "height", "space", "noBar"];
  }

  connectedCallback() {
    this.render();
    if ("ResizeObserver" in window) {
      new ResizeObserver((entries) => {
        this.toggleOverflowClass(entries[0].target);
      }).observe(this);
    }
    if ("MutationObserver" in window) {
      new MutationObserver((entries) => {
        this.toggleOverflowClass(entries[0].target);
      }).observe(this, { childList: true });
    }
  }

  attributeChangeCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("reel-l", Reel);
}
