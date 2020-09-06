const fs = require('fs');

class JsonStorage {

    // filePath - path to JSON file
    constructor(filePath) {
        this.filePath = filePath;
    }

    readItems() {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        return jsonArray.items;
    }

    // new stuff?
    get nextId() {
        const jsonArray = this.readItems();
        return jsonArray.nextId;
    }

    incrementNextId() {
        const jsonArray = this.readItems();
        jsonArray.nextId +=1;
    }
    
    writeItems(items) {
        fs.writeFileSync(this.filePath, JSON.stringify(items, null, 4));
    }

};

module.exports = JsonStorage;
