$(document).ready(function() {
  // Weather for traveling


  // City name to coordinates on the globe

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
      $vehicleP.text("Select your mode of transportation: ")

      // adds a drop down menu that only has "Car", "Bike", or "Walking" to the vehicleSelection id
      var $vehicleInput = $("<select id='vehicleSelect'><option value='car'>Car</option><option value='bike'>Bike</option><option value='foot'>Walking</option></select>")

      // append a button next to the drop down menu to submit choice
      var $submitVehicle = $("<button id='submitVehicle'>Submit</button>")

      // add all to the vehicle selection div and show it
      $("#vehicleSelection").append($vehicleP)
      $("#vehicleSelection").append($vehicleInput).append($submitVehicle)
      $("#vehicleSelection").show();

      var now = new Date();
      console.log(now)

      var startLat = startData[0][0].lat;
      var startLon = startData[0][0].lon;

      console.log("Start Lat: " + startLat + " Start Lon: " + startLon)

      var endLat = endData[0][0].lat;
      var endLon = endData[0][0].lon;

      console.log("End Lat: " + endLat + " End Lon: " + endLon)

      // now that we have our coordinates, and a button set up to get the appropriate vehicle, we need to query the traffic api to get the distance of the trip, and then query the weather api to get the weather for the day of the trip.
      $("#submitVehicle").click(function() {
        var vehicle = $("#vehicleSelect").val();          
        $.when(
          getTravelInfo(startLat, startLon, endLat, endLon)
        ).done(function(travelData) {
          console.log(travelData)
        });
      });

      var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude="+ endLat +"&longitude="+endLon+"&hourly=temperature_2m,wind_direction_120m,wind_speed_120m,precipitation,precipitation_probability&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
      // $.ajax({
      //   url: weatherUrl,
      //   dataType: 'json',
      //   success: function(data) {
      //     console.log(data)
      //   }
      // });
    });  
  });


  // Distance to travel


  apiKey = "8a4dfb56-a98a-4904-af80-4fcb0981c650";
  // Define the points for rloging as coordinates (lon, lat)

    
  // Define the API endpoint URL
 
  
  // $.ajax({
  //     url: hopperUrl,
  //     traditional: true,
  //     data: route,
  //     dataType: "json", 
  //     success: function(data) {
  //         console.log("Routing successful:", data);
  //     },
  //     error: function(status, error) {
  //       console.error("An error occured:", status, error)
  //     }
  // });

});