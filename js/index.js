const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    try {
        const res = await fetch('https://randomuser.me/api');
        const data = await res.json();
        // console.log(data);
        const user = data.results[0];

        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        }
        addData(newUser);

    } catch (error) {
        console.log(error);
        alert('Something went wrong :(');
    }
}

// Calculate the total wealth 
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Show Millionaires
function showMillionaires() {
    data = data.filter(cur => cur.money > 1000000);

    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Double everyones money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}


// Add new obj to data arr
function addData(obj) {
    data.push(obj); // IT will going to push the name and money in the variable data in the global scope
    // console.log(data);
    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

// Format number as money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);