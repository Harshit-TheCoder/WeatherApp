async function getWeather(){
    let city = document.getElementById('cityInput').value;
    console.log(city);
    const apikey = '9bbdecffb701c10dac7b64a080f3cbfc';
    const resultDiv = document.getElementById('weatherResult');
    if(!city){
        resultDiv.innerHTML = `
        <p class="text-red-400 animate-pulse">Please enter a city name.</p>
        `;
        return;
    }
    resultDiv.innerHTML = `<p class="animate-pulse text-lg text-pink-300">Fetching weather data...</p>`;

    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apikey}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        if(data.cod === "404"){
            resultDiv.innerHTML = `<p class="text-red-400 animate-fade-in">City not found. Try again.</p>`;
            return;
        }

        const weatherHTML = `
            <div class="animate-fade-in-up transition duration-700">
                <h2 class="text-3xl font-bold">${data.name}, ${data.sys.country}</h2>
                <p class="text-xl mt-2">${data.weather[0].main} - ${data.weather[0].description}</p>
                <p class="text-5xl font-bold mt-4">${Math.round(data.main.temp)}°C</p>
                <p class="text-md mt-2">Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
            </div>
        `;

        resultDiv.innerHTML = weatherHTML;
    }
    catch(err){
        console.error(err);
        resultDiv.innerHTML = `<p class="text-red-400">Error fetching data.</p>`;
    }
}