if (location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}

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
  }

  var url = `https://ytdislike.herokuapp.com/dislike?id=${vidid}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.getElementById("vidinfo").innerHTML = `
      <p>Channel: ${data.snippet.channelTitle}</p>
      <p>Video Title: ${data.snippet.title}</p>

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
    });
});
