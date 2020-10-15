const colors=require('colors');

const User = require('../models/user');
const JsonStorage = require('../jsonStorage');


 
class UserRepository {
 
    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }
 
    getUsers() { 
        console.log('getUsers'.bgGreen);
        const items = this.storage.readItems();
        let users = [];
        for (const item of Object.values(items)) {
            users.push(new User(
                    item.id, item.login, item.fullname, 
                    item.role, item.registeredAt, 
                    item.avaUrl, item.isEnabled));
        }
        return users;
    }
 
    getUserById(userid) {
        const users = this.getUsers();
        for(const user of users)
        {
            if(user.id === userid) {
                        console.log('found'.green);
                        return new User(user.id, user.login, user.fullname, 
                            user.role, user.registeredAt, 
                            user.avaUrl, user.isEnabled);
                    }
        }
        return null;
    }
};
 
module.exports = UserRepository;

