import * as express from "express";

import { HoleService } from "../services/holeService";

import IHolesParams = Controllers.Models.IHolesParams;


export class HoleController {
    constructor() { }

    public getCardHoles(req: express.Request, res: express.Response) {
        try {
            const service = new HoleService();

            const params = <IHolesParams>req.params;

            service.getCardHoles(params.cardId)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public postHoles(req: express.Request, res: express.Response) {
        try {
            const service = new HoleService();

            const params = <IHolesParams>req.params;

            service.saveHole(params.cardId, req.body)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public putHoles(req: express.Request, res: express.Response) {
        try {
            const service = new HoleService();

            service.updateHole(req.body)
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }

    public deleteHoles(req: express.Request, res: express.Response) {
        try {
            const service = new HoleService();

            service.deleteHole(req.query["id"])
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }
}