customElements.define(
  "star-wars-planets",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
      return ["loading", "planets"];
    }
    get loading() {
      return JSON.parse(this.getAttribute("loading"));
    }
    set loading(v) {
      this.setAttribute("loading", JSON.stringify(v));
    }
    get planets() {
      return JSON.parse(this.getAttribute("planets"));
    }
    set planets(v) {
      this.setAttribute("planets", JSON.stringify(v));
    }
    async fetchPlanets(url) {
      this.loading = true;
      const response = await fetch(url);
      //console.log(response.text());
      //this.shadowRoot.innerHTML = response.text();
      //const json = await response.json();
      //this.planets = json;
      const tsv = await response.text();
      this.planets = tsv;
      this.loading = false;
    }
    async connectedCallback() {
      this.shadowRoot.addEventListener("click", (event) => {
        const name = event.srcElement.id;
        if (this[name]) {
          this[name]();
        }
      });
      //curl -L "https://docs.google.com/spreadsheets/d/1Cf87ns_40CCY43nEVmsyEz78k7hV47t_5oP9N8gSEhI/export?gid=0&format=tsv" > movies.tsv
      //curl -L "https://docs.google.com/spreadsheets/d/1Cf87ns_40CCY43nEVmsyEz78k7hV47t_5oP9N8gSEhI/export?gid=0&format=tsv" > movies.tsv
      //curl -L "https://docs.google.com/spreadsheets/d/1o9DD-MQ0WkrYaEFTD5rF_NtyL8aUISgURsAXSL7Budk/export?gid=0&format=tsv"

      // https://docs.google.com/spreadsheets/d/1o9DD-MQ0WkrYaEFTD5rF_NtyL8aUISgURsAXSL7Budk/edit?usp=sharing
      await this.fetchPlanets(
        //"https://docs.google.com/spreadsheets/d/1o9DD-MQ0WkrYaEFTD5rF_NtyL8aUISgURsAXSL7Budk/export?gid=0&format=tsv"
        //"http://localhost:9080/micro/resources/message"
        //"http://localhost:7080/micro/resources/message"
        config.url
      );
    }
    disconnectedCallback() {}
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }
    next() {
      this.fetchPlanets(this.planets.next);
    }
    previous() {
      this.fetchPlanets(this.planets.previous);
    }
    renderPrevious() {
      if (this.planets.previous) {
        return `<div id="previous">Previous</div>`;
      } else {
        return `<div>No previous planets.</div>`;
      }
    }
    renderNext() {
      if (this.planets.next) {
        return `<div id="next">Next</div>`;
      } else {
        return `<div>No more planets.</div>`;
      }
    }
    render() {
      if (this.loading) {
        this.shadowRoot.innerHTML = `Loading...`;
      } else {
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.innerHTML += `
	   <table border=1>
	   <tr><td>foo </td> </tr>`;
        for (i = 0; i < 5; i++) {
          this.shadowRoot.innerHTML += `<tr><td>${i}</td></tr>`;
        }
        this.shadowRoot.innerHTML += `</table>`;
        this.shadowRoot.innerHTML += "<hr>";
        this.shadowRoot.innerHTML += "GitHub Timezone Chat Installation<br>";
        this.shadowRoot.innerHTML += "<hr>";
        //console.log(this.planets);
        var data = this.planets;
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
          //          var matrixUrl = y[3];
          var tzFromInstallation = tz == undefined ? "" : tz;
          var tzFinal = tzOverride == "" ? tzFromInstallation : tzOverride;
          //var tzFromInstallation = tz;
          var hostname = y[3];
          var hostnameFinal = '<a href="' + hostname + '">' + hostname + "</a>";
          //this.shadowRoot.innerHTML += name + tzfinal + ' <a href="'+ matrixUrl + '">' + matrixName + '</a>' + "<br>";
          //this.shadowRoot.innerHTML += '<a href="https://github.com/' + name +  '">' + name + '</a>' + tzfinal + ' <a href="'+ matrixUrl + '">' + matrixName + '</a>' + "<br>";
          //                this.shadowRoot.innerHTML += '<img src="https://avatars.githubusercontent.com/' + name + '?v=4" width=30>' + '<a href="https://github.com/' + name + '">' + name + "</a>" + tzfinal + ' <a href="' + matrixUrl + '">' + matrixName + "</a> " + hostnameFinal + "<br>";
          var aRow = {};
          aRow.github = name;
          aRow.hostname = hostname;
          aRow.matrix = matrix;
          //aRow.tz = tz;
          aRow.tz = tzFinal;

          rows.push(aRow);
        }

        this.shadowRoot.innerHTML = `
          <span>
            <h3><slot name="title">Star Wars Planets</slot></h3>
	 <!--
            ${this.renderPrevious()}
            ${this.renderNext()}
	 -->
            <table>
              <tr align="left">
                <th></th>
                <th>GitHub</th>
                <th>Installation</th>
                <th>Matrix</th>
                <th>Timezone</th>
              </tr>
              ${rows
                .map((planet) => {
                  return `
<tr>
<td><img src="https://avatars.githubusercontent.com/${planet.github}?v=4" width=21></td>
<td><a href="https://github.com/${planet.github}">${planet.github}</a></td>
<td><a href="http://${planet.hostname}">${planet.hostname}</a></td>
<td><a href="https://view.matrix.org/room/!AmypvmJtUjBesRrnLM:matrix.org/members/${planet.matrix}">${
                    planet.matrix.split(":")[0]
                  }</a></td>
<td>${planet.tz}</td>
</tr>
              `;
                })
                .join("")}
            </table>
          </span>
        `;
      }

      /*
          this.shadowRoot.innerHTML = `
          <span>
            <h3><slot name="title">Star Wars Planets</slot></h3>
            <div>Count: ${this.planets.installations.length}</div>
	 <!--
            ${this.renderPrevious()}
            ${this.renderNext()}
	 -->
            <table border=1>
              <tr>
                <th>Name</th>
                <th>Hostname</th>
                <th>Country</th>
                <th>Launched</th>
                <th>About</th>
                <th>Contact</th>
              </tr>
              ${this.planets.installations.map((planet) => {
              return `
                  <tr>
            <td>${planet.name}</td>
            <td>${planet.hostname}</td>
            <td>${planet.country}</td>
            <td>${planet.launch_year}</td>
            <td>${planet.about_url == undefined ? "UNKNOWN" : planet.about_url}</td>
            <td>${planet.contact_email == undefined ? "UNKNOWN" : planet.contact_email}</td>
          </tr>
              `;
            }).join("")}
            </table>
          </span>
        `;
	  */
    }
  }
);
