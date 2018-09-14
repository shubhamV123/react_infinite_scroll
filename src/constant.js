class UrlGenerate{
    constructor(text,perPage,page){
        console.log(text,perPage,page)
        this.text = text;
        this.perPage = perPage;
        this.page = page;
    }
  generateUrl(){
  	return "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ae0d4d212c384a6e6993bf226c78688d&text="+this.text+"&per_page="+this.perPage+"&page="+this.page+"&format=json&nojsoncallback=1";
  }
}

class ImageUrlGenerate{
    constructor(farm,serverId,id,secret,size){
        this.farm_id = farm;
        this.server_id = serverId;
        this.id = id;
        this.secret = secret;
      	this.size = size!=undefined?size:'z';

    }

    generateImageSrcURL(){
        return `https://farm${this.farm_id}.staticflickr.com/${this.server_id}/${this.id}_${this.secret}_${this.size}.jpg`;
    }
}


module.exports = {
    UrlGenerate,
    ImageUrlGenerate
}