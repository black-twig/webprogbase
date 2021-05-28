const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository('data/users.json');

module.exports = {
    getUsers(req, res) {
        try {
        const users = userRepository.getUsers();
            
        res.status(200).render('users', { users: users});

        } catch (err) {

            console.log(err.message);
            res.status(500).send({ users: null, message: 'Server error.' });

        }

    },
    getUserById(req, res) {
        console.log(req.params.id);

        const user = userRepository.getUserById(parseInt(req.params.id));


        if (user) {

            res.status(200).render('user', { user: user });

        }
        else {

            res.status(404).send({ photo: null, message: "User id is incorrect." });

        }
    }
};