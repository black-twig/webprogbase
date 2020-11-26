const UserRepository = require('../repositories/userRepository');
const userProperty = Symbol('user');
const userRepository = new UserRepository('data/users.json');

module.exports = {
    getUsers(req, res) {
        const page = Number(req.query.page);
        const perPage = Number(req.query.per_page);
        const users = userRepository.getUsers();
        if (page && perPage) { 
            res.send(users.slice((page-1)*perPage, page*perPage));
        }
        else
            res.send(users);
        res.end();
    },
    getUserById(req, res) {
        res.send(req[userProperty]);
        res.end();
    },
    getUserByIdHandler(req, res, next) {
        const user = userRepository.getUserById(parseInt(req.params.id));
        if (user) {
            req[userProperty] = user;
            next();
        }
        else
            res.sendStatus(404);
    }
};