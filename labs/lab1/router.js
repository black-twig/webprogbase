class Router {
    constructor() {
        this.routes = {};
    }
 
    use(command, routeFunction) {
        this.routes[command] = routeFunction;
    }
 
    handle(command, input, output) {
        const routeFunction = this.routes[command];
        if (routeFunction) {
            routeFunction(input, output);
        } else {
            console.log(`Route function not found: '${command}'`);
        }
    }
};
 
module.exports = Router;
