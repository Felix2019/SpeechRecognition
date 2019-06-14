const btn = document.querySelector('.talk')
const content = document.querySelector('.content')

const greetings = ["im good you little piece of love", "du bist hässlich"]; 

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function (){
    console.log("voice activated")
}

recognition.onresult= function (event){

    
    const current = event.resultIndex; 

    const transcript = event.results[current][0].transcript
    content.textContent = transcript
    readOutLoud(transcript)

}

// add the listener to the btn 
btn.addEventListener('click', ()=> {

    recognition.start()

})

function readOutLoud (message) {
    const speech = new SpeechSynthesisUtterance()

    speech.text = "servus"

   if(message.includes('ey')){
       const finaltext = greetings[Math.floor(Math.random() * greetings.length)]
       speech.text = finaltext
   }

    
    speech.volume = 1
    speech.rate  = 1
    speech.pitch = 1

    window.speechSynthesis.speak(speech)
}