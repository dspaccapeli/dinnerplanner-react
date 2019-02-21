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

    /* Defined by us to replicate the previous DinnerModel behavior */
    this.menu = [
        {'id':1,
            'name':'French toast',
            'type':'starter',
            'image':'toast.jpg',
            'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
            'ingredients':[{
                'name':'eggs',
                'quantity':0.5,
                'unit':'',
                'price':10
            },{
                'name':'milk',
                'quantity':30,
                'unit':'ml',
                'price':6
            },{
                'name':'brown sugar',
                'quantity':7,
                'unit':'g',
                'price':1
            },{
                'name':'ground nutmeg',
                'quantity':0.5,
                'unit':'g',
                'price':12
            },{
                'name':'white bread',
                'quantity':2,
                'unit':'slices',
                'price':2
            }]
        },
        {'id':2,
            'name':'Sourdough Starter',
            'type':'starter',
            'image':'sourdough.jpg',
            'description':"Here is how you make it... Lore ipsum...",
            'ingredients':[{
                'name':'active dry yeast',
                'quantity':0.5,
                'unit':'g',
                'price':4
            },{
                'name':'warm water',
                'quantity':30,
                'unit':'ml',
                'price':0
            },{
                'name':'all-purpose flour',
                'quantity':15,
                'unit':'g',
                'price':2
            }]
        }
        ];

    this.resultNumber = 20;
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
  getAllDishes (type, filter) {
    const url = `${BASE_URL}/recipes/search`;
    // Verify if the search is parametrized
    if(type === "All" || type === undefined){
        type = ' ';
    }
    // Create the URL parameter list
    let searchUrl = new URL(url);
    // Create the URL parameter list
    let params = {
          number: this.resultNumber,
          query: filter,
          type: type.toLowerCase(),
    };

    // Append parameters to the URL in the js way
    Object.keys(params).forEach(key => searchUrl.searchParams.append(key, params[key]));

    return fetch(searchUrl.toString(), httpOptions)
        .then(this.processResponse)
        .then(responseJson => {
            let returnDict = [];
            let resultDict = {};
            responseJson.results.forEach(result => {
                resultDict = {};
                resultDict.id = result.id;
                resultDict.name = result.title;
                resultDict.type = params[type];
                resultDict.image = responseJson.baseUri + result.image;
                returnDict.push(resultDict);
            });
            return returnDict;
        });
  }

  getDish (id) {
      let dish = {};

      return fetch(`${BASE_URL}/recipes/${id}/information`, httpOptions)
          .then(this.processResponse)
          .then(data => {

              let returnDict = [];
              let resultDict = {};
              data.extendedIngredients.forEach(result => {
                  resultDict = {};
                  resultDict.name = result.name;
                  resultDict.quantity = result.amount;
                  resultDict.unit = result.unit;
                  resultDict.price = 1;
                  returnDict.push(resultDict);
              });
              dish.ingredients = returnDict;

              dish.id = data.id;
              dish.name = data.title;
              dish.type = 'useless';
              dish.image = data.image;

              return dish;
          })
          .then(dish => {
              return fetch(`${BASE_URL}/recipes/${dish.id}/summary`, httpOptions)
                  .then(this.processResponse)
                  .then(data => {
                      dish.description = data.summary;
                      this.setChosenDishDetails(dish);
                      return dish;
                  })
          });
  }

  processResponse = response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  };
}

// Export _an_ instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
