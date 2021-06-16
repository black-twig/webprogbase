const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const expressSwagger = require('express-swagger-generator')(app);
const options = {
    swaggerDefinition: {
        info: {
            description: "Second lab", 
            title: "Lab2", 
            version: "1.0.0"
        },
        host: "localhost:3000",
        produces: ["application/json"]
    },
    basedir: __dirname,
    files: ["./routes/**/*.js", "./models/**/*.js"]
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

expressSwagger(options);

app.listen(3000);
