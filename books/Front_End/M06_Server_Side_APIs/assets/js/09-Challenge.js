// OpenWeather API key နေရာမှာ ကိုယ့် key ကို ထည့်ရပါမယ်
const apiKey = 'c0a7297a832bcc280093685d6f735a34';

// base URL တွေကို သိမ်းထားမယ်
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const forecastBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

// HTML က element တွေကို ရယူဖို့အတွက်
const searchButton = document.getElementById('searchButton'); // ရှာဖွေမဲ့ ခလုတ်
const cityInput = document.getElementById('cityInput'); // မြို့နာမည် ရိုက်ထည့်ဖို့ input
const weatherResults = document.getElementById('weatherResults'); // ရာသီဥတု ရလဒ်ပြမဲ့နေရာ
const forecastResults = document.getElementById('forecastResults'); // ရာသီဥတု ခန့်မှန်းချက် ပြမဲ့နေရာ
const historyEl = document.getElementById('history'); // ရှာဖွေခဲ့တဲ့ မြို့နာမည်များ စာရင်း

// ရှာဖွေခလုတ်ကို နှိပ်မယ်ဆိုရင် လုပ်မဲ့အချက်အလက်
searchButton.addEventListener('click', () => {
    const city = cityInput.value; // ရိုက်ထည့်ထားတဲ့ မြို့နာမည်ကို ရယူ
    if (city) { // မြို့နာမည် ရှိလျှင်
        fetchWeather(city); // ရာသီဥတုကို API ကနေယူ
        fetchForecast(city); // ရာသီဥတုခန့်မှန်းချက်ကို API ကနေယူ
        saveHistory(city); // ရှာဖွေခဲ့တဲ့ မြို့ကို သိမ်း
        displayHistory(); // ရှာဖွေခဲ့တဲ့ စာရင်းကို ပြ
    }
});

// ရာသီဥတုအချက်အလက်ကို API ကနေ ဆွဲထုတ်မဲ့ function
async function fetchWeather(city) {
    const response = await fetch(`${weatherBaseUrl}${city}&appid=${apiKey}&units=metric`); // API ကိုခေါ်
    const data = await response.json(); // response ကို JSON အဖြစ် ပြောင်း
    displayWeather(data); // ရလာတဲ့ အချက်အလက်ကို ပြ
}

// ရာသီဥတုခန့်မှန်းချက်ကို API ကနေ ဆွဲထုတ်မဲ့ function
async function fetchForecast(city) {
    const response = await fetch(`${forecastBaseUrl}${city}&appid=${apiKey}&units=metric`); // API ကိုခေါ်
    const data = await response.json(); // response ကို JSON အဖြစ် ပြောင်း
    displayForecast(data); // ရလာတဲ့ ခန့်မှန်းချက်ကို ပြ
}

// ရာသီဥတုအချက်အလက်ကို UI မှာ ပြမဲ့ function
function displayWeather(data) {
    weatherResults.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3> 
        <p>အပူချိန်: ${data.main.temp}°C</p>
        <p>ရာသီဥတု: ${data.weather[0].description}</p>
        <p>စိုထိုင်းဆ: ${data.main.humidity}%</p>
        <p>လေတိုက်နှုန်း: ${data.wind.speed} m/s</p>
    `;
}

// ၅ ရက်ခန့်မှန်းချက်ကို UI မှာ ပြမဲ့ function
function displayForecast(data) {
    forecastResults.innerHTML = '<h3>၅ ရက်ခန့်မှန်းချက်:</h3>';
    const forecastList = data.list.filter((_, index) => index % 8 === 0); // နေ့တိုင်းကြာသပေးရန် 8 နာရီ interval ကို သုံး

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        forecastResults.innerHTML += `
            <p><strong>${date}</strong></p>
            <p>အပူချိန်: ${forecast.main.temp}°C</p>
            <p>ရာသီဥတု: ${forecast.weather[0].description}</p>
            <p>စိုထိုင်းဆ: ${forecast.main.humidity}%</p>
            <hr/>
        `;
    });
}

// ရှာဖွေခဲ့တဲ့ မြို့နာမည်ကို သိမ်းမဲ့ function
function saveHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || []; // localStorage ထဲက ရှာဖွေမှု့သမိုင်းကို ရယူ
    if (!history.includes(city)) { // ရှာဖွေမှု့သမိုင်းမှာ မပါတဲ့ မြို့ဆိုရင်
        history.push(city); // မြို့ကို သိမ်း
        localStorage.setItem('searchHistory', JSON.stringify(history)); // localStorage ထဲ ထပ်ထည့်သိမ်း
    }
}

// ရှာဖွေမှု့သမိုင်းကို ပြမဲ့ function
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || []; // localStorage ထဲက သမိုင်းကို ရယူ
    historyEl.innerHTML = ''; // သမိုင်းစာရင်းကို လက်ရှိအတိုင်း စရှင်း

    history.forEach(city => {
        const li = document.createElement('li'); // list item အသစ်တစ်ခု ဖန်တီး
        li.textContent = city; // မြို့နာမည်ကို ပြ
        li.addEventListener('click', () => {
            fetchWeather(city); // မြို့ကို နှိပ်လိုက်ရင် ရာသီဥတုကို ပြန်ရှာ
            fetchForecast(city); // မြို့ကို နှိပ်လိုက်ရင် ခန့်မှန်းချက်ကို ပြန်ရှာ
        });
        historyEl.appendChild(li); // list item ကို UI ထဲ ထည့်
    });
}

// စာမျက်နှာကို ဖွင့်လိုက်တဲ့အချိန်မှာ သမိုင်းကို ပြ
displayHistory();
