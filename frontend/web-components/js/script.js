document.addEventListener('DOMContentLoaded', function() {
  populate_cards();
});

async function populate_cards() {
  const url =
    'https://docs.google.com/spreadsheets/d/1o9DD-MQ0WkrYaEFTD5rF_NtyL8aUISgURsAXSL7Budk/export?gid=0&format=tsv';
  const videoTemplate = document.getElementById('video-template');
  var count = 0;
  fetch(url)
    .then(response => response.text())
    .then(data => {
      var x = data.split('\n');
      for (var i = 1; i < x.length; i++) {
        y = x[i].split('\t');
        if (count < 2) {
          console.log(y);
        }
        x[i] = y;
        githubUsername = y[0];
        speaker = y[0];
        tz = y[1];
        matrix = y[2];
        pinst = y[3];
        const videoInstance = document.importNode(videoTemplate.content, true);
        videoInstance.querySelector('.speaker').innerHTML = '';
        videoInstance.querySelector('.github-username').innerHTML = githubUsername;
        var yimg = 'https://github.com/' + githubUsername + '.png';
        videoInstance.querySelector('.imagesrc').setAttribute('src', yimg);
        var ghUrl = 'https://github.com/' + githubUsername;
        videoInstance.querySelector('.github-href').setAttribute('href', ghUrl);
        videoInstance.querySelector('.github-href').setAttribute('target', '_blank');
        if (matrix === '') {
          videoInstance.querySelector('.matrix').innerHTML = '';
        } else {
          matrixUrl = 'https://view.matrix.org/room/!AmypvmJtUjBesRrnLM:matrix.org/members/' + matrix;
          videoInstance.querySelector('.matrix-href').setAttribute('href', matrixUrl);
          videoInstance.querySelector('.matrix-href').setAttribute('target', '_blank');
          // strip leading @ and host (just show username)
          videoInstance.querySelector('.matrix-username').innerHTML = matrix.split(":")[0].substring(1);
        }
        if (tz === '') {
          videoInstance.querySelector('.tz').innerHTML = '';
        } else {
          videoInstance.querySelector('.tz-text').innerHTML = tz;
        }
        if (pinst === '') {
          videoInstance.querySelector('.pinst').innerHTML = '';
        } else {
          pinstUrl = 'http://' + pinst;
          videoInstance.querySelector('.pinst-href').setAttribute('href', pinstUrl);
          videoInstance.querySelector('.pinst-href').setAttribute('target', '_blank');
          videoInstance.querySelector('.pinst-fqdn').innerHTML = pinst;
        }
        // Append the instance to the DOM
        document.getElementById('videos').appendChild(videoInstance);
        count++;
      }
    });
}
