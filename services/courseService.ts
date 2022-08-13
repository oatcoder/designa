import * as _ from "lodash";

import { FirebaseRepository } from '../repositories/firebaseRepository';

import ICourse = Services.Models.ICourse;


export class CourseService implements Services.ICourseService {
    private firebaseRepo: Repositories.IFirebaseRepository;

    constructor() {
        this.firebaseRepo = new FirebaseRepository();
    }

    public getCourse(courseId: string | number): Promise<ICourse> {
        return this.firebaseRepo.get(`courses/${courseId}`)
            .catch(this.firebaseRepo.handleError.bind(this));
    }
}