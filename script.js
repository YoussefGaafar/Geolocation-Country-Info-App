const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderLocation = function (city, country) {
  return `<div class="location">You are in ${city}, ${country}</div>`;
};

const renderCountry = function (data, className = '', locationEl = '') {
  // Helper Functions
  const countryLanguage = (obj) => Object.values(obj.languages)[0];
  const countryCurrency = (obj) => Object.values(obj.currencies)[0].name;
  const html = `
    <article class="country ${className}">
    ${locationEl}
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.official}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1_000_000
        ).toFixed(1)}M People</p>
        <p class="country__row"><span>🗣️</span>${countryLanguage(data)}</p>
        <p class="country__row"><span>💰</span>${countryCurrency(data)}</p>
          </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position), // SuccessCallback & Fulfilled State
    //   (error) => reject(error.message) // ErrorCallback & Rejected State
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); // This is exactly the same as the above code snippet.
  });
};

// getPosition().then((pos) => console.log(pos)); // GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1731889570049}
// If there is an error: Uncaught (in promise) GeolocationPositionError {code: 1, message: 'User denied Geolocation'}

const whereAmI = function () {
  const authKey = 'f0bed08c920c48768e09d4b5659dcc85';
  let locationEl;
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;
      return fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${authKey}`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Cannot take multiple resonses at the same time (${response.status})!`
        );
      return response.json();
    })
    .then((data) => {
      const { city, country } = data.features.pop().properties;
      locationEl = renderLocation(city, country);
      return fetch(`https://restcountries.com/v3.1/name/${country.toLowerCase()}`);
    })
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data.pop(), '', locationEl);
    })
    .catch((error) => {
      console.error(`${error.message} 🧨`);
    });
};

btn.addEventListener('click', whereAmI);
