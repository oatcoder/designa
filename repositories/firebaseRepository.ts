import * as Firebase from 'firebase';
import * as _ from 'lodash';

var firebaseConfig = require("../configs/firebaseConfig.json");


export class FirebaseRepository implements Repositories.IFirebaseRepository {
    private config: Repositories.Models.IFirebaseConfig;
    private firebaseApp: Firebase.app.App;

    constructor() {
        this.config = firebaseConfig;

        if (this.config) {
            var temp = Firebase.apps;

            if (Firebase.apps && Firebase.apps.length > 0) {
                this.firebaseApp = _(Firebase.apps).first();

            } else {
                this.firebaseApp = Firebase.initializeApp(this.config);
            }
        }
    }

    public get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve: any, reject: any) => {
            this.firebaseApp.database().ref(url).once("value")
                .then((s: any) => {
                    const value = s.val();

                    resolve(value);

                }).catch((e: Error) => {
                    reject(e);
                })
        });
    }

    public put<T>(url: string, data: any): Promise<T> {
        const ref = this.firebaseApp.database().ref(url);

        data.modified = Date.now();

        return new Promise<T>((resolve: any, reject: any) => {
            ref.update(data)
                .then((d: any) => {
                    resolve(d);

                }).catch((e: Error) => {
                    reject(e);
                })
        });
    }

    public delete<T>(url: string): Promise<T> {
        return new Promise<T>((resolve: any, reject: any) => {
            this.firebaseApp.database().ref(url).remove()
                .then((a: any) => {
                    resolve(a);

                }).catch((e: Error) => {
                    reject(e);
                });
        });
    }

    public handleError<T>(reason: any): Promise<T> {
        // todo: add error handling
        return Promise.reject(reason);
    }

    public getNewKey<T>(url: string): Promise<T> {
        return new Promise<T>((resolve: any, reject: any) => {
            const newKey = this.firebaseApp.database().ref().child(url).push().key

            if (newKey) {
                resolve(newKey);

            } else {
                reject();
            }
        })
    }

    public post<T>(url: string, data: any): Promise<T> {
        const ref = this.firebaseApp.database().ref(url);

        data.date = Date.now();

        return new Promise<T>((resolve: any, reject: any) => {
            ref.set(data)
                .then((a: any) => {
                    resolve(data);

                }).catch((e: Error) => {
                    reject(e);
                })
        });
    }
}