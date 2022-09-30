// inspired by https://gist.github.com/richard-flosi/b6cdba782576447fcc9789f6cdfe2e31
customElements.define(
  "people-table",
  class extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({ mode: "open" });
      // https://stackoverflow.com/questions/54253300/using-bootstrap-template-with-vanilla-web-components/54257126#54257126
      shadow.innerHTML = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">`;
    }
    static get observedAttributes() {
      return ["loading", "people"];
    }
    get loading() {
      return JSON.parse(this.getAttribute("loading"));
    }
    set loading(v) {
      this.setAttribute("loading", JSON.stringify(v));
    }
    get people() {
      return JSON.parse(this.getAttribute("people"));
    }
    set people(v) {
      this.setAttribute("people", JSON.stringify(v));
    }
    async fetchPeople(url) {
      this.loading = true;
      const response = await fetch(url);
      const tsv = await response.text();
      this.people = tsv;
      this.loading = false;
    }
    async connectedCallback() {
      this.shadowRoot.addEventListener("click", (event) => {
        const name = event.srcElement.id;
        if (this[name]) {
          this[name]();
        }
      });
      await this.fetchPeople(
        config.url
      );
    }
    disconnectedCallback() {}
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }
    render() {
      if (this.loading) {
        //this.shadowRoot.innerHTML = `Loading...`;
      } else {
        var data = this.people;
        var x = data.split("\n");
        console.log("length: " + x.length);
        var rows = [];
        // i=1 to skip header row
        for (var i = 1; i < x.length; i++) {
          var y = x[i].split("\t");
          console.log("y: " + y);
          x[i] = y;
          var name = y[0];
          console.log(name);
          var tzOverride = y[1];
          var tz = y[11];
          var matrix = y[2];
          var tzFromInstallation = tz == undefined ? "" : tz;
          var tzFinal = tzOverride == "" ? tzFromInstallation : tzOverride;
          var hostname = y[3];
          var hostnameFinal = '<a href="' + hostname + '">' + hostname + "</a>";
          var aRow = {};
          aRow.github = name;
          aRow.hostname = hostname;
          aRow.matrix = matrix;
          aRow.tz = tzFinal;
          rows.push(aRow);
        }

        this.shadowRoot.innerHTML += `
          <span>
            <div class="p-3 container">
            <div class="p-5 mb-4 bg-light rounded-3 container">
            <h3><slot name="title"></slot></h3>
            <div class="table-responsive">
            <!-- line height 24px added to match React-Bootstrap -->
            <table class="table" style="line-height: 24px;">
              <tr align="left">
                <th></th>
                <th>GitHub</th>
                <th>Installation</th>
                <th>Matrix</th>
                <th>Timezone</th>
              </tr>
              ${rows
                .map((person) => {
                  return `
<tr>
<td><img src="https://avatars.githubusercontent.com/${person.github}?v=4" width=21></td>
<td><a href="https://github.com/${person.github}">${person.github}</a></td>
<td><a href="http://${person.hostname}">${person.hostname}</a></td>
<td><a href="https://view.matrix.org/room/!AmypvmJtUjBesRrnLM:matrix.org/members/${person.matrix}">${
                    person.matrix.split(":")[0]
                  }</a></td>
<td>${person.tz}</td>
</tr>
              `;
                })
                .join("")}
            </table>
            </div>
            </div>
            </div>
          </span>
        `;
      }
    }
  }
);
