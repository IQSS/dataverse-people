const template = document.createElement("template");
template.innerHTML = `
<style>
  .user-card {
    font-family: 'Arial', sans-serif;
    background: #f4f4f4;
    width: 155px;
    margin-bottom: 15px;
    border-bottom: coral 0px solid;
    margin-left: 2px;
    margin-right: 2px;
  }
  .user-card button {
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .user-card h3 {
    padding: 0px;
    margin: 0px;
  }
  .user-avatar {
    width: 100%;
    border-radius: 30px;
  }
  .github-foo {
    width: 30px;
    text-align: left;
  }
  .matrix-foo {
    width: 10px;
  }
</style>
<div class="user-card">
  <img class="user-avatar" loading="lazy" />
  <div>
        <h3></h3>
    <div class="info">
      <div>
        <img src="images/github.svg" style="vertical-align:middle" width="25px" />
        <span><slot name="github"></span>
      </div>
      <div>
        <img src="images/matrix.svg" style="vertical-align:middle" width="25px" />
        <span style=""><slot name="matrix"></span>
      </div>
      <div><span style="font-size: smaller;"><slot name="installation"></span></div>
      <div style="font-size: smaller;">TZ: <span style=""><slot name="timezone"></span></div>
    </div>
    <div class="sweets" style="display: none;"><span style=""><slot name="sweets"></span></div>
    <button id="toggle-info" style="display: block;">More...</button>
  </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.showInfo = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    //this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }
  toggleInfo() {
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector(".sweets");
    const toggleBtn = this.shadowRoot.querySelector("#toggle-info");
    if (this.showInfo) {
      info.style.display = "block";
      toggleBtn.innerText = "Less...";
    } else {
      info.style.display = "none";
      toggleBtn.innerText = "More...";
    }
  }
  connectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").addEventListener("click", () => this.toggleInfo());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener("click", () => this.toggleInfo());
  }
}
window.customElements.define("user-card", UserCard);
