document.addEventListener('DOMContentLoaded', function() {
  populate_cards();
});

async function populate_cards() {
  const url =
    //'/people.tsv';
    'https://docs.google.com/spreadsheets/d/1o9DD-MQ0WkrYaEFTD5rF_NtyL8aUISgURsAXSL7Budk/export?gid=0&format=tsv';
  const videoTemplate = document.getElementById('video-template');
  var count = 0;
  fetch(url)
    .then(response => response.text())
    .then(data => {
      var x = data.split('\n');
      //for (var i = 1; i < 11; i++) {
      for (var i = 1; i < x.length; i++) {
        y = x[i].split('\t');
        if (count < 2) {
          console.log(y);
        }
        x[i] = y;
        githubUsername = y[0];
        //date = y[0];
        speaker = y[0];
        tz = y[1];
        //title = y[2];
        matrix = y[2];
        //host = y[3];
        pinst = y[3];
        //description = y[3];
        //yurl = '';
        //yid = y[4];
        //alt = y[5];
        //ystart = y[10];
        //defaultImage = y[13];
        //defaultImage = "";
        //githubUsername = y[14];
        //githubUsername = "";
        /*
        if (yid === '') {
          yurl = alt;
        } else {
          if (ystart === '') {
            yurl = 'https://www.youtube.com/watch?v=' + yid;
          } else {
            yurl = 'https://www.youtube.com/watch?v=' + yid + '&t=' + ystart + 's';
          }
        }
        */
        //slides = y[6];
        const videoInstance = document.importNode(videoTemplate.content, true);
        //videoInstance.querySelector('.title').innerHTML = title;
        //videoInstance.querySelector('.speaker').innerHTML = speaker;
        videoInstance.querySelector('.speaker').innerHTML = '';
        //videoInstance.querySelector('.description').innerHTML = description;
        //videoInstance.querySelector('.date').innerHTML = githubUsername;
        videoInstance.querySelector('.github-username').innerHTML = githubUsername;
        //videoInstance.querySelector('.title-href').setAttribute('href', yurl);
        //videoInstance.querySelector('.title-href').setAttribute('target', '_blank');
        //videoInstance.querySelector('.video-image-link').setAttribute('href', yurl);
        //videoInstance.querySelector('.video-image-link').setAttribute('target', '_blank');
        var yimg = 'https://github.com/' + githubUsername + '.png';
        videoInstance.querySelector('.imagesrc').setAttribute('src', yimg);
        if (matrix === '') {
          videoInstance.querySelector('.matrix').innerHTML = '';
        } else {
          // strip leading @ and host (just show username)
          videoInstance.querySelector('.matrix-username').innerHTML = matrix.split(":")[0].substring(1);
          //videoInstance.querySelector('.matrix-username').innerHTML = matrix;
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
        /*
        if (host === '') {
          videoInstance.querySelectorAll('.slides-link').forEach(e => e.parentNode.removeChild(e));
        } else {
          hostUrl = 'http://' + host;
          videoInstance.querySelector('.slides-href').setAttribute('href', hostUrl);
          videoInstance.querySelector('.slides-href').setAttribute('target', '_blank');
          videoInstance.querySelector('.slides-text').innerHTML = host;
        }
        */
        /*
        */
        // Append the instance to the DOM
        document.getElementById('videos').appendChild(videoInstance);
        count++;
      }
    });
}
