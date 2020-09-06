const message = "This is lab1!";
const colors=require('colors');
console.log(message);

// використання jsonStorage.js - 
// Клас сховища для JSON файлу елементів 
// будь-якого типу

const JsonStorage = require('./jsonStorage');
 
const userStorage = new JsonStorage('./data/users.json');
console.log(userStorage.readItems());





// використання userRepository.js - 
// Синхронний репозиторій користувачів

const UserRepository = require('./repositories/userRepository');
 
const userRepository = new UserRepository('./data/users.json');
console.log(userRepository.getUserById(0));
console.log(userRepository.getUsers());
// null





// Приклад консольного додатку
// Нехай потрібно реалізувати консольну програму для керування сутностями типу Користувач.
// Нехай текстові команди користувача будуть у вигляді рядка "команда:дані", наприклад "user:1" або "users".

// Код:
const userController = require('./controllers/userController');
const Router = require('./router');
 
const router = new Router();
router.use("users", userController.getUsers);
router.use("user", userController.getUser);
 
process.stdin.on("data", onInput);
console.log("Enter your command: ");
 
function onInput(data) {
    const text = data.toString().trim();
    // example: "user:1"
    const parts = text.split(":");
    const command = parts[0];
    //
    const input = parts[1];
    const output = function (message) { 
        console.log(message); 
    };
    router.handle(command, input, output);
    console.log("Enter your command: ");
}

