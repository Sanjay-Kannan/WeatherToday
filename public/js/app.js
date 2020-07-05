// console.log('Client side js file');

const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let search = weatherForm.elements.namedItem("location").value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';

    if (!search) {
        alert('Search parameter can\'t be empty');
        return;
    }

    const url = `http://api.weatherstack.com/current?access_key=8ab24b278f7c0a52929ee032cbf7c5e9&query=${search}`;

    fetch(url).then((response) => {
        response.json().then(data => {
            if (data.error) {
                alert('Provided address is not valid');
            } else {
                messageOne.innerHTML = 
                `<div class="content">
                    <h2>Place: ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
                    <ul>
                        <li>Local Time: ${data.location.localtime}</>
                        <li>Time Zone: ${data.location.timezone_id}</li>
                    </ul>
                    <img class="weather-icon" src="${data.current.weather_icons}">
                    <h3>Weather Details</h3>
                    <h4>Weather description: ${data.current.weather_descriptions[0]}</h4>
                    <p>Observstion Time: ${data.current.observation_time}</p>
                    <ul>
                        <li>Temperature: ${data.current.temperature}</li>
                        <li>Feels like: ${data.current.feelslike}</li>
                        <li>Humidity: ${data.current.humidity}</li>
                        <li>Cloud Cover: ${data.current.cloudcover}</li>
                        <li>Pressure: ${data.current.pressure}</li>
                        <li>Precipitation: ${data.current.precip}</li>
                        <li>Weather Code: ${data.current.weather_code}</li>
                    </ul>
                    <h4>Wind description</h4>
                    <ul>
                        <li>Wind Degree: ${data.current.wind_degree}</li>
                        <li>Wind Direction: ${data.current.wind_dir}</li>
                        <li>Wind Speed: ${data.current.wind_speed}</li>
                    </ul>
                </div>`
                messageTwo.textContent = '';
                 //console.log(data.location);
                //console.log(data.current);
            }
        })
    });
})
