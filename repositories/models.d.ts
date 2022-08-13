declare module Repositories.Models {
    export interface IFirebaseConfig {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        storageBucket: string;
        messagingSenderId: string;
    }
}