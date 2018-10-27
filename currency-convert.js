const axios = require('axios');
const api_key = '97e914ec33ad6acf9c6b29a11dc40377';
const ratesURL = `http://data.fixer.io/api/latest?access_key=${api_key}`;
const currencyURL = 'https://restcountries.eu/rest/v2/currency/';



const getExchangeRates = async (from , to) => {
  try {
    const response = await axios.get(ratesURL);
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    if(isNaN(rate)){
      throw new Error(`unable to fetch conversion ${from} and ${to}.`)
    }
    return rate;
  } catch (e) {
    throw new Error(`unable to fetch conversion ${from} and ${to}.`)
  }
}

const getCountries = async (countryCode) => {
  try {
    const response = await axios.get(currencyURL + countryCode);
    const countries = response.data.map((country) => {
      return country.name;
    });
    return countries;
  } catch (e) {
    throw new Error(`Unable to Fetch countries for ${countryCode}`)
  }
}

const convertCurrency = async (from,to,amount) => {
  const rate = await getExchangeRates(from,to);
  const countries = await getCountries(to);
  const newAmount = (amount * rate).toFixed(2);
  return `Your ${amount} ${from} is equal to ${newAmount} ${to}. You can spend these money in following countries: ${countries.join(', ')}`;
}

getExchangeRates('USD','QQQ').then((rate) => {
  console.log(rate);
}).catch((e) => {
  console.log(e);
})

// getCountries('K').then((countries) => {
//   console.log(data);
// }).catch((e) => {
//   console.log(e);
// });

// convertCurrency('INR','USD',75000).then((amount) => {
//   console.log(amount);
// })
