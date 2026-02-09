$(document).ready(function() {
  const now = new Date()
  console.log(now)
  $('#submit').click(function () {
    // Get current date's weather data up to 3 days into the future. based in conway
    const api_url = "https://api.open-meteo.com/v1/forecast?latitude=35.0887&longitude=-92.4421&hourly=temperature_2m&current=is_day,temperature_2m&timezone=America%2FChicago&forecast_days=3&temperature_unit=fahrenheit"
    $.ajax({
      url: api_url,
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
});