import snowSvg from "../img/snow.svg";
import rainSvg from "../img/rain.svg";
import fogSvg from "../img/fog.svg";
import windSvg from "../img/wind.svg";
import cloudySvg from "../img/cloudy.svg";
import partlyCloudyDaySvg from "../img/partly-cloudy-day.svg";
import partlyCloudyNightSvg from "../img/partly-cloudy-night.svg";
import clearDaySvg from "../img/clear-day.svg";
import clearNightSvg from "../img/clear-night.svg";

export default class DomHandler {
  constructor(weatherData) {
    this.weatherData = weatherData;
    this.resolvedAddressContainer = document.querySelector(".address");
    this.currentConditionsContainer = document.querySelector(
      ".current-conditions",
    );
    this.weatherSummaryContainer = document.querySelector(".weather-summary");
    this.todayFutureDataContainer =
      document.querySelector(".today-future-data");
  }

  constructDom() {
    this.resetDom();
    this.constructResolvedAddress();
    this.constructCurrentConditions();
    this.constructWeatherSummary();

    // Construct .today-future-data container
  }

  constructResolvedAddress() {
    const divResolvedAddress = document.createElement("div");
    divResolvedAddress.textContent = this.weatherData.address;

    this.resolvedAddressContainer.appendChild(divResolvedAddress);
  }

  constructCurrentConditions() {
    const imgCurrentConditions = document.createElement("img");
    imgCurrentConditions.classList.add("current-conditions-icon");
    imgCurrentConditions.src = this.determineIcon(
      this.weatherData.currentConditions.icon,
    );
    imgCurrentConditions.alt = "Weather current condition icon";

    const containerCurrentData = document.createElement("div");
    containerCurrentData.classList.add("current-data-container");

    const divConditions = document.createElement("div");
    divConditions.textContent = this.weatherData.currentConditions.conditions;

    const divTemp = document.createElement("div");
    divTemp.classList.add("value");
    divTemp.textContent = `${this.weatherData.currentConditions.temp} °C`;

    const divFeelsLike = document.createElement("div");
    divFeelsLike.classList.add("value");
    divFeelsLike.textContent = `Feels like ${this.weatherData.currentConditions.feelsLike} °C`;

    containerCurrentData.append(divConditions, divTemp, divFeelsLike);

    this.currentConditionsContainer.append(
      imgCurrentConditions,
      containerCurrentData,
    );
  }

  constructWeatherSummary() {
    const divWeatherSummaryText = document.createElement("div");
    divWeatherSummaryText.textContent = `"${this.weatherData.weatherSummary}"`;

    this.weatherSummaryContainer.appendChild(divWeatherSummaryText);
  }

  determineIcon(iconText) {
    let icon;

    switch (iconText) {
      case "snow":
        icon = snowSvg;
        break;

      case "rain":
        icon = rainSvg;
        break;

      case "fog":
        icon = fogSvg;
        break;

      case "wind":
        icon = windSvg;
        break;

      case "cloudy":
        icon = cloudySvg;
        break;

      case "partly-cloudy-day":
        icon = partlyCloudyDaySvg;
        break;

      case "partly-cloudy-night":
        icon = partlyCloudyNightSvg;
        break;

      case "clear-day":
        icon = clearDaySvg;
        break;

      case "clear-night":
        icon = clearNightSvg;
        break;

      default:
        break;
    }

    return icon;
  }

  resetDom() {
    this.resolvedAddressContainer.innerHTML = "";
    this.currentConditionsContainer.innerHTML = "";
    this.weatherSummaryContainer.innerHTML = "";
    this.todayFutureDataContainer.innerHTML = "";
  }
}
