const GROUP_NUMBER = 64;

class ApiKey {

    constructor(){
        this._keyString = '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767';
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