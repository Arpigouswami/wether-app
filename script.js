const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const { cityDetails, weatherDetails} = data;

    // Update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weatherDetails.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weatherDetails.Temperature.Metric.Value}</span>
                    <span>&deg;</span>
                </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weatherDetails.IsDayTime ? 'img/day.jpg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity = async(city) => {
   
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return { cityDetails, weatherDetails};
}

cityForm.addEventListener('submit', (e) => {
    // prevent default function
    e.preventDefault();

    // get city input
    const city = cityForm.city.value.trim();
    
    // to clearout the form field
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));
})