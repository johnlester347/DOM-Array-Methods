const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRecipe();
// Fetch random user and add money
async function getRecipe() {
    try {
        const res = await fetch('https://randomuser.me/api');
        const data = await res.json();
        console.log(data);
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

// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {

    })
}
