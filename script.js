//DOM Vars
const iconToggle = document.getElementById('toggle-icon');
const darkModeToggle = document.getElementById('dark-mode-toggle');

//Theme Vars
const bgColor = '--bg-color';
const txtColor = '--text-color';
const elmntColor = '--elements-color';
const inptColor = '--input-color';
const boxShadow = '--box-shadow';
let darkMode = true;


const refresh =  () =>  {    
    setTimeout(() => {
        window.location.reload();
    }, 50);
}

const switchToLightMode  = () => {
    document.documentElement.style.setProperty(bgColor, 'hsl(0, 0%, 98%)');
    document.documentElement.style.setProperty(txtColor, 'hsl(200, 15%, 8%)');
    document.documentElement.style.setProperty(elmntColor, 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty(inptColor, 'hsl(0, 0%, 52%)');
    document.documentElement.style.setProperty(boxShadow,'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;');
    iconToggle.classList.remove('fas');
    iconToggle.classList.add('far');
    localStorage.setItem('isDark', 'no');
    darkMode = false;
 
};

const switchToDarkMode  = () => {
    document.documentElement.style.setProperty(bgColor, 'hsl(207, 26%, 17%)');
    document.documentElement.style.setProperty(txtColor, 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty(elmntColor, 'hsl(209, 23%, 22%)');
    document.documentElement.style.setProperty(inptColor, 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty(boxShadow,'none');

    iconToggle.classList.remove('far');
    iconToggle.classList.add('fas');
    localStorage.setItem('isDark', 'yes');
    darkMode = true;
 
};

//On darkMode icon Click
darkModeToggle.addEventListener('click', e => {
    darkMode ? switchToLightMode() :  switchToDarkMode();
    refresh();
    e.preventDefault();
})


//On Document Load
document.addEventListener('DOMContentLoaded', () => {
    //Check color theme
    const isDark = localStorage.getItem('isDark');
    (isDark === 'yes') ?    switchToDarkMode() : switchToLightMode();

    //Render content to UI based ON page
    const url = window.location.href.toString();

     if (url.includes('country.html')) {
        CountryPageInit()

        loadEventListeners()
         
     }

     else{
        getAllCountries()

        loadHomeEventListeners()

     }
   
   
})

const loadHomeEventListeners = () => {
    //Dropdown toggle
    const dropBtn = document.querySelector('.dropbtn');
    const dropContent = document.querySelector('.dropdown-content');

    dropBtn.addEventListener('click', e => {
        dropContent.classList.toggle('show');
        e.preventDefault();
    })


    //SEARCH EVENT
    // Get the input field
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener('keyup' , e => {
        if(e.key === 'Enter'){

            const value = e.target.value.toLowerCase();

            getSpecificCountry(value);

            e.target.value = '';
            
            e.preventDefault();
        }
    })

    //DROPDOWN LIST SELECT EVENT
    const regions =document.querySelectorAll('.region');
    regions.forEach( region => {

        region.addEventListener('click', e => {
            const value = e.target.innerHTML.toLowerCase();

            getRegionCountries(value);

            dropContent.classList.remove('show');

            e.preventDefault();
        })
        
    });

    //SAVE COUNTRY NAME TO LS && REDIRECTING
     const saveName = (e) => {
     if(e.target.parentElement.classList.contains('country-link'))
     {
        const link = e.target.parentElement;

        const countryName = link.getAttribute('data-name').toLowerCase();

        //clear previous data
         localStorage.removeItem('country-name');
         //add data to storage
        localStorage.setItem("country-name", countryName);

        window.location.href = './country.html';
     }
    }

    const countries = document.querySelector('.countries');

    countries.addEventListener('click', saveName);

}

    //EVENT LISTENERS FOR COUNTRY PAGE
    const loadEventListeners = () => {
        const backBtn = document.querySelector('.back-btn');

        backBtn.addEventListener('click', () => {
            window.location.href = './index.html';
        })

        //SAVE COUNTRY NAME TO LS && REDIRECTING
       const saveName = (e) => {
        if(e.target.classList.contains('country-btn'))
        {  
            const btn = e.target;
   
            const countryCode = btn.value.toLowerCase();

            //clear previous data
             localStorage.removeItem('country-code');

             //add data to storage
             localStorage.setItem("country-code", countryCode);
   
             const code = JSON.stringify(localStorage.getItem('country-code'));
             //Get country by code
              getCountryByCode(code);

             //refresh page
              refresh();
        }
       }

        const country = document.querySelector('.country');

        country.addEventListener('click', saveName);
    }



//Render Countries to UI 
const renderCountries = countriesData => {
    const countries = document.querySelector('.countries');

    let output = '';
    countriesData.forEach(country => {
         output += `
           <div class="card">
           <a data-name="${country.name.common}" class="country-link">
             <img class="card-img" src="${country.flags.svg}" alt="${country.name.common}">
           </a>
          
           <div class="card-body">
               <a data-name="${country.name.common}" class="country-link">
                 <h3 class="card-title">${country.name.common}</h3>
               </a>
               <ul>
                 <li>
                    <span class="item-key">Population: </span>
                    <span class="item-value">${country.population.toLocaleString('en')}</span>
                  </li>
                 <li>
                    <span class="item-key">Region: </span>
                    <span class="item-value">${country.region}</span>
                </li>
                 <li>
                    <span class="item-key">Capital: </span>
                    <span class="item-value">${country.capital}</span>
                </li>
               </ul>
              
           </div>
           </div>
         `;  
   });
   
   countries.innerHTML = output;
}

//Render Country to UI (Country.html)
const renderCountry = country => {
    const countryElement = document.querySelector('.country');
    const data = country[0];
    
    //Format native Name
    const nativeNames = data.name.nativeName;
    const nativeName = Object.values(nativeNames)[0].common;

     //Format Currencies
    const currencies = data.currencies;
    let currencyArr = []
    for( const key in currencies){
          currencyArr.push(currencies[key].name)
          
    }
    const currency = currencyArr.join(', ');

    //Format Languages
    const languages = data.languages;
    let languagesArr = []
    for( const key in languages){
          languagesArr.push(languages[key])
          
    }
    const language = languagesArr.join(', ');

    //Format Border Countries
    threeBorders = data.borders.slice(0,3);

    const borders = Object.assign({}, threeBorders);
    
     
     //INSERT DATA IN HTML
     countryElement.innerHTML = ` 
     <div class="country-image">
            <img src="${data.flags.svg}" alt="${data.name.common}">
        </div>
        <div class="country-details">
            <div class="details">
                <div class="primary-details">
                    <h3 class="country-name">${data.name.common}</h3>
                    <ul>
                        <li>
                            <span class="item-key">Native Name: </span>
                            <span class="item-value">${nativeName}</span>
                        </li>
                        <li>
                            <span class="item-key">Population: </span>
                            <span class="item-value">${data.population.toLocaleString('en')}</span>
                        </li>
                        <li>
                            <span class="item-key">Region: </span>
                            <span class="item-value">${data.region}</span>
                        </li>
                        <li>
                            <span class="item-key">Sub Region: </span>
                            <span class="item-value">${data.subregion}</span>
                        </li>
                        <li>
                            <span class="item-key">Capital: </span>
                            <span class="item-value">${data.capital}</span>
                        </li>
            
                    </ul>
                </div>
                <div class="secondary-details">
                    <ul>
                        <li>
                            <span class="item-key">Top Level Domain: </span>
                            <span class="item-value">${data.tld}</span>
                        </li>
                        <li>
                            <span class="item-key">Currencies: </span>
                            <span class="item-value">${currency}</span>
                        </li>
                        <li>
                            <span class="item-key">Languages: </span>
                            <span class="item-value">${language}</span>
                        </li>
                    </ul>
                </div>
            </div>

           ${ Object.keys(borders).length === 0 && borders.constructor === Object ? '' : `
            <div class="border-countries">
                <div class="border-countries-label">
                    <h4>Border Countries:</h4>
                </div>
                <div class="border-countries-btns">
                ${Object.keys(borders).map(function (key) {
                    return "<button class='country-btn'  value='" + borders[key] + "'>" +borders[key] + "</button>"           
                }).join("")}    
                </div>`
                }
            </div>`;
       
}


//API REQUESTS 
//Get all countries
const getAllCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(function (response) {
          
        const countriesData = response.data;
        renderCountries(countriesData);
    
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
}
 

//Get specific country
const getSpecificCountry = (name) => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then(function (response) { 
        const countriesData = response.data;

        renderCountries(countriesData);
    
    }).catch(function (error) {
       
        console.log(error);
    })
}
  
 
//Get countries by region
const  getRegionCountries = (region) => {
    axios.get(`https://restcountries.com/v3.1/region/${region}`)
    .then(function (response) {
          
        const countriesData = response.data;
        
        renderCountries(countriesData);
    
    }).catch(function (error) {
       
        console.log(error);
    })
}




//Get specific country (for Country Single Page)
const getCountry = (name) => {

    axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then(function (response) {
          
        const countryData = response.data;

        renderCountry(countryData);
    
    }).catch(function (error) {
       
        console.log(error);
    })
}

//Get specific country by code (for Country Single Page)
const getCountryByCode = (code) => {

    axios.get(`https://restcountries.com/v3.1/alpha/${code.replace(/\"/g, "")}`)
    .then(function (response) {
          
        const countryData = response.data;

        renderCountry(countryData);
    
    }).catch(function (error) {
       
        console.log(error);
    })
}


const CountryPageInit = () => {
     
    // console.log('Hello this is counrty page!!!');
     const name = localStorage.getItem('country-name');
     const code = localStorage.getItem('country-code');

     
  

   //check if country page is redirected / reloade

   (performance.navigation.type == performance.navigation.TYPE_RELOAD) 
   ?  getCountryByCode(code): getCountry(name)
   
}
