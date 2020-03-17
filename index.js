"use strict";

const searchURL  = "http://newsapi.org/v2/everything?q=bitcoin&apiKey=efd09862aec8405fa7edd50c64e9f257";

cost apiKey= "efd09862aec8405fa7edd50c64e9f257";
//format paprams
function formatQueryPrams(params) {
const queryItems= object.key(params)
.map(key => `${(key)}=${(params[key])}`)
return queryItems.join('&');
}

//display results list
function displayresults (responseJson){
  console.log(responseJson);
  $('results-list').empty();

  for(let i=0; i < responseJson.length; i++){
    $('results-list').append(
      `<li>
        <h3>
          <a href="${responseJson.sources[i].name}">${responseJson.sources[i].name}</a>
          <a href="${responseJson.sources[i].url}">${responseJson.sources[i].url}</a>
          <a href="${responseJson.sources[i].description}">${responseJson.sources[i].description}</a>
        </h3>
      </li>`
    )
  };
$('#results').removeClass('hidden');
};

//get results/fetch
function getresults(id){
  const params = {
    q,
    name:"",
    description:"",
    url:"",
    apiKey:"efd09862aec8405fa7edd50c64e9f257";
  };

  const queryString = formatQueryPrams(prams)
  cosnt url = searchURL + '?' + queryString;

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
    getresults(searchTerm);
  });
}

$(watchForm);
