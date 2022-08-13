import * as express from "express";

import { CourseService } from '../services/courseService';


export class CourseController {
    constructor() { }

    public getCourse(req: express.Request, res: express.Response) {
        try {
            const service = new CourseService();

            service.getCourse(req.query["courseId"])
                .then((response: any) => {
                    res.json(response);

                }).catch((e: any) => { res.json(e) });

        } catch (error) {
            res.json(error);
        }
    }
}