/**
 * @typedef Museum
 * @property {integer} id
 * @property {string} name.required - unique username
 * @property {string} country - some description here
 * @property {string} founded
 * @property {integer} artistNum
 * @property {integer} exhibitNum
 */
class ArtMuseum {

    constructor(id, name, country, founded, artistNum, exhibitNum) {
        this.id = id; // number
        this.name = name;  // string
        this.country = country;  // string
        this.founded = founded; // date
        this.artistNum = artistNum; // integer
        this.exhibitNum = exhibitNum; // integer
    }
};
 
 module.exports = ArtMuseum;