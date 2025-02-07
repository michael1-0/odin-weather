export default class CurrentConditions {
  #icon;
  #temp;
  #conditions;
  #feelsLike;
  #precipProb;
  #precipType;

  constructor(currentConditionsObject) {
    this.#icon = currentConditionsObject.icon;
    this.#conditions = currentConditionsObject.conditions;
    this.#temp = currentConditionsObject.temp;
    this.#feelsLike = currentConditionsObject.feelslike;
    this.#precipProb = currentConditionsObject.precipprob;
    this.#precipType = currentConditionsObject.preciptype;
  }

  get icon() {
    return this.#icon;
  }

  set icon(icon) {
    this.#icon = icon;
  }

  get temp() {
    return this.#temp;
  }

  set temp(temp) {
    this.#temp = temp;
  }

  get conditions() {
    return this.#conditions;
  }

  set conditions(conditions) {
    this.#conditions = conditions;
  }

  get feelsLike() {
    return this.#feelsLike;
  }

  set feelsLike(feelsLike) {
    this.#feelsLike = feelsLike;
  }

  get precipProb() {
    return this.#precipProb;
  }

  set precipProb(precipProb) {
    this.#precipProb = precipProb;
  }

  get precipType() {
    return this.#precipType;
  }

  set precipType(precipType) {
    this.#precipType = precipType;
  }
}
