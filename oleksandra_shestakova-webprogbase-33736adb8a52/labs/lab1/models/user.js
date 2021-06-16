
class User {

    constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
        this.id = id; // number
        this.login = login;  // string
        this.fullname = fullname;  // string
        this.role = role; //integer
        this.registeredAt = registeredAt; //date
        this.avaUrl = avaUrl; //string
        this.isEnabled = isEnabled; //boolean
    }
};
 
 module.exports = User;
 