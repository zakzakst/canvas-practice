export default class MyDialog extends HTMLDialogElement {
  i: string;
  constructor() {
    super();
    this.render();
  }

  render(): void {
    this.i = `MyDialog`;
    this.dataset.i = this.i;

    if (!document.getElementById(this.i)) {
      let styleEl = document.createElement("style");
      styleEl.id = this.i;
      styleEl.innerHTML = `
        [data-i="${this.i}"] > p {
          background: #f00;
        }
      `
        .replace(/\s\s+/g, "")
        .trim();
      document.head.appendChild(styleEl);
    }
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  console.log("test");
  customElements.define("my-dialog", MyDialog, { extends: "dialog" });
}
