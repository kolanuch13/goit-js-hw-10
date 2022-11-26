import './css/styles.css';
import _ from "lodash";
import Notiflix from 'notiflix';
import { fetchRequest } from './fetchCountries';

const inputField = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const infoAlert = "Too many matches found. Please enter a more specific name.";
const errorAlert = "Oops, there is no country with that name.";

inputField.addEventListener('input', _.debounce(() => {
    const myContry = inputField.value;
    fetchRequest(myContry)
        .then(country => {
            if (country.length > 10) {
                Notiflix.Notify.info(infoAlert);
            } else if (country.length > 1) {
                countryInfo.innerHTML = '';
                countryList.innerHTML = createMarkupList(country);
            } else if (country.length === 1) {
                countryList.innerHTML = '';
                countryInfo.innerHTML = createMarkupOne(country);
            } else {
                country.info.innerHTML = '';
                countryList.innerHTML = '';
                Notiflix.Notify.failure(errorAlert);
            }
        })  
}, 300)
);

function createMarkupOne(value) {
    const markup = value.map(item => {return `<div class="country-card">
            <h1 class="country-card-name">
            <img class="flag-image" src="https://flagcdn.com/w320/${item.cca2.toLowerCase()}.png">
                    ${item.name.common}
                </h1>
                <ul class="list">
                    <li class="list-item">
                        <h2 class="list-item-title">Capital: </h2> <p class="list-item-descript"> ${item.capital[0]}</p>
                    </li>
                    <li class="list-item">
                        <h2 class="list-item-title">Popylation: </h2> <p class="list-item-descript"> ${item.population}</p>
                    </li>
                    <li class="list-item">
                        <h2 class="list-item-title">Language: </h2> <p class="list-item-descript"> ${Object.values(item.languages)}</p>
                    </li>
                </ul>
                </div>`;}).join('');
    return markup;
}

function createMarkupList(value) {
    const markup = value.map(item => {
        return `
        <li class="list-country-item">
            <img class="flag-image" src="https://flagcdn.com/w320/${item.cca2.toLowerCase()}.png" style="width: 50px">
            <h2 class="country-card-name">${item.name.common}</h2>
        </li>
        `;
    }).join('');
    return markup;
}
