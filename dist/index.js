"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/about', (req, res) => {
    res.send('About Us');
});
app.post('/about', (req, res) => {
    res.send('name: ' + req.body.name);
});
//Importamos routes
(0, routes_1.default)(app);
db_1.db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        // createMateo();
    });
});
