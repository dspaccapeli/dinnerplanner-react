import ObservableModel from "./ObservableModel";
/* Import .gitignore'd ApiKey.js */
import ApiKey from "./ApiKey";

/* Setup the API parameters */
const apiKey = new ApiKey();
const BASE_URL = apiKey.getUrl();
const httpOptions = {
    headers: { "X-Mashape-Key": apiKey.getKey() }
};
const resultNumber = 20;

class DinnerModel extends ObservableModel {
    constructor() {
        super();
        this._numberOfGuests = 1;
        this.getNumberOfGuests();

        /* Defined by us to replicate the previous DinnerModel behavior */
        if(localStorage){
            this.menu = [];
            this.chosenDish = 262682;
            this.chosenDishDetails = {};
        }else{
            this.menu = [];
            this.chosenDish = 262682;
            this.chosenDishDetails = {};
        }

        this.lastType = "All";
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
            number: resultNumber,
            query: filter,
            type: type.toLowerCase(),
        };

        this.lastType = params[type];

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
                    resultDict.type = this.lastType;
                    resultDict.image = responseJson.baseUri + result.image;
                    returnDict.push(resultDict);
                });
                return returnDict;
            });
    };

    getAllTypes () {
        return this.getAllDishes('All', '');
    };

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
                dish.type = this.lastType;
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
    };

    addDishToMenu (id) {
        if (this.getChosenDishDetails() === undefined) {
            this.getDish(id).then(toAdd => {
                let newMenu = [];
                this.menu.forEach((entry) => {
                    newMenu.push(entry);
                });
                newMenu.push(toAdd);
                this.menu = newMenu;
                this.notifyObservers("addedToMenu");
            });
        } else {
            this.menu.push(this.getChosenDishDetails());
            this.notifyObservers("addedToMenu");
        }
    };

    getTotalMenuPrice () {
        let totalMenuPrice = 0;
        this.getAllIngredients().forEach((entry) => {
            totalMenuPrice = totalMenuPrice + entry.price;
        });
        return totalMenuPrice*this.getNumberOfGuests();
    };

    getChosenDishId (){
        return this.chosenDish;
    };

    getChosenDishDetails () {
        return this.chosenDishDetails;
    };

    setChosenDishDetails = function(dish) {
        this.chosenDishDetails = dish;
    };

    getFullMenu = function() {
        return this.menu;
    };


    getAllIngredients = function() {
        let allIngredients = [];
        this.menu.forEach((entry) => {
            entry.ingredients.forEach((ingredient) =>{
                allIngredients.push(ingredient);
            });
        });
        return allIngredients;
    };

    /* Helper functions */
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
