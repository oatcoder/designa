import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.all("/*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");

    if (req.method === "OPTIONS") {
        res.status(200).end();

    } else {
        next();
    }
});

app.use("/", require("./routes"));

// If no route is matched by now, return error
// app.use((req: any, res: any, next: any) => {
//     const err = new Error("Not Found");

//     next(err);
// });

var PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit");
});

export var App = app;