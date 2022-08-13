import { CardService } from './cardService';
import { FirebaseRepository } from "../repositories/firebaseRepository";
import { ConfigurationService } from "./configurationService";

import * as _ from "lodash";

import IPoints = Services.Models.IPoints;
import IPointConfiguration = Services.Models.IPointConfiguration;
import IHole = Services.Models.IHole;


export class PointService implements Services.IPointService {
    private firebaseRepo: Repositories.IFirebaseRepository;
    private cardService: Services.ICardService;
    private pointConfiguration: Services.Models.IPointConfiguration;

    constructor() {
        this.init();

        this.firebaseRepo = new FirebaseRepository();
        this.cardService = new CardService();
    }

    private init() {
        const configurationService = new ConfigurationService();

        configurationService.getPointConfiguration()
            .then((config: IPointConfiguration) => {
                this.pointConfiguration = config;

            }).catch(this.firebaseRepo.handleError.bind(this));
    }

    public getCardPlayerPoints(cardId: string | number, playerId: string | number): Promise<IPoints> {
        return this.cardService.getCard(cardId)
            .then((card: ICard) => {
                const score = _.find(card.playersScores, ["id", playerId]);

                // todo: determin win points
                var birdiePoints: number;
                var girPoints: number;
                var eaglePoints: number;
                var doubleEaglePoints: number;
                var leaderPointer: number;

                _.each(score.holes, (hole: IHole) => {
                    if (this.isBirdie(hole)) {
                        birdiePoints = birdiePoints + this.pointConfiguration.birdie;
                    }

                    if (hole.isGir) {
                        girPoints = girPoints + this.pointConfiguration.gir;
                    }

                    if (this.isEagle(hole)) {
                        eaglePoints = eaglePoints + this.pointConfiguration.eagle;
                    }

                    if (this.isDoubleEagle(hole)) {
                        doubleEaglePoints = doubleEaglePoints + this.pointConfiguration.doubleEagle;
                    }
                });

                if (this.cardService.isCardLeader(card, playerId)) {
                    leaderPointer = 1;
                }

                return <IPoints>{
                    birdie: birdiePoints,
                    gir: girPoints,
                    doubleEagle: doubleEaglePoints,
                    eagle: eaglePoints,
                    total: birdiePoints + girPoints + eaglePoints + doubleEaglePoints,
                     win: leaderPointer
                };

            }).catch(this.firebaseRepo.handleError.bind(this));
    }

    private isBirdie(hole: IHole): boolean {
        return hole.score === -1;
    }

    private isEagle(hole: IHole): boolean {
        return hole.score === -2;
    }

    private isDoubleEagle(hole: IHole): boolean {
        return hole.score === -3;
    }

}