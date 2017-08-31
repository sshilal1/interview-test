// Interview Assesment 8/30/2017
// Stephen Shilale

// global secret values in hash table
var secretHash = {};

// fetch data from server
$.get( "/data", function( data ) {

  // parse the string into json
  var objects = JSON.parse(data);

  // sort the array
  objects.sort(function(a, b) {return a.timestamp - b.timestamp});

  const objLength = objects.length;
  for(let i=0; i<objLength; i++) {

    // add secret to hash
    const name = objects[i].name;
    secretHash[name] = objects[i].secret;

    // format character html row
    var date = new Date(parseInt(objects[i].timestamp));
    var formattedDateString = date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();
    const imgString = '<img class="entry-image" src="' + objects[i].image + '"></img>';
    const nameString = '<div class="entry-name">' + name.toUpperCase() + '</div>';
    const dateString = '<div class="entry-date">' + formattedDateString + '</div>';
    const nameDateBox = '<div class="entry-namedate">' + nameString + dateString + '</div>';

    // append div
    var className = (i==objLength-1) ? "entry" : "entry red-bordered";
    const divString = '<div id="' + name + '" class="' + className + '">' + imgString + nameDateBox + '</div>';
    $("#main").append(divString);

    // create handler for button press
    $( '#' + name ).click(function() {
      const color = secretHash[name];
      $('#secret-color').css("background-color", color).html(color);
    });
  }
});

// set handler for clear button
$( '#clear-button' ).click(function() {
  $('#secret-color').css("background-color", "white").html("???");
});