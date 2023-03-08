/* Initialize variables */
// an acquired API key to use babyName API
var APIKey = 'jmjo9cnRKX3lkeCzzsTXtA==f4OpgctSgGbxedYt';
// button to generate baby names
var generateBtn = $('.generate-button');


/* Define functions */
function callGenerateAPI() {
  var gender = $('#gender-category').val();
  var popular = $('.checkbox').prop('checked');
  var babyNameGenerateURL = 'https://api.api-ninjas.com/v1/babynames?gender=' + gender + '&popular_only=' + popular;
  // call the API with the constructed URL
  fetch(babyNameGenerateURL,{
    headers: {
      'X-Api-Key': APIKey
    }  
  })
  // .then(function(response){
  //     return response.json();
  //   })
  //   .then(function(data){
  //     console.log(data);
  //   })
    .then(response => response.json())
    .then(data => console.log(data))
 }


 /*Add Event Listeners*/
 generateBtn.click(callGenerateAPI);
var dynamic_content = document.getElementById("dynamic_content")

$("#get-name-information").on("click",function(){
    inputValue = $("#baby_name_input").val()
    console.log(inputValue)
    fetch("https://www.behindthename.com/api/lookup.json?name=" + inputValue+"&key=re323908171").then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
    
});
