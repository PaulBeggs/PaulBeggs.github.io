$(document).ready(function() {
  // Initally hide the vehicle selection div



  // Weather for traveling

  var weatherUrl = "https://weather.open-meteo.com/v1/forecast?latitude=35.0887&longitude=-92.4421&hourly=temperature_2m&current=is_day,temperature_2m&timezone=America%2FChicago&forecast_days=3&temperature_unit=fahrenheit"
  $('#submit').click(function () {
    // Get current date's weather data up to 3 days into the future. based in conway
    $.ajax({
      url: weatherUrl,
      dataType: 'json',
      success: function(data) {
        console.log(data)
        // console.log(data["latitude"])
      },
      error: function(xhr, status, error) {
        console.error("An error occured:", status, error)
      }
    });
  });



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

  locationKey = "7f6e8eca58ccf6beb3f078f7dcfc33d5"

  $('#submitCity').click(function() {
    // Get start location first
    var start = getCityState('#startCityBox');
    var end = getCityState('#endCityBox')
    
    $.when(
      // getCoordinates(start.city, start.state),
      // getCoordinates(end.city, end.state)
    ).done(function(startData, endData) {
      
      // adds a label for the drop down menu 
      var $vehicleP = $("<p>")
      $vehicleP.text("Select your mode of transportation: ")

      // adds a drop down menu that only has "Car", "Bike", or "Walking" to the vehicleSelection id
      var $vehicleInput = $("<select id='vehicleSelect'><option value='car'>Car</option><option value='bike'>Bike</option><option value='walking'>Walking</option></select>")

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

      var endLat = endData[0][0].lat;
      var endLon = endData[0][0].lon;

      // now that we have our coordinates, and a button set up to get the appropriate vehicle, we need to query the traffic api to get the distance of the trip, and then query the weather api to get the weather for the day of the trip.
      $.when(
        
      )

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
  var rloge = {
    "key": apiKey,

    // mode of transportation
    "profile": "car",
    
    // array of numbers (north first, then east)
    "points": [
      [
        -11.539421,
        -48.118477
      ],
      [
        -11.559023,
        -48.12228
      ]
    ],
  };
    
  // Define the API endpoint URL
  // var hopperUrl = "https://graphhopper.com/api/1/rloge";
 
  
  // $.ajax({
  //     url: hopperUrl,
  //     traditional: true,
  //     data: rloge,
  //     dataType: "json", 
  //     success: function(data) {
  //         console.log("Rloging successful:", data);
  //     },
  //     error: function(status, error) {
  //       console.error("An error occured:", status, error)
  //     }
  // });

});