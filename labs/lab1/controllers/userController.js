const UserRepository = require('../repositories/userRepository');
 
const userRepository = new UserRepository("data/users.json");
 
module.exports = {
 
   /* getUsers(input, output) {
        throw new Error("Not implemented");
    }, */
 
    getUser(input, output) {
        const userId = parseInt(input);
        const user = userRepository.getUserById(userId);
        if (!user) {
            output(`Error: user with id ${userId} not found.`);
            return;
        }
        output(`User: ${user.login} "${user.fullname}"`);
    },
};

