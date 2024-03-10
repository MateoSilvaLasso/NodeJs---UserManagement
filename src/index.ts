import express, {Express, Request, Response} from "express";
import UserModel, {UserInput, UserDocument} from '../src/models/user.model'
import EventModel from '../src/models/event.model'
import dotenv from 'dotenv';
import { db } from "./config/db";

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000 ;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});  

app.get('/about', (req: Request, res: Response) => {
    res.send('About Us');
});

app.post('/about', (req: Request, res: Response) => {
    res.send('name: ' + req.body.name);
});


db.then( () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        createMateo();
    })
} );


async function createMateo() {
    
    const diaDeLaMujer = await EventModel.create({
        title: "Dia de la mujer", 
        description: "Celebrar el dia de la mujer", 
        date: Date.now(), 
        hour: Date.now(), 
        place: "Universidad ICESI"

    });

    console.log("Dia de la mujer:" + diaDeLaMujer);

    const user = await UserModel.create({
        name: "Carlos",
        email: "Carlos@juan",
        password : "12345",
        role : "organizador", 
        registeredEvents: [diaDeLaMujer]
    })

}