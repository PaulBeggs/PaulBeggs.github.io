$(document).ready(function() {
  // City name to coordinates on the globe

  travelingPictures = {
    "foot": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Elderly_man_walking_with_a_stick_and_one_hand_on_his_back.jpg/960px-Elderly_man_walking_with_a_stick_and_one_hand_on_his_back.jpg?20230512085159",
    "car": "https://www.publicdomainpictures.net/pictures/30000/velka/traveling-by-car.jpg",
    "bike": "https://upload.wikimedia.org/wikipedia/commons/e/e7/GKRP_bike.jpg?20080108072424"
  }

  function getCityState(selector) {
    var input = $(selector).val();

    var parts = input.split(",")

    return {
      city: parts[0] ? parts[0].trim() : "",
      state: parts[1] ? parts[1].trim() : ""
    };
  };

  function getCoordinates(city, state) {
    return $.ajax({
      url: "https://api.openweathermap.org/geo/1.0/direct?q=" 
      + city + "," + state + ",US&limit=1&appid=" + locationKey,
      dataType: 'json'
    });
  }

  function getTravelInfo(startLat, startLon, endLat, endLon, vehicle) {
    var hopperUrl = "https://graphhopper.com/api/1/route";
    var route = {
      "key": "8a4dfb56-a98a-4904-af80-4fcb0981c650",

      // mode of transportation
      "profile": vehicle,

      "points": [[startLat, startLon],[endLat,endLon]],
    };
    return $.ajax({
      url: hopperUrl,
      traditional: true,
      data: route,
      dataType: "json"
  });
  }

  locationKey = "7f6e8eca58ccf6beb3f078f7dcfc33d5"

  $('#submitCity').click(function() {
    // Get start location first
    var start = getCityState('#startCityBox');
    var end = getCityState('#endCityBox')
    
    $.when(
      getCoordinates(start.city, start.state),
      getCoordinates(end.city, end.state)
    ).done(function(startData, endData) {
      
      // adds a label for the drop down menu 
      var $vehicleP = $("<p>")
      $vehicleP.html("<h4 class='textBoxHeader'>Select your mode of transportation: </h4>")

      // adds a drop down menu that only has "Car", "Bike", or "Walking" to the vehicleSelection id
      var $vehicleInput = $("<select id='vehicleSelect'><option value='car'>Car</option><option value='bike'>Bike</option><option value='foot'>Walking</option></select>")

      // append a button next to the drop down menu to submit choice
      var $submitVehicle = $("<button id='submitVehicle'>Submit</button>")

      // add all to the vehicle selection div and show it
      $("#vehicleSelection").append($vehicleP)
      $("#vehicleSelection").append($vehicleInput).append($submitVehicle)
      $("#vehicleSelection").show();

      var startLat = startData[0][0].lat;
      var startLon = startData[0][0].lon;

      console.log("Start Lat: " + startLat + " Start Lon: " + startLon)

      var endLat = endData[0][0].lat;
      var endLon = endData[0][0].lon;

      console.log("End Lat: " + endLat + " End Lon: " + endLon)

      // now that we have the coordinates, and a button set up to get the appropriate vehicle, we need to query the traffic api to get the distance of the trip
      // TODO: query the weather api to get the weather for the day of the trip.
      // INSTEAD: switch to getting images and the first picture from the wikipedia page for the city instead of the weather at this point.
      $("#submitVehicle").click(function() {
      var vehicle = $("#vehicleSelect").val();
      var vPic = $("<img>")
      vPic.attr("src", travelingPictures[vehicle])
          .addClass("vehiclePic")    
          .appendTo("#vehicleSpan")
          
    
      $.when(getTravelInfo(startLat, startLon, endLat, endLon, vehicle)).done(function(travelData) {
          console.log(travelData);
          
          // get raw distance and time from travelData
          var rawMs = travelData.paths[0].time;
          var rawMeters = travelData.paths[0].distance;

          // convert meters to miles
          var distanceTravel = (rawMeters / 1609.34).toFixed(2);

          // convert time from ms to hours and minutes
          var totalMinutes = Math.floor(rawMs / 1000 / 60);
          var hours = Math.floor(totalMinutes / 60);
          var minutes = totalMinutes % 60;

          // get the trip distance and time, and give to the user
          var $timeP = $("<p>")
          $timeP.html("<strong>Time to travel: </strong>" + hours + " hours and " + minutes + " minutes.")
          $("#vehicleSelection").append($timeP)
          var $distanceP = $("<p>")
          $distanceP.html("<strong>Distance to travel: </strong>" + distanceTravel + " miles.")
          $("#vehicleSelection").append($distanceP)

          // get a formatted title to send off to wikipedia for proper search
          formattedTitle = end.city + ", " + abbrToState[end.state];

          var wikiUrl = "https://en.wikipedia.org/w/api.php";
          var wikiParams = {
            action: "query",
            prop: "extracts",
            exintro: 1,
            explaintext: 1,
            format: "json",
            titles: formattedTitle
          }
          $.ajax({
            url: wikiUrl,
            data: wikiParams,
            dataType: 'jsonp',
            success: function(data) {
              console.log(data);

              // need to get the id of the page without knowing it beforehand
              var pageId = Object.keys(data.query.pages)[0];
              var page = data.query.pages[pageId];

              if (page.extract) {
                var firstParagraph = page.extract.split("\n")[0];
                var formattedParagraph = "<h3>About " + formattedTitle + "</h3><p>" + firstParagraph + "</p>"
                if (vehicle !== "foot") {
                  $("#allElse").html(formattedParagraph);
                } else {
                  $("#vehicleSelection").append(formattedParagraph);
                }
              }

            },
            error: function(xhr, status, error) {
              console.log(error);
            }
          });
        });
      });
    });  
  });


// This is going to be something that I use in the future, but right now, I just need to get this project done, so I'm going to comment it out for now.

  // var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude="+ endLat +"&longitude="+endLon +"&hourly=temperature_2m,wind_direction_120m,wind_speed_120m,precipitation,precipitation_probability&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
  // $.ajax({
  //   url: weatherUrl,
  //   dataType: 'json',
  //   success: function(data) {
  //     console.log(data)
  //   }


  // From https://gist.github.com/mshafrir/2646763
  abbrToState = {
      "AL": "Alabama",
      "AK": "Alaska",
      "AS": "American Samoa",
      "AZ": "Arizona",
      "AR": "Arkansas",
      "CA": "California",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "DC": "District Of Columbia",
      "FM": "Federated States Of Micronesia",
      "FL": "Florida",
      "GA": "Georgia",
      "GU": "Guam",
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
      "MH": "Marshall Islands",
      "MD": "Maryland",
      "MA": "Massachusetts",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MS": "Mississippi",
      "MO": "Missouri",
      "MT": "Montana",
      "NE": "Nebraska",
      "NV": "Nevada",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "New Mexico",
      "NY": "New York",
      "NC": "North Carolina",
      "ND": "North Dakota",
      "MP": "Northern Mariana Islands",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PW": "Palau",
      "PA": "Pennsylvania",
      "PR": "Puerto Rico",
      "RI": "Rhode Island",
      "SC": "South Carolina",
      "SD": "South Dakota",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VT": "Vermont",
      "VI": "Virgin Islands",
      "VA": "Virginia",
      "WA": "Washington",
      "WV": "West Virginia",
      "WI": "Wisconsin",
      "WY": "Wyoming"
  }



});