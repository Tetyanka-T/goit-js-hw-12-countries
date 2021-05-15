// import axios from 'axios';
import debounce from 'lodash.debounce';
import cardForOneCountry from './templates/cardForOneCountry';
import cardList from './templates/cardForManyCountry'
import API from './js/fetchCountries';
// import './sass/main.scss';


const refs = {
  inputEl: document.querySelector('#searchQuery'),
  contMarkup: document.querySelector('.container'),
}

refs.inputEl.addEventListener('input', debounce(e => onSearch(e), 500),);

function onSearch(e) {
  clearContainer();
  const input = e.target;
  const searchQuery = input.value;
  
  if (searchQuery === 0) {
    return;
  }

  
  else {
    API.fetchCountries(searchQuery).then(renderCard).catch(onFetchError);
  }
}
       
function renderCard(searchQuery) {
  const markup = cardForOneCountry(searchQuery);
  console.log(markup);
  refs.contMarkup.innerHTML = markup;
}

function onFetchError(error) {
  alert('Enter the correct country name');
}

function clearContainer() {
  refs.contMarkup.innerHTML = '';
}

