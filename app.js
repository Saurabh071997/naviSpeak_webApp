var textInput = document.querySelector("#txt-input");
var btnTranslate = document.querySelector("#btn-translate");
var outputDiv = document.querySelector("#txt-output");
var btnSpeak = document.querySelector("#btn-speak");
var outputText="";

var serverUrl = "https://api.funtranslations.com/translate/navi.json";

function generateUrl(inputText){
    return serverUrl + "?" +  "text=" + inputText;
}

function errorHandler(){
    swal({
        title: "Server Error",
        text: "There is some issue connecting the server. Try again later !! ",
        icon: "warning",
        button: "OK",
      });
}

function clickHandler(){
    var inputText = textInput.value ;

    fetch(generateUrl(inputText))
    .then(response => response.json())
    .then(json => {
        outputText = json.contents.translated;
        outputDiv.innerText = outputText;
    })
    .catch(errorHandler);
}

function txtToAudio(){
    if ('speechSynthesis' in window) {
        var msg = outputText;
        var speech = new SpeechSynthesisUtterance();
        speech.lang = "en-US";
        speech.text = msg;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 2;
        window.speechSynthesis.speak(speech);

       }
       else{
        swal({
            title: "Browser Error",
            text: "This browser doesn't support Text-to_Audio ",
            icon: "warning",
            button: "OK",
          });
       }
       
                
}

btnTranslate.addEventListener("click", clickHandler);
btnSpeak.addEventListener("click", txtToAudio);