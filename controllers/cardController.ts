import * as express from "express";

import { CardService } from "../services/cardService";


export class CardController {
    constructor() { }

    public getCard(req: express.Request, res: express.Response) {
        try {
            const service = new CardService();

            service.getCard(req.query["cardId"])
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public postCard(req: express.Request, res: express.Response) {
        try {
            const service = new CardService();

            service.saveCard(req.body)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public putCard(req: express.Request, res: express.Response) {
        try {
            const service = new CardService();

            service.saveCard(req.body)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public deleteCard(req: express.Request, res: express.Response) {
        try {
            const service = new CardService();

            service.deleteCard(parseInt(req.query["cardId"]))
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }
}