let searchBtn = document.getElementById('search-btn');
let countryInp = document.getElementById('country-inp');

searchBtn.addEventListener("click", () => { 
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);
    fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0]);
        console.log(data[0].capital[0]);
        console.log(data[0].flags.svg);
        console.log(data[0].name.common);
        console.log(data[0].continents[0]);
        console.log(data[0].capital[0]);
        console.log(data[0].currencies[objects.keys(data[0].currencies)].name);
        console.log(
            object.values(data[0].languages).toString().split(",").join(",")

        );
        result.innerHTML = `
        <img src="${data[0].flags.svg}"
        class="flag-img">
        <h3>${data[0].name.common}</h3>
        <div div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
                    </div>
                </div>
                < div class="wrapper">
                <div class="data-wrapper">
                    <h4>Continent:</h4>
                    <s>${data[0].continen