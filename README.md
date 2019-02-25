# Interaction Programing - Lab assignment - React


This project consists in a simple React app. The app will let the user dynamically construct its menu consisting of one element per each dish category ('appetizers', 'main dishes', 'desserts', etc...). After having constructed the menu, it's possible to decide for how many people to order for and view the ingredients list.

Sketches can be found at this [link](https://kth-csc.mybalsamiq.com/projects/dh2642-vt18-dinnerplanner/grid). The app was developed under the course [DH2642](https://www.kth.se/social/course/DH2642/) at [KTH](https://www.kth.se/).
## How to run the app

1. Clone the directory.

2. Add a file called _ApiKey.js_ under the _data_ directory with the following content:

```
const GROUP_NUMBER = YOUR GROUP NUMBER : INTEGER;

class ApiKey {

    constructor(){
        this._keyString = 'YOUR API KEY HERE : STRING';
        this._baseUrl = `http://sunset.nada.kth.se:8080/iprog/group/${GROUP_NUMBER}`;
    }

    getKey() {
        return this._keyString;
    }

    getUrl() {
        return this._baseUrl;
    }

}

export default ApiKey;
```

Modify the group number and the API key string.

3. 'npm start' in the project directory.