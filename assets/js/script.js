/* Initialize variables */
// an acquired API key to use babyName API
var APIKey = 'jmjo9cnRKX3lkeCzzsTXtA==f4OpgctSgGbxedYt';
// the container of the content for first loading page
var firstLoadingContainer = $('#first-loading-container');
// button to generate baby names
var generateBtn = $('.generate-button');
// the container of all the dynamic content for name-generating box
var generatedNameContainer = $('#generated-name-container');
// the header above the generated baby names
var generatedNnameHeader = $('.generated-name-header');
// the text showing gender in the generated-name-header
var genderText = $('.gender-text');
// a list containing the 10 randomly generated baby names
var generatedNameList = $('.generated-name-list');
// the text in the generated-name-header showing popularity
var popularText = $('.popular-text');
// the add-name button
var addNameBtn =$('.add-name-button');
// get the names from local storage
var names = JSON.parse(localStorage.getItem('names'))||[];
// the container of all the dynamic content for name-list box
var addedNameListContainer = $('#added-name-list-container');
// button to check added baby names on the list
var checkListBtn = $('.check-list-button');
// a list containing the added baby names
var addedNameList = $('.added-name-list');

var nameInfoContainer = $('.name-info-container');
var alert = $('.alert');


/* Define funtions */
// hide the dynamic content for name-generating box on the right when first-loading or refreshing the page
generatedNameContainer.hide();
addedNameListContainer.hide();


// store the names which user added
function storeNames(){
  localStorage.setItem('names', JSON.stringify(names));
} 

// function to generate baby names 
function generateBabyNames() {
  firstLoadingContainer.hide();
  given_name_information.hide();
  addedNameListContainer.hide();
  generatedNameContainer.show();
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
        // add vertical margin and underline
        generatedName.addClass('generated-name my-3 is-underlined');
        // add a span element to wrap name within the li element 
        var generatedNameSpan = $('<span>');
        generatedNameSpan.text(data[i]);
        generatedName.append(generatedNameSpan);
        // add an event listener to each generated name to check related information
        generatedNameSpan.click(getNameInformation);
        // wire up an add-name button after each name
        var addNameBtn =$('<button>');
        addNameBtn.addClass('add-name-button is-size-5');
        addNameBtn.text('Add ');
        // add a plus symbol for the add-name button
        var plusSymbol = $('<i>');
        plusSymbol.addClass('plus-symbol fa fa-plus');
        addNameBtn.append(plusSymbol);
        generatedName.append(addNameBtn);
        generatedNameList.append(generatedName);
      };
    })
 }

// Delegates the listener to all buttons inside the parent element
// Add Event Listener to add-name button
// Store clicked name to local storage
generatedNameList.on('click','button',function(){
  var nameAdd = $(this).parent().text();
  // only show name, excluding the text in add button
  var name = nameAdd.replace('Add ', '');
  console.log(name);
  if(!names.includes(name)){
    names.push(name);
    storeNames();
  }
});
// not work'Cannot create property 'guid' on string '.generated-name'
// generatedNameList.on('click','.generated-name',getNameInformation);


function displayAddedBabyNames() {
  firstLoadingContainer.hide();
  given_name_information.hide();
  generatedNameContainer.hide();
  addedNameListContainer.show();
  addedNameList.html('');
  //render names in a list
  for (i=0; i<names.length; i++){
    // create a list item tag for each added name
    var addedName = $('<li>');
    // add vertical margin and underline
    addedName.addClass('added-name my-3 is-underlined');
    // add a span element to wrap name within the li element 
    var addedNameSpan = $('<span>');
    addedNameSpan.text(names[i]);
    addedName.append(addedNameSpan);
    // add an event listener to each added name to check related information
    addedNameSpan.click(getNameInformation);
    // wire up an remove-name button after each added name
    var removeNameBtn =$('<button>');
    removeNameBtn.addClass('remove-name-button is-size-5');
    removeNameBtn.text('Remove ');
    addedName.append(removeNameBtn);
    addedNameList.append(addedName);
  }
}

// Delegates the listener to all buttons inside the parent element
// Add Event Listener to remove-name button
  addedNameList.on('click','button',function(){
  var nameToRemove = $(this).parent().text();
  // only get the name, excluding the text in remove button
  var nameRemove = nameToRemove.replace('Remove ', '');
  console.log(nameRemove);
  // Find the index of the name to remove
  let index = names.indexOf(nameRemove);
  // Remove the name from the array
  names.splice(index, 1);
  // Store the updated array of names back into local storage
  storeNames();
  // Remove the name and the wired remove button from the screen
  $(this).parent().remove();
});
  

 
/*Add Event Listeners*/
 // Add Event Listener to generate-name button
 generateBtn.click(generateBabyNames);

 // Add Event Listener to check-name-list button
 checkListBtn.click(displayAddedBabyNames);

 

//var dynamic_content = document.getElementById("dynamic_content")

var babyNameCard = $("#BabyName")
var genderInformation = $("#gender-information")
var associatedLanguages= $("#associated-languages")
var given_name_information = $("#given-name-information")
var related_names = $("#generated-related-names")
given_name_information.hide();

var getNameInformation = function(event){
    firstLoadingContainer.hide();
    generatedNameContainer.hide();
    addedNameListContainer.hide();
    given_name_information.show();

    // apply the getNameInformation function to names on every dynamic-content page
    if($(this).is('.get-name-information')){
      inputValue = $("#baby_name_input").val();
    }else if($(this).parent().is(generatedNameList)){
      inputValue = $(this).text().replace('Add ','');
      console.log($(this).text().replace('Add ',''));
    }else{
      inputValue = $(this).text().replace('Remove ','');
    }

    console.log(inputValue)
    fetch("https://www.behindthename.com/api/lookup.json?name=" + inputValue+"&key=re323908171").then(function(response){
        return response.json();
    })
    .then(function(data){
        babyNameCard.text("Baby Name:  "+ inputValue);
        console.log(data)
        if(data.error == "name could not be found"){
            nameInfoContainer.hide();
            alert.show();
            alert.text("Sorry! Name Cannot be Found in Database");
        }
        else{
            nameInfoContainer.show();
            alert.hide();
            if (data[0].gender == "f"){
                genderInformation.text("Female")
            }
            else if(data[0].gender == "mf"){
              genderInformation.text("Neutral")
            }
            else{
              genderInformation.text("Male")
            }
            var associatedLanguagesFiller = "";
            if(data[0].usages.length == 1){
                associatedLanguagesFiller = data[0].usages[0].usage_full
            }
            else{
                for(var i=0; i< data[0].usages.length;  i++){
                    associatedLanguagesFiller = associatedLanguagesFiller + data[0].usages[i].usage_full + ", "
                }
            }
            associatedLanguages.text(associatedLanguagesFiller)
        }
        fetch("https://www.behindthename.com/api/related.json?name=" +inputValue +"&usage=eng&key=re323908171").then(function(response){
          return response.json();
        })
        .then(function(data){
          console.log(data)
          console.log(data.names[0])
          related_names.html("");
          for( var i =0; i < data.names.length; i++){
            var relatedNames = $("<button>");
            relatedNames.addClass("is-size-4 mr-4");
            relatedNames.text(data.names[i]);
            related_names.append(relatedNames);
            relatedNames.on("click",relatedNamesFunction)
          }
        })
    });
    
    $("#addButton").on("click",function(){
        var nameAdd = $("#baby_name_input").val()
        console.log(nameAdd);
        if(!names.includes(nameAdd)){
          names.push(nameAdd);
          storeNames();
    }})
};

$(".get-name-information").on("click", getNameInformation);

var relatedNamesFunction = function(event){
  event.preventDefault();
  inputValue = $(this).text();
  fetch("https://www.behindthename.com/api/lookup.json?name=" + inputValue+"&key=re323908171").then(function(response){
    return response.json();
  })
  .then(function(data){
    babyNameCard.text("Baby Name: "+ inputValue);
    console.log(data)
    if(data.error == "name could not be found"){
      nameInfoContainer.hide();
      alert.show();
      alert.text("Sorry! Name Cannot be Found in Database");
    }
    else{
      nameInfoContainer.show();
      alert.hide();
      if (data[0].gender == "f"){
        genderInformation.text("Female")
      }
      else{
        genderInformation.text("Male")
      }
      var associatedLanguagesFiller = "";
      if(data[0].usages.length === 1){
        associatedLanguagesFiller = data[0].usages[0].usage_full
      }
      else{
        for(var i=0; i< data[0].usages.length;  i++){
          associatedLanguagesFiller = associatedLanguagesFiller + data[0].usages[i].usage_full + ", "
        }
      }
      associatedLanguages.text(associatedLanguagesFiller)
      }
    })
    // When user clicks the add button for any related name, it should also be stored added to the name list
    $("#addButton").on("click",function(){
      var nameAdd = $(this).parent().parent().children('#BabyName').text().replace('Baby Name: ','')
      if(!names.includes(nameAdd)){
        names.push(nameAdd);
        storeNames();
  }})
  }
  
