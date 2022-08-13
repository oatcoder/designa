import { FirebaseRepository } from "../repositories/firebaseRepository";

import IPointConfiguration = Services.Models.IPointConfiguration;


export class ConfigurationService implements Services.IConfiguratonService {
    private firebaseRepo: Repositories.IFirebaseRepository;

    constructor() {
        this.firebaseRepo = new FirebaseRepository();
    }

    public getPointConfiguration(): Promise<IPointConfiguration> {
        return this.firebaseRepo.get("configuration/points")
            .catch(this.firebaseRepo.handleError.bind(this));
    }
}