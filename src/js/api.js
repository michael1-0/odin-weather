import Loader from "./dom/Loader";

export default async function fetchData(API_KEY, location) {
  const loaderz = new Loader();
  try {
    loaderz.showLoader();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&unitGroup=metric`,
    );

    switch (response.status) {
      case 500:
        throw "A general error has occurred processing the request.";
      case 429:
        throw "The API key has exceeded its assigned limits";
      case 404:
        throw "The request cannot be matched to any valid API request endpoint structure.";
      case 401:
        throw "There is a problem with the API key, account or subscription";
      case 400:
        throw "Not found, try again.";
      default:
        break;
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return new Error(error);
  } finally {
    loaderz.hideLoader();
  }
}
