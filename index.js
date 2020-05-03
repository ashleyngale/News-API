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

//display top headlines
function displayTopArticles (responseJson){
  console.log(responseJson);
  console.log('headlines');

  for(let i=0; i < responseJson.articles.length; i++){

    $('#top-headlines').append(
      `<li class= "HeadlineCont">
         <a target="blank" class="headlineTitle" href=${responseJson.articles[i].url}">${responseJson.articles[i].title}</a><hr>
      </li>` 
    )
  };
   $('#results').removeClass("hideHead");
};
//getResults/fetch
function getTopHeadlines(){
  const params = {
    title:"",
    url:""
  }
  console.log(); 

  const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=1073e27e20fe4d109d7bcbfd901ac99c";
  var req = new Request(url);

  fetch(req)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then (responseJson => displayTopArticles
    (responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//display results list
function displayResults (responseJson){
  console.log(responseJson);
  console.log('yes');

  $('#results-list').empty();

  for(let i=0; i < responseJson.articles.length; i++){

    $('#results-list').append(
      `<li>
            <h3>
              <h2> <a target="_blank" class="title" href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h2>
                <a class="description" href="${responseJson.articles[i].url}">${responseJson.articles[i].description}</a><hr><br>
            </h3>
          </li>`
     )
  };
    $('#results').removeClass("hidden");
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


function watchForm(){
  getTopHeadlines();

  $('.dropButton').click(event => {
    $(".dropdown-content").toggle();
  })
 
  $('form').submit(event => {
    
    event.preventDefault();
    const searchTerm = $('#news-search').val();
    if (!searchTerm) { 
      alert("You forgot to type something in the search box!");
    } else {
        getResults(searchTerm);
        
        console.log("yay");
    }
  });
}


$(watchForm);
