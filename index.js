//API KEY -->e819e126e4ee26c72ded5a66893e54ee

const cityname = document.querySelector(".cityname");
const datetimename = document.querySelector(".time_date");
const cloudnamename = document.querySelector(".cloudname");
const iconvalue = document.querySelector(".icon");
const hole_degname = document.querySelector(".hole_deg");
const minname = document.querySelector(".min");
const maxname = document.querySelector(".max");
const felltempname = document.querySelector(".fLtem");

const fLhumidityname = document.querySelector(".fLhumidity");
const fLwindname = document.querySelector(".fLwind");
const fLpressurename = document.querySelector(".fLpressure");
const form_inputvalue = document.querySelector(".form_input");

let city = "indore";
//search functionality.
form_inputvalue.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputfield = document.querySelector(".inputfeild");
  city = inputfield.value;
  weatherfun();
  inputfield.value = "";
});

// to get actual country name
const getCountName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};
//to get actual time or date.
const getDateTime = (dt) => {
  const timedata = new Date(dt * 1000); //to convert second to milliseconds;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(timedata);
};

const weatherfun = async () => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e819e126e4ee26c72ded5a66893e54ee`;
  try {
    const fetchAPI = await fetch(url);
    const fetchdata = await fetchAPI.json();
    console.log(fetchdata);
    const { main, name, weather, wind, sys, dt } = fetchdata;

    cityname.innerHTML = `${name}, ${getCountName(sys.country)}`;
    datetimename.innerHTML = getDateTime(dt);
    cloudnamename.innerHTML = weather[0].main;
    iconvalue.innerHTML = `<img class="imgicon" src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="icon">`;

    hole_degname.innerHTML = `${main.temp}&#176`;
    minname.innerHTML = `Min:${main.temp_min.toFixed()}&#176`;
    maxname.innerHTML = `Max:${main.temp_max.toFixed()}&#176`;
    felltempname.innerHTML = `${main.feels_like.toFixed()}&#176`;
    fLhumidityname.innerHTML = `${main.humidity}%`;
    fLwindname.innerHTML = `${wind.speed} m/s`;
    fLpressurename.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log("this is an error");
  }
};

document.body.addEventListener("load", weatherfun());
