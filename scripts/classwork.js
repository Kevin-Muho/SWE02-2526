$(document).ready(function () {

  $("#searchBtn").click(function () {
    const userInput = $("#exchangeInput").val().trim().toLowerCase();

    if (!userInput) {
      $("#result").html('<p class="error">Enter exchange name!</p>');
      return;
    }

    $("#result").html("Loading...");

    
    $.ajax({
      url: "https://api.coingecko.com/api/v3/exchanges/list",
      method: "GET",

      success: function (list) {

        const match = list.find(exchange =>
          exchange.id.toLowerCase().includes(userInput) ||
          exchange.name.toLowerCase().includes(userInput)
        );

        if (!match) {
          $("#result").html('<p class="error">Exchange not found!</p>');
          return;
        }

        
        $.ajax({
          url: "https://api.coingecko.com/api/v3/exchanges/" + match.id,
          method: "GET",

          success: function (data) {
            console.log(data);

            $("#result").html(`
  <div class="card">
    <h2>${data.name}</h2>
    <p><strong>Country:</strong> ${data.country || "N/A"}</p>
    <p><strong>Trust Score:</strong> ${data.trust_score || "N/A"}</p>
    <p><strong>Trust Rank:</strong> ${data.trust_score_rank || "N/A"}</p>
    <p><strong>24h Volume (BTC):</strong> ${data.trade_volume_24h_btc?.toFixed(2) || "N/A"}</p>
    <p><strong>Year Established:</strong> ${data.year_established || "N/A"}</p>
    <p><strong>Website:</strong> 
      <a href="${data.url}" target="_blank">${data.url}</a>
    </p>
  </div>
`);
          },

          error: function () {
            $("#result").html('<p class="error">Error loading exchange details.</p>');
          }

        });
      },

      error: function () {
        $("#result").html('<p class="error">Error loading exchange list.</p>');
      }

    });

  });

});