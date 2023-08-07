export default class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      // TODO: props的な使い方しようとすると下記エラーが発生する
      // Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.
      const template = document.getElementById("component-template");
      const component = template.content.cloneNode(true);
      const styleEl = component.querySelector("style");
      styleEl.innerHTML += `
        ${this.color ? `p { color: ${this.color}; }` : ""}
      `;

      const shadowRoot = this.attachShadow({ mode: "closed" });
      shadowRoot.appendChild(component);
    };
  }

  get color() {
    return this.getAttribute("color") || null;
  }

  set color(val) {
    return this.setAttribute("color", val);
  }

  static get observedAttributes() {
    return ["color"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("my-component", MyComponent);
}
