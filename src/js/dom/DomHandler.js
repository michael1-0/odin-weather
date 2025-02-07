import snowSvg from "../../img/snow.svg";
import rainSvg from "../../img/rain.svg";
import fogSvg from "../../img/fog.svg";
import windSvg from "../../img/wind.svg";
import cloudySvg from "../../img/cloudy.svg";
import partlyCloudyDaySvg from "../../img/partly-cloudy-day.svg";
import partlyCloudyNightSvg from "../../img/partly-cloudy-night.svg";
import clearDaySvg from "../../img/clear-day.svg";
import clearNightSvg from "../../img/clear-night.svg";

export default class DomHandler {
  constructor(weatherData) {
    this.weatherData = weatherData;

    // Weather container pointers
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
    this.constructTodayFutureData();
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

    const divTime = document.createElement("div");
    divTime.classList.add("time-timezone");
    divTime.textContent = this.determineTime(this.weatherData.timezone);

    // If precip exists
    if (!(this.weatherData.currentConditions.precipType === null)) {
      const divPrecipProb = document.createElement("div");
      divPrecipProb.textContent = `${this.weatherData.currentConditions.precipProb}% of ${this.weatherData.currentConditions.precipType.join(", ")} to happen`;
      containerCurrentData.append(divConditions, divTemp, divFeelsLike, divTime, divPrecipProb);

      this.currentConditionsContainer.append(
        imgCurrentConditions,
        containerCurrentData,
      );

      return;
    }

    containerCurrentData.append(divConditions, divTemp, divFeelsLike, divTime);

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

  constructTodayFutureData() {
    for (let i = 0; i < 6; i++) {
      const data = this.weatherData.todayFutureWeatherDataArray[i];

      const divCardContainer = document.createElement("div");
      divCardContainer.classList.add("card");

      const divDay = document.createElement("div");
      if (i === 0) divDay.textContent = "Today";
      else if (i === 1) divDay.textContent = "Tomorrow";
      else divDay.textContent = this.determineDay(data.datetime);
      const divConditions = document.createElement("div");
      divConditions.textContent = data.conditions;

      const imgIcon = document.createElement("img");
      imgIcon.src = this.determineIcon(data.icon);
      imgIcon.alt = "Today future weather icon";

      const divMinTemp = document.createElement("div");
      divMinTemp.classList.add("value");
      divMinTemp.textContent = `Min Temp: ${data.tempmin} °C`;

      const divAvgTemp = document.createElement("div");
      divAvgTemp.classList.add("value");
      divAvgTemp.textContent = `Avg Temp: ${data.temp} °C`;

      const divMaxTemp = document.createElement("div");
      divMaxTemp.classList.add("value");
      divMaxTemp.textContent = `Max Temp: ${data.tempmax} °C`;

      const divDate = document.createElement("div");
      divDate.textContent = data.datetime;

      divCardContainer.append(
        divDay,
        divConditions,
        imgIcon,
        divMinTemp,
        divAvgTemp,
        divMaxTemp,
        divDate,
      );

      this.todayFutureDataContainer.appendChild(divCardContainer);
    }
  }

  determineTime(timezone) {
    const options = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(new Date());

    const hours = parts.find((part) => part.type === "hour").value;
    const minutes = parts.find((part) => part.type === "minute").value;
    const period = parts.find((part) => part.type === "dayPeriod").value;

    return `${hours}:${minutes} ${period}`;
  }

  determineDay(date) {
    const [year, month, day] = date.split("-");
    const dateObj = new Date(year, month - 1, day);

    const options = { weekday: "long" };
    return dateObj.toLocaleDateString("en-us", options);
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
