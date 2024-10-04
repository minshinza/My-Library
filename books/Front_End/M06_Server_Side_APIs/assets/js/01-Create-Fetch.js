var repoList = document.querySelector('ul');  // ul ကို ရွေး
var fetchButton = document.getElementById('fetch-button');  // fetch-button ကို ရွေး

function getApi() {
    var requestUrl = "https://api.github.com/users/minnthann/repos";  // URL မှာ အမှား ပြင်
    fetch(requestUrl)
        .then(function(response) {
            return response.json();  // JSON data ကို ပြန်ပေး
        })
        .then(function(data) {
            for (var i = 0; i < data.length; i++) { 
                var listItem = document.createElement('li');  // li element အသစ်တစ်ခု ထုတ်
                listItem.textContent = data[i].html_url;  // repo URL ကို ပို့
                repoList.appendChild(listItem);  // ul ထဲကို li ကို ပို့
            }
        });
}

fetchButton.addEventListener('click', getApi); 