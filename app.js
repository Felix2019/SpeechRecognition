const btn = document.querySelector('.talk')
const content = document.querySelector('.content')
const alexa = document.querySelector('.alexa')
let lat;
let long;

var appKey = "7d987f8a7dc71e57baae316cb96771ed"; // wetter api key 

getGeo()

function getGeo (){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        console.log(position);
        fetchData(lat,long)

        })
    }
}

function fetchData(x,y){

    const api = "https://api.openweathermap.org/data/2.5/weather?lat=" + x + "&lon=" + y + "&appid=" + appKey;

        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var resultTemp = data.main.temp - 273.15
            resultTemp = resultTemp.toFixed(2)
            var text = " Grad Celsius "
            console.log(resultTemp)
            //alexa.textContent = resultTemp
            getData(resultTemp)
            

            
            //content.textContent = resultTemp
            
            
        })
}
        

const greetings = ["im good you little piece of love", "du bist hässlich"]; 


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function (){
    console.log("voice activated")
}

// add the listener to the btn 
btn.addEventListener('click', ()=> {
    recognition.start()
    // btn.style.background = "black"
    // alexa.style.color = "white"
    

})

function getData(temp) {
    recognition.onresult= function (event){

    const current = event.resultIndex; 

    const transcript = event.results[current][0].transcript
    btn.style.background=  "linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)";
    alexa.style.color = "white"
    content.textContent = temp
    //readOutLoud(transcript)
    
    }
}

var text ="lol"

readOutLoud(text)



function readOutLoud (message) {
    const speech = new SpeechSynthesisUtterance()

    speech.text = "Das weiß ich leider nicht"

   if(message.includes('ey')){
       const finaltext = greetings[Math.floor(Math.random() * greetings.length)]
       speech.text = finaltext
   }

    speech.volume = 1
    speech.rate  = 1
    speech.pitch = 1

    window.speechSynthesis.speak(speech)
}

