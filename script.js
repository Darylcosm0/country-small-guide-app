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