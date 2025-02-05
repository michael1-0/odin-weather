import CurrentConditions from "./CurrentConditions";

export default class WeatherData {
  #address;
  #weatherSummary;
  #currentConditions;
  #todayFutureWeatherDataArray;
  #timezone;

  constructor(jsonData) {
    this.#address = jsonData.resolvedAddress;
    this.#weatherSummary = jsonData.description;
    this.#currentConditions = new CurrentConditions(jsonData.currentConditions);
    this.#todayFutureWeatherDataArray = jsonData.days;
    this.#timezone = jsonData.timezone;
  }

  get address() {
    return this.#address;
  }

  set address(address) {
    this.#address = address;
  }

  get weatherSummary() {
    return this.#weatherSummary;
  }

  set weatherSummary(weatherSummary) {
    this.#weatherSummary = weatherSummary;
  }

  get currentConditions() {
    return this.#currentConditions;
  }

  /**
   * @param {CurrentConditions} currentConditions
   */
  set currentConditions(currentConditions) {
    this.#currentConditions = currentConditions;
  }

  get todayFutureWeatherDataArray() {
    return this.#todayFutureWeatherDataArray;
  }

  set todayFutureWeatherDataArray(todayFutureWeatherDataArray) {
    this.#todayFutureWeatherDataArray = todayFutureWeatherDataArray;
  }

  get timezone() {
    return this.#timezone;
  }

  set timezone(timezone) {
    this.#timezone = timezone;
  }
}
