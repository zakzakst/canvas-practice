// エラーが出て下記対応しようとしたけど上手くできなかった
// https://qiita.com/jimbo/items/d17a121f815236c2f55b
class ShowHello extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<p>Hello, ${this.getAttribute("name")}</p>`;
  }
}

customElements.define("show-hello", ShowHello);
