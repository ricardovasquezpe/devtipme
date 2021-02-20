import { Injectable } from "@angular/core";

@Injectable()
export class SessionManager {

    private jsonWebToken:string = 'token';

    storeToken(token: string) {
        localStorage.setItem(this.jsonWebToken, token);
    }

    retrieveToken() {
        let storedToken:string = localStorage.getItem(this.jsonWebToken);
        if(!storedToken) throw 'no token found';
        return storedToken;
    }

}