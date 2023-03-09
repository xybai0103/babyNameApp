/* Initialize variables */
// an acquired API key to use babyName API
var APIKey = 'jmjo9cnRKX3lkeCzzsTXtA==f4OpgctSgGbxedYt';
// button to generate baby names
var generateBtn = $('.generate-button');
// the container of all the synamic content for name-generating box
var generatedNameContainer = $('.generated-name-container');
// the header above the generated baby names
var generatedNnameHeader = $('.generated-name-header');
// the text showing gender in the generated-name-header
var genderText = $('.gender-text');
// a list containing the 10 randomly generated baby names
var generatedNameList = $('.generated-name-list');
// the text in the generated-name-header showing popularity
var popularText = $('.popular-text');


/* Define functions */
function generateBabyNames() {
  // user's input for the dropdown menu and the checkbox
  var gender = $('#gender-category').val();
  var popular = $('.checkbox-input').prop('checked');
  console.log(popular);
  // show different texts corresponding to user's input
  genderText.text(gender + ' ');
  if(popular){
    popularText.show();
  }else{
    popularText.hide();
  }

  // the constructed URL based on user's input
  var babyNameGenerateURL = 'https://api.api-ninjas.com/v1/babynames?gender=' + gender + '&popular_only=' + popular;
  // call the API with the constructed URL
  fetch(babyNameGenerateURL,{
    headers: {
      'X-Api-Key': APIKey
    }  
  })
  .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      generatedNameList.html('');
      // loop through the name array and generate list to display the names
      for(i=0; i<data.length; i++){
        // create a list item tag for each generated name
        var generatedName = $('<li>');
        generatedName.addClass('generated-name')
        generatedName.text(data[i]);
        // wire up an add-name button after each name
        var addNameBtn =$('<button>');
        addNameBtn.addClass('add-name-button is-size-5');
        addNameBtn.text('Add ')
        // add a plus symbol for the add-name button
        var plusSymbol = $('<i>');
        plusSymbol.addClass('plus-symbol fa fa-plus');
        addNameBtn.append(plusSymbol);
        generatedName.append(addNameBtn);
        generatedNameList.append(generatedName);
      };
    })
 }


 /*Add Event Listeners*/
 generateBtn.click(generateBabyNames);



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
