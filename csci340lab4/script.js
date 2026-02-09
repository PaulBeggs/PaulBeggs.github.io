$(document).ready(function() {

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

  locationKey = "7f6e8eca58ccf6beb3f078f7dcfc33d5"
  stateCode = "MO"
  cityName = "Kelso"
  var locationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName +"," + stateCode  + "," + "US" + "&limit=1&appid=" + locationKey
  $('#submit').click(function () {
    // Get current date's weather data up to 3 days into the future. based in conway
    $.ajax({
      url: locationUrl,
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


  // Distance to travel


  apiKey = "8a4dfb56-a98a-4904-af80-4fcb0981c650";
  // Define the points for routing as coordinates (lon, lat)
  var route = {
    "key": apiKey,

    // mode of transportation
    "profile": "car",
    
    // array of numbers (north first, then east)
    "point": [
      [
        11.539421,
        48.118477
      ],
      [
        11.559023,
        48.12228
      ]
    ],
  };
    
  // Define the API endpoint URL
  var hopperUrl = "https://graphhopper.com/api/1/route";
 
  
  $.ajax({
      url: hopperUrl,
      traditional: true,
      data: route,
      dataType: "json", 
      success: function(data) {
          console.log("Routing successful:", data);
      },
      error: function(status, error) {
        console.error("An error occured:", status, error)
      }
  });

});