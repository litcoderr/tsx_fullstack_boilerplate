import path from "path";
import express, {Application, Request, Response} from "express";

const app: Application = express();

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get('/', (req: Request, res: Response) => {
    res.render("index.html");
});

app.listen(5000, () => {
    console.log("Server Running @ 5000");
});