"use strict";

const searchURL = "https://newsapi.org/v2/everything?";
const apiKey="1073e27e20fe4d109d7bcbfd901ac99c";

//format paprams
function formatQueryParams(params) {
const queryItems= Object.keys(params)
.map(key => `${(key)}=${(params[key])}`)
return queryItems.join('&');
}
console.log('success');
//display results list
function displayResults (responseJson){
  console.log(responseJson);
  console.log('yes');

  $('#results-list').empty();

  for(let i=0; i < responseJson.articles.length; i++){
    $('#results-list').append(
      `<ul>
          <li>
           <h3>
             <h2> <a class="title" href="${responseJson.articles[i].title}">${responseJson.articles[i].title}</a></h2>
              <a class="description" href="${responseJson.articles[i].description}">${responseJson.articles[i].description}</a><br>
              <a class= "url" href="${responseJson.articles[i].url}">${responseJson.articles[i].url}</a>
            </h3>
          </li>
       </ul>`
    )
  };
$('#results').removeClass('hidden');
};

//get results/fetch
function getResults(q){
  const params = {
    q,
    title:"",
    description:"",
    url:"",
    apiKey:'1073e27e20fe4d109d7bcbfd901ac99c'
  };
console.log(q);

  const queryString = formatQueryParams(params)
  let url = searchURL + queryString;

  console.log(url);

var req = new Request(url);

  fetch(req)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then (responseJson => displayResults
  (responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
  }

//call all function
function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#news-search').val();
    getResults(searchTerm);
    console.log("yay");
  });
}

$(watchForm);

