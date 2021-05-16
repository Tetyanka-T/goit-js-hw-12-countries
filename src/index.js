// import axios from 'axios';
import debounce from 'lodash.debounce';
import cardForOneCountry from './templates/cardForOneCountry';
import cardList from './templates/cardForManyCountry';
import API from './js/fetchCountries';
import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';


const refs = {
  inputEl: document.querySelector('#searchQuery'),
  contMarkup: document.querySelector('.container'),
}

refs.inputEl.addEventListener('input', debounce(e => onSearch(e), 500),);

function onSearch(e) {
  clearContainer();
  const searchQuery = e.target.value;

  if (searchQuery === 0) {
    return;
  } else {
    API.fetchCountries(searchQuery)
      .then(country => {
        if (country.length > 10) {
          error({
            text: 'Too many matches found. Please enter a more specific query!',
          });
        } else if (country.length === 1) {
          renderCard(country, cardForOneCountry);
        } else if (country.length <= 10) {
          renderCard(country, cardList);
        }
      })
      .catch(onFetchError);
  }
}
 
       
function renderCard(countries, template) {
  const markup = countries.map(country => template(country)).join();
  console.log(markup);
  refs.contMarkup.innerHTML = markup;
}

function onFetchError(error) {
  alert('Enter the correct country name');
}

function clearContainer() {
  refs.contMarkup.innerHTML = '';
}

