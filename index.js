let url="https://api.openweathermap.org/data/2.5/weather?q=multan&appid=a8c17aeec78c35470913a61cb19da831";
let inputel=document.getElementById("input");
let gettel=document.getElementById("get");
let iconel=document.getElementById("icon");
let tempel=document.getElementById("temp");
let descel=document.getElementById("desc");
let feellikeel=document.getElementById("feellike");
let hmel=document.getElementById("hm");
let wsel=document.getElementById("ws");
let detailel=document.getElementById("detail");
let downel=document.getElementById("down");
let loadel=document.getElementById("load");
let dateel=document.getElementById("date");
let sunriseel=document.getElementById("sunrise");
let sunsetel=document.getElementById("sunset");

inputel.addEventListener('keypress',(e)=>{

    
    if ((e.key=='Enter') && (inputel.value!="")) {
        
        getw();
    }
})

gettel.addEventListener('click',(e)=>{

      if ((inputel.value!="")) {
        
        getw();
    }
})

function gettime(time){
    let unix_timestamp = time
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
hours=hours<10?'0'+hours:hours;
var ampm='am'
if (hours>12) {
    ampm='pm'
}
hours = hours % 12;
hours = hours ? hours : 12;
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
minutes=minutes<10?'0'+minutes:minutes;
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();



// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) +ampm;

return formattedTime;
}
async function getw(){
    
    try {
        loadel.innerText="*__*"
        let result= await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${inputel.value}&appid=a8c17aeec78c35470913a61cb19da831`)

        if (result.ok) {
            detailel.classList.add('hidden')
            downel.classList.remove('hidden')
            let response =  await result.json()
            let src= `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`
            await fetch(src);
            let sunrise= gettime(response.sys.sunrise)
            let sunset= gettime(response.sys.sunset)
            loadel.innerText=`${response.name}__${response.sys.country}`

          iconel.src=src; 

          
          let temp=(response.main.temp-273.2).toFixed(2)
         
         tempel.innerText=temp
         descel.innerText=response.weather[0].description
         let feels= (response.main.feels_like-273.2).toFixed(2)

         feellikeel.innerText=`Feel Like: ${feels}`
         hmel.innerText=`Humidity: ${response.main.humidity}`
         
         wsel.innerText=`Wind Speed: ${response.wind.speed} `
         sunriseel.innerText=sunrise
         sunsetel.innerText=sunset
        }
        else
        if(!result.ok){
            detailel.classList.remove('hidden')
            detailel.innerText="+__+"
            loadel.innerText="Cant get the desired location "
            downel.classList.add('hidden')
        }
        
    } catch (error) {
        
        detailel.classList.remove('hidden')
        downel.classList.add('hidden')
        loadel.innerText=""
        // throw new error(cant get it no)
    }
}
setInterval(() => {
    
    let date=new Date()
    dateel.innerText=date
   
}, 1000);