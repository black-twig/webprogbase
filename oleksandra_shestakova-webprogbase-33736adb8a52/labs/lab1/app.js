
const colors = require('colors');
const UserRepository = require('./repositories/userRepository');
const ArtMuseumRepository = require('./repositories/art_museumRepository');
const JsonStorage = require('./jsonStorage');

const userStorage = new JsonStorage('./data/users.json');
const userRepository = new UserRepository('./data/users.json');

const artMuseumStorage = new JsonStorage('./data/art_museums.json');
const artMuseumRepository = new ArtMuseumRepository('./data/art_museums.json');

const readline = require('readline-sync');
const ArtMuseum = require('./models/art_museum');

while (true) {
    const text = readline.question("Enter your command:");

    const parts = text.split("/");
    const command = parts[0] + '/' + parts[1] + '/' + parts[2];
    const input = parts[3];
    //exit
    //command to exit programm
    if (text.toLowerCase() === "exit") {
        console.log('exiting...'.zalgo);
        return;
    }
    //users/get/all
    //command to get short info abt all usrs
    else if (command === "users/get/all") {
        let users = userRepository.getUsers();

        let out = 'All users:';
        for (const user of users) {
            const usrlog = user.login.length;
            out = out + "\n\n" + user.login + " -> fullname: "
                + user.fullname + "\n" + `role: ${user.role}`.padStart(usrlog + 11, "-");
        }
        console.log(out);
    }
    //users/get/id
    //command to get full info abt 1 user
    else if (command === "users/get/id") {
        const userId = parseInt(input);
        const user = userRepository.getUserById(userId);
        if (!user) {
            console.log(`Error: user with id ${userId} was not found.`.red);
            continue;
        }
        console.log(`User (${user.id}):`.bold + `
        login: ${user.login} 
        role: ${user.role}
        fullname: ${user.fullname}
        registered at: ${new Date(user.registeredAt)}
        avatar: ${user.avaUrl}`);
    }
    //artmuseums/get/all
    //command to get short info abt all art museum
    else if (command === "artmuseums/get/all") {
        let artMuseums = artMuseumRepository.getArtMuseums();

        let out = 'All art museums:';
        for (const artMuseum of artMuseums) {
            out = out + "\n" + artMuseum.name + " -> " + artMuseum.country;
        }
        console.log(out);
    }
    //artmuseums/get/id
    //command to get full info abt 1 art museum
    else if (command === "artmuseums/get/id") {
        const artMuseumId = parseInt(input);
        const artMuseum = artMuseumRepository.getArtMuseumById(artMuseumId);
        if (!artMuseum) {
            console.log(`Error: art museum with id ${artMuseumId} was not found.`.red);
            continue;
        }
        const foundedDate = new Date(artMuseum.founded);
        console.log(`ArtMuseum (${artMuseum.id}):`.bold + `
        name: ${artMuseum.name} 
        country: ${artMuseum.country}
        founded: ${foundedDate.getFullYear()}
        artists: ${artMuseum.artistNum}
        exhibits: ${artMuseum.exhibitNum}`);
    }
    //artmuseums/add
    //command to add new art museum to file
    else if (parts[0] + '/' + parts[1] === "artmuseums/add") {
        console.log("Creating new art museum:");
        let artMuseum = new ArtMuseum();
        let array = Object.getOwnPropertyNames(artMuseum);
        let answers = [];
        for (let i = 1; i <= 5; i++) {
            if (i === 3) {
                let answer = [];
                while (isNaN(answer[0]) || isNaN(answer[1]) || isNaN(answer[2])) {
                    console.log('When founded (numbers):'.bgCyan);
                    answer[0] = readline.question('year:');
                    answer[1] = readline.question('month:');
                    answer[2] = readline.question('day:');
                }
                answers[3] = new Date(Number(answer[0]),
                    Number(answer[1]) - 1, Number(answer[2]) + 1).toISOString();
                continue;
            }
            else if (i === 4 || i === 5) {
                while (isNaN(answers[i])) {
                    answers[i] = readline.question(array[i] + ' ' + '(numbers):'.bgCyan);
                }
                continue;
            }
            answers[i] = readline.question(array[i] + ':');
        }
        artMuseum = new ArtMuseum(-1, answers[1],
            answers[2], answers[3],
            Number(answers[4]), Number(answers[5]));
        if (!artMuseumRepository.addArtMuseum(artMuseum)) {
            console.error(`Given art museum was not created.`.red);
        }
        else{
            console.log(`Art museum successfully created`.green);
        }
    }
    //artmuseums/update/id
    //command to update an art museum
    else if (command === "artmuseums/update/id") {
        const artMuseumId = parseInt(input);
        console.log("Updating art museum:");
        let artMuseum = new ArtMuseum();
        let array = Object.getOwnPropertyNames(artMuseum);
        let answers = [];
        for (let i = 1; i <= 5; i++) {
            if (i === 3) {
                let answer = [];
                while (isNaN(answer[0]) || isNaN(answer[1]) || isNaN(answer[2])) {
                    console.log('When founded (numbers):'.bgCyan);
                    answer[0] = readline.question('year:');
                    answer[1] = readline.question('month:');
                    answer[2] = readline.question('day:');
                }
                answers[3] = new Date(Number(answer[0]),
                    Number(answer[1]) - 1, Number(answer[2]) + 1).toISOString();
                continue;
            }
            else if (i === 4 || i === 5) {
                while (isNaN(answers[i])) {
                    answers[i] = readline.question(array[i] + ' ' + '(numbers):'.bgCyan);
                }
                continue;
            }
            answers[i] = readline.question(array[i] + ':');
        }
        artMuseum = new ArtMuseum(artMuseumId, answers[1],
            answers[2], answers[3],
            Number(answers[4]), Number(answers[5]));
        if (!artMuseumRepository.updateArtMuseum(artMuseum)) {
            console.error(`Given art museum with id ${artMuseumId} was not updated.`.red);
        }
        else{
            console.log(`Art museum successfully updated`.green);
        }
    }
    //artmuseums/delete/id
    //command to delete an art museum
    else if (command === "artmuseums/delete/id") {
        const artMuseumId = parseInt(input);
        if (!artMuseumRepository.deleteArtMuseum(artMuseumId)) {
            console.error(`Given art museum with id ${artMuseumId} was not deleted.`.red);
        }
        else {
            console.log(`Deleted art museum with id ${artMuseumId}.`.blue)
        }
    }
    //if command is incorrect
    else {
        console.error(`This command is not supported: '${text}'.`.yellow);
    }
}