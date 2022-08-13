import * as _ from "lodash";

import IHole = Services.Models.IHole;

import { FirebaseRepository } from "../repositories/firebaseRepository";


export class HoleService implements Services.IHoleService {
    private firebaseRepo: Repositories.IFirebaseRepository;

    constructor() {
        this.firebaseRepo = new FirebaseRepository();
    }

    public getCardHoles(cardId: number | string): Promise<IHole[]> {
        return this.firebaseRepo.get(`cards/${cardId}`)
            .then((response: any) => {
                if (response) {
                    return _.map(response.holes, (hole: IHole) => {
                        hole.isBirdie = hole.score === -1 ? true : false;
                        hole.isEagle = hole.score === -2 ? true : false;
                        hole.isDoubleEagle = hole.score === -3 ? true : false;

                        return hole;
                    });

                } else {
                    return [];
                }

            }).catch(this.firebaseRepo.handleError.bind(this));
    }

    public saveHole(cardId: number | string, hole: IHole): Promise<IHole> {
        return this.firebaseRepo.getNewKey(`cards/${cardId}/holes`)
            .then((key: string) => {
                return key;

            }).then((newKey: string) => {
                return this.firebaseRepo.post(`cards/${cardId}/holes/${newKey}`, hole)
                    .catch(this.firebaseRepo.handleError.bind(this));

            }).catch(this.firebaseRepo.handleError.bind(this));
    }

    public updateHole(hole: IHole): Promise<IHole> {
        return this.firebaseRepo.put(`holes/${hole.id}`, hole)
            .catch(this.firebaseRepo.handleError.bind(this));
    }

    public deleteHole(holeId: number): Promise<IHole> {
        return this.firebaseRepo.delete(`holes/${holeId}`)
            .catch(this.firebaseRepo.handleError.bind(this));
    }
}