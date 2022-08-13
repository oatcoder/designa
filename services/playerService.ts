import IPlayer = Services.Models.IPayer;

import { FirebaseRepository } from "../repositories/firebaseRepository";


export class PlayerService implements Services.IPlayerService {
    private firebaseRepo: Repositories.IFirebaseRepository;

    constructor() {
        this.firebaseRepo = new FirebaseRepository();
    }

    public getPlayer(playerId: number): Promise<IPlayer> {
        return this.firebaseRepo.get(`players/${playerId}`)
            .catch(this.firebaseRepo.handleError.bind(this));
    }

    public getCardPlayers(cardId: number | string): Promise<IPlayer[]> {
        return this.firebaseRepo.get(`cards/${cardId}/players`)
            .catch(this.firebaseRepo.handleError.bind(this));
    }

    public savePlayer(player: IPlayer): Promise<IPlayer> {
        return this.firebaseRepo.getNewKey("players")
            .then((key: string) => {
                return key;

            }).then((newKey: string) => {
                return this.firebaseRepo.post(`players/${newKey}`, player)
                    .catch(this.firebaseRepo.handleError.bind(this));

            }).catch(this.firebaseRepo.handleError.bind(this));
    }

    public updatePlayer(player: IPlayer): Promise<IPlayer> {
        return this.firebaseRepo.put(`players/${player.id}`, player)
            .catch(this.firebaseRepo.handleError.bind(this));
    }

    public deletePlayer(playerId: number): Promise<IPlayer> {
        return this.firebaseRepo.delete(`players/${playerId}`)
            .catch(this.firebaseRepo.handleError.bind(this));
    }
}