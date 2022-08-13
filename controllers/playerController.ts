import * as express from "express";

import { PlayerService } from "../services/playerService";

import IPlayersParams = Controllers.Models.IPlayersParams;


export class PlayerController {
    constructor() { }

    public getPlayer(req: express.Request, res: express.Response) {
        try {
            const service = new PlayerService();

            service.getPlayer(req.query["id"])
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public getCardPlayers(req: express.Request, res: express.Response) {
        try {
            const service = new PlayerService();

            const params = <IPlayersParams>req.params;

            service.getCardPlayers(params.cardId)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public postPlayer(req: express.Request, res: express.Response) {
        try {
            const service = new PlayerService();

            service.savePlayer(req.body)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public putPlayer(req: express.Request, res: express.Response) {
        try {
            const service = new PlayerService();

            service.updatePlayer(req.body)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public deletePlayer(req: express.Request, res: express.Response) {
        try {
            const service = new PlayerService();

            service.deletePlayer(req.query["id"])
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }
}