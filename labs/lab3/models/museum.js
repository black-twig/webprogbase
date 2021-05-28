/**
 * @typedef Museum
 * @property {integer} id.required
 * @property {string} name.required - unique username
 * @property {string} country - some description here
 * @property {string} founded
 * @property {integer} artistNum
 * @property {integer} exhibitNum
 * @property {string} imageUrl
 */
class ArtMuseum {

    constructor(id, name, country, founded, artistNum, exhibitNum, imageUrl) {
        this.id = id; // number
        this.name = name;  // string
        this.country = country;  // string
        this.founded = founded; // date
        this.artistNum = artistNum; // integer
        this.exhibitNum = exhibitNum; // integer
        this.imageUrl = imageUrl; //string
    }
};
 
 module.exports = ArtMuseum;