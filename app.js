if (location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}

var alertbox = document.getElementById("alerts");

function alert(message, type) {
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  alertbox.append(wrapper);
}

function removeAlerts() {
  setTimeout(function () {
    alertbox.innerHTML = "";
  }, 5000);
}

// paste button functionality
document
  .getElementById("inputpastebutton")
  .addEventListener("click", function () {
    navigator.clipboard
      .readText()
      .then((text) => {
        document.getElementById("basic-url").value = text;
      })
      .catch((err) => {
        //     console.error('Failed to read clipboard contents: ', err);
      });
  });

// get stats button functionality
document.getElementById("getstats").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("btnload").style.visibility = "visible";

  // processing video url
  var vidurl = document.getElementById("basic-url").value;

  // deciding it short or full link
  if (vidurl.includes("watch?v=")) {
    var vidid = vidurl.split("watch?v=")[1];

    console.log(vidid);
  } else if (vidurl.includes("youtu.be")) {
    var vidid = vidurl.split("youtu.be/")[1];
    console.log(vidid);
  } else {
    alert("Please enter a valid YouTube video url", "warning");
    document.getElementById("btnload").style.visibility = "hidden";
    removeAlerts();
    return;
  }

  var url = `https://ytdislike.herokuapp.com/dislike?id=${vidid}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var datepublished = new Date(data.snippet.publishedAt);
      data.snippet.publishedAt;

      document.getElementById("vidinfo").innerHTML = `



      <div class="card mb-3" ">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${data.snippet.thumbnails.standard.url}" class="img-fluid rounded-start" alt="${data.snippet.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${data.snippet.channelTitle}</h5>
            <p class="card-text">${data.snippet.title}</p>
     
          </div>
        </div>
      </div>
    </div>
      `;

      // calculate percentages
      var likes = parseInt(data.statistics.likeCount);
      document.getElementById("likesbadge").innerHTML = `${likes}`;

      var dislikes = parseInt(data.statistics.dislikeCount);
      document.getElementById("dislikesbadge").innerHTML = `${dislikes}`;

      var total = likes + dislikes;
      console.log(total);
      document.getElementById("totalstats").innerHTML = `${total}`;
      var likepercent = Math.round((likes * 100) / total);
      console.log(likepercent);
      var dislikepercent = Math.round((dislikes * 100) / total);
      console.log(dislikepercent);

      // change the dom
      document.getElementById("plikes").style.width = `${likepercent}%`;
      document.getElementById("plikes").innerHTML = `${likepercent}%`;
      document.getElementById("pdislikes").style.width = `${dislikepercent}%`;
      document.getElementById("pdislikes").innerHTML = `${dislikepercent}%`;

      // making loading button invisibe

      document.getElementById("btnload").style.visibility = "hidden";
    })
    .catch((error) => {
      alert(`Error fetching data - ${error.message}`, "warning");
      document.getElementById("btnload").style.visibility = "hidden";
      removeAlerts();
      return;
    });
});

/* <p class="card-text"><small class="text-muted">${datepublished}</small></p> */
