let allCountriesData = []; // Array to store all the country data
let displayedCountries = []; // Array to store currently displayed countries

const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            allCountriesData = data; // Store all the data
            displayedCountries = data; // Initially display all countries
            displayCountries(displayedCountries);
        })
        .catch(error => console.error('Error fetching data:', error));
};

const displayCountries = countries => {
    const container = document.getElementById('countries');
    container.innerHTML = '';

    countries.forEach(country => {
        const countryHTML = getCountry(country);
        container.innerHTML += countryHTML;
    });
};

const getCountry = (country) => {
    const currencies = country.currencies ? Object.keys(country.currencies).join(', ') : 'Not specified';
    const languages = Array.isArray(country.languages) && country.languages.length > 0 ? country.languages.map(lang => lang.name).join(', ') : 'Not specified';
  
    return `
        <div class="country-div">
            <img src="${country.flags.png}">
            <h2>${country.name.common}</h2>
            <hr>
            <h4>Population: ${country.population}</h4>
            <h4>Region: ${country.region}</h4>
            <h4>Subregion: ${country.subregion}</h4>
            <h4>Capital: ${country.capital}</h4>
            <h4>Currencies: ${currencies}</h4>
            <h4>Time Zone: ${country.timezones}</h4>
        </div>
    `;
};

const searchCountries = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    displayedCountries = allCountriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(displayedCountries);
};

loadCountryAPI();
