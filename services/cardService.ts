import * as _ from "lodash";

import { FirebaseRepository } from "../repositories/firebaseRepository";

import ICard = Services.Models.ICard;
import IPlayerScore = Services.Models.IPlayerScore;


export class CardService implements Services.ICardService {
    private firebaseRepo: Repositories.IFirebaseRepository;

    constructor() {
        this.firebaseRepo = new FirebaseRepository();
    }

    public getCard(cardId: number): Promise<ICard> {
        return this.firebaseRepo.get(`cards/${cardId}`)
            .catch(this.firebaseRepo.handleError.bind(this));
    }

    public saveCard(card: ICard): Promise<ICard> {
        if (!card.id || card.id === "0") {
            return this.firebaseRepo.getNewKey("cards")
                .then((key: string) => {
                    return key;

                }).then((newKey: string) => {
                    return this.firebaseRepo.post(`cards/${newKey}`, card)
                        .catch(this.firebaseRepo.handleError.bind(this));

                }).catch(this.firebaseRepo.handleError.bind(this));

        } else {
            return this.firebaseRepo.put(`cards/${card.id}`, card)
                .catch(this.firebaseRepo.handleError.bind(this));
        }
    }

    public deleteCard(cardId: number): Promise<ICard> {
        return this.firebaseRepo.delete(`cards/${cardId}`)
            .catch(this.firebaseRepo.handleError.bind(this));
    }

    public isCardLeader(card: ICard, playerId: string | number): boolean {
        _.each(card.playersScores, (playScore: IPlayerScore) => {
            playScore.score = card.par;

            _.each(playScore.holes, (hole: IHole) =>{
                playScore.score = playScore.score + hole.score;
            })
        });

        const leader = _.maxBy(card.playersScores, "score");

        return leader.id === playerId;
    }
}