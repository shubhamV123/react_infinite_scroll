// import _ from 'lodash';

class UrlGenerate {
    constructor(text, perPage, page) {
        this.text = text;
        this.perPage = perPage;
        this.page = page;
    }
    generateUrl() {
        return "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=71e01db7d4b688a757bc29236f7af4bc&text=" + this.text + "&per_page=" + this.perPage + "&page=" + this.page + "&format=json&nojsoncallback=1";
    }
}

class ImageUrlGenerate {
    constructor(farm, serverId, id, secret, size) {
        this.farm_id = farm;
        this.server_id = serverId;
        this.id = id;
        this.secret = secret;
        this.size = size !== undefined ? size : 'z';

    }

    generateImageSrcURL() {
        return `https://farm${this.farm_id}.staticflickr.com/${this.server_id}/${this.id}_${this.secret}_${this.size}.jpg`;
    }
}
class SaveInfo {
    constructor(value) {
        this.value = value;
    }

    setInfo() {
        let arr = this.getInfo() !== null ? JSON.parse(this.getInfo()) : [];
        //avoid duplicates 
        if (!arr.includes(this.value)) {
            arr.push(this.value)
            localStorage.setItem('Search', JSON.stringify(arr))
        }

    }

    getInfo() {
        return localStorage.getItem('Search');
    }
}
class SuggestionList {
    constructor(val) {
        this.val = val;
    }
    filterResult(result){
       if(result!=null){
        let array = result.filter(data => {
            let reg = new RegExp(this.val,'gi')
            if(data.search(reg)>=0){
                return true;
            }
            else {
                return false;
            }
        });
        return array;
       }
       else{
           return [];
       }
    }
    showSuggestion() {
        let getInfoFromLocalStorage = JSON.parse(localStorage.getItem('Search'));
        return this.filterResult(getInfoFromLocalStorage);
    }
}

module.exports = {
    UrlGenerate,
    ImageUrlGenerate,
    SaveInfo,
    SuggestionList
}