// Selectors
const time = document.getElementById('time'),
      date = document.getElementById('date'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus');


// Event Listeners from main page

// Functions

function showTime() {
    let today = new Date(),
    hour = today.getHours(),
    minutes = today.getMinutes(),
    seconds = today.getSeconds(),
    day = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // Output time
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)} ${amPm}`;
    date.innerHTML = `${addZero(day)}<span>.</span>${addZero(month + 1)}<span>.</span>${year}`;

    setTimeout(showTime, 1000);
}


function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set background and greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();
    if (hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('img/morning.jpg')";
        greeting.textContent = 'Good morning';
    }else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('img/afternoon.jpg')";
        greeting.textContent = 'Good afternoon';
    }else {
        // Evening
        const btn = document.querySelectorAll('.home button');
        document.body.style.backgroundImage = "url('img/night.jpg')";
        greeting.textContent = 'Good night';
        document.body.style.color = 'white';
        btn.forEach(btn => {
            btn.style.background = 'white';
            btn.style.color = 'black';
            btn.style.opacity = '0.85';
        })
    }
}

// LocalStorage Get Name function
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter your Name here]'
    }else {
        name.textContent = localStorage.getItem('name')
    }
}

// LocalStorage Set Name function
function setName(e) {
    if(e.type === 'keypress') {
        // Make sure enter is pressed
        if(e.wich == 13 || e.keyCode == 13) {  // 13 - Enter keyCode
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// LocalStorage Get Focus function
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter your Focus here]';
    }else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// LocalStorage Set Focus function
function setFocus(e) {
    if(e.type === 'keypress') {
        // Make sure enter is pressed
        if(e.wich == 13 || e.keyCode == 13) {  // 13 - Enter keyCode
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    }else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();