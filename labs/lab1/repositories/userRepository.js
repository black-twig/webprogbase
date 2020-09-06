const colors=require('colors');

const User = require('../models/user');
const JsonStorage = require('../jsonStorage');


 
class UserRepository {
 
    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }
 
    getUsers() { 
        console.log('ITEMS'.bgGreen);
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
 
    getUserById(id) {
        // const items = this.storage.readItems();
        // for (const item in Object.values(items)) {
        //     console.log("the item");
        //     console.log(item);
        //     if (item.id === id) {
        //         console.log("found");
        //         return new User(item.id, item.login, item.fullname, 
        //                         item.role, item.registeredAt, 
        //                         item.avaUrl, item.isEnabled);
        //     }
        // }
        const users = this.getUsers();
        for(const user of users)
        {
            if(user.id === id) {
                        console.log('found'.green);
                        return new User(user.id, user.login, user.fullname, 
                            user.role, user.registeredAt, 
                            user.avaUrl, user.isEnabled);
                    }
        }
        return null;
    }
    
    addUser(userModel) {
        throw new Error("Not implemented"); 
    }
 
    updateUser(userModel) {
        throw new Error("Not implemented"); 
    }
 
    deleteUser(userId) {
        throw new Error("Not implemented"); 
    }

};
 
module.exports = UserRepository;

