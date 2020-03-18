"use strict";

const searchURL = "http://newsapi.org/v2/everything?";
const apiKey="efd09862aec8405fa7edd50c64e9f257";

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
  console.log('success');

  $('#results-list').empty();

  for(let i=0; i < responseJson.article.length; i++){
    $('#results-list').append(
      `<li>
        <h3>
          <a href="${responseJson.article[i].title}">${responseJson.article[i].title}</a>
          <a href="${responseJson.articles[i].url}">${response.articles[i].url}</a>
          <a href="${responseJson.articles[i].description}">${response.articles[i].description}</a>
        </h3>
      </li>`
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
    apiKey:'efd09862aec8405fa7edd50c64e9f257'
  };
console.log(q);

  const queryString = formatQueryParams(params)
  let url = searchURL + queryString;

  console.log(url);


  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.Json();
    }
    throw new Error(response.statusText);
  })
  .then (responseJson => displayresults (responseJson))
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
