$(document).ready(function(){

    let city = "missouri";


    // SEARCH CITY FUNCTION
    $("#sbtn").click(function(){
        let searchValue = $("#svalue").val();
       if(searchValue != "")
       {
            // CALL WEATHER FUNCTION PASS CITY NAME FROM INPUT
            loadWeather(searchValue);

            // CALL STORE FUNCTION
            storeSearchHistory(searchValue);

            // CALL RETRIEVE HISTORY 
            retriveHistory();

            // EMPTY INPUT
            $("#svalue").val("");
       }else
       {
           alert("Please write a city name");
       }
    });





    // STORE SEARCH HISTORY
    function storeSearchHistory(searchedValue)
    {
        // Retrive old data and push new to store in local storage
        let searchedValueArray = window.localStorage.length > 0 ? JSON.parse(window.localStorage.getItem("searchHistory")) : [];

        // Push searched value to array
        searchedValueArray.push(searchedValue);

        // Convert array to JSON
        let searchedValueTOJSON = JSON.stringify(searchedValueArray);

        // Store to localsorage
        window.localStorage.setItem("searchHistory", searchedValueTOJSON);

    }

 


    // RETRIVE SERACH HISTORY FROM LOCALSTORAGE
    function retriveHistory()
    {
        let searchedValueArray = JSON.parse(window.localStorage.getItem("searchHistory"));
        $(".search-result").html("");
        $.each(searchedValueArray, function(key, value){
            
            if(key < 10)
            {
                $(".search-result").append("<p class='searchHistoryKeyWord' data-name='"+ value +"'>" + value + "</p>");
            }
        });



        // CLICK EVENT FOR HISTORY BUTTON
        $(".searchHistoryKeyWord").click(function(){
            let historyData = $(this).attr("data-name");

            loadWeather(historyData)
        });
    }
    retriveHistory();







    // LOAD WEATHER DATA FUNCTION
    function loadWeather(city)
    {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=21fdf1dbb77bdd465f4d7fa48a3c5b82",
            type: "GET",
            success: function(data)
            {

                // Header Section
                let headerWeather = `
                    <h2>${data.city.name} (${data.list[0].dt_txt.split(" ")[0]})<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"></h2>
                    <p>Temp: <span>${data.list[0].main.temp} °F</span></p>
                    <p>Wind: <span>${data.list[0].wind.speed} MPH</span></p>
                    <p>Humidity: <span>${data.list[0].main.humidity} %</span></p>
                    <p>UV Index: <span>0.47</span></p>
                `;

                $(".dash-header").html(headerWeather);


                // BODY SECTION
                let bodyWeather = "";
                for(let i=0; i<data.list.length; i+=8)
                {
                    bodyWeather += `
                        <div class="cus-card-body">
                            <h4>${data.list[i].dt_txt.split(" ")[0]}</h4>
                            <span><img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"></span>
                            <p>Temp: <span>${data.list[i].main.temp} °F</span></p>
                            <p>Wind: <span>${data.list[i].wind.speed} MPH</span></p>
                            <p>Humidity: <span>${data.list[i].main.humidity}%</span></p>
                        </div>
                    `;
                }

                $(".cus-cards").html(bodyWeather);
            }
        });
    }

    loadWeather(city);

});


