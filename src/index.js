import "./css/reset.css";
import "./styles.css";
import fetchData from "./js/api";
import WeatherData from "./js/weather-data/WeatherData";
import DomHandler from "./js/DomHandler";

const App = (async () => {
  const API_KEY = "XJ35PSQF5SN7BMRES7YCDAC4G";
  const initialState = new DomHandler(
    new WeatherData(await fetchData(API_KEY, "indonesia")),
  );
  initialState.constructDom();
  const userInputState = async () => {
      try {
        const userInput = document.getElementById("locationInput");
        userInput.setCustomValidity("");

        if (userInput.value === "") {
          userInput.setCustomValidity("Value missing");
          userInput.reportValidity();
          return;
        }

        const inputValue = userInput.value;
        const apiQuery = await fetchData(API_KEY, inputValue);

        if (apiQuery instanceof Error) {
          throw apiQuery.message;
        }

        const weatherDataObject = new WeatherData(apiQuery);

        const domHandlerObject = new DomHandler(weatherDataObject);
        domHandlerObject.constructDom();
      } catch (error) {
        document
          .getElementById("locationInput")
          .setCustomValidity(new Error(error));
        document.getElementById("locationInput").reportValidity();
      }
    };

  document.getElementById("locationInput").addEventListener("input", () => {
    const userInput = document.getElementById("locationInput");
    userInput.setCustomValidity("");

    if (userInput.value === "") {
      userInput.setCustomValidity("Value missing");
      userInput.reportValidity();
    }
  });

  document
    .getElementById("buttonSearch")
    .addEventListener("click", userInputState);

  document.getElementById("locationInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      userInputState();
    }
  })
})();

// const weatherDataObject = new WeatherData(data);

// console.log(weatherDataObject);
