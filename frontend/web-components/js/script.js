document.addEventListener("DOMContentLoaded", function() {
  populate_cards();
});

async function populate_cards() {
  let response = await fetch(config.url);
  if (response.status === 200) {
    let data = await response.text();
    var x = data.split("\n");
    console.log("length: " + x.length);
    var rows = [];
    // i=1 to skip header row
    for (var i = 1; i < x.length; i++) {
      var y = x[i].split("\t");
      x[i] = y;
      var name = y[0];
      var github = y[0];
      var tzOverride = y[1];
      var tz = y[12];
      var tzFromInstallation = tz == undefined ? "" : tz;
      var tzFinal = tzOverride == "" ? tzFromInstallation : tzOverride;
      var matrix = y[2];
      var installation = y[3];
      var sweets = y[4];
      document.getElementById("people").innerHTML += `
<user-card name="${name}" avatar="https://avatars.githubusercontent.com/${github}?v=4">
  <span slot="github"><a href="https://github.com/${github}">${github}</a></span>
  <span slot="matrix"><a href="https://view.matrix.org/room/!AmypvmJtUjBesRrnLM:matrix.org/members/${matrix}">${
        matrix.length > 0 ? matrix.split(":")[0].substring(1) : ""
      }</a></span>
  <span slot="timezone">${tzFinal}</span>
  <span slot="installation"><a href="http://${installation}">${installation}</a></span>
  <span slot="sweets">${sweets.length > 0 ? "Sweets: " + sweets : ""}</a></span>
</user-card>
`;
    }
  }
}
