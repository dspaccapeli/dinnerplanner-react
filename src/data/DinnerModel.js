import ObservableModel from "./ObservableModel";
/* Import .gitignore'd ApiKey.js */
import ApiKey from "./ApiKey";

/* Setup the API parameters */
const apiKey = new ApiKey();
const BASE_URL = apiKey.getUrl();
const httpOptions = {
  headers: { "X-Mashape-Key": apiKey.getKey() }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 1;
    this.getNumberOfGuests();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  static processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export _an_ instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
