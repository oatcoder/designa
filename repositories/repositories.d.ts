
declare module Repositories {
    export interface IFirebaseRepository {
        get<T>(url: string): Promise<T>;
        put<T>(url: string, data: any): Promise<T>;
        delete<T>(url: string): Promise<T>;
        post<T>(url: string, data: any): Promise<T>;

        handleError<T>(reason: any): Promise<T>;

        getNewKey<T>(url: string): Promise<T>;
    }
}