import { Injectable } from "@angular/core";
import * as moment from 'moment'

@Injectable()
export class SessionManager {

    private jsonWebToken:string = 'token';
    private expireTime:string = 'expireAt';
    private email:string = 'email';

    storeNewToken(token: string, email: string) {
        localStorage.setItem(this.jsonWebToken, token);
        localStorage.setItem(this.expireTime, moment().add(24, 'hours').unix().toString());
        localStorage.setItem(this.email, email);
    }

    retrieveToken() {
        let storedToken:string = localStorage.getItem(this.jsonWebToken);
        if(!storedToken) throw 'no token found';
        return storedToken;
    }

    retrieveExpireTime(){
        let expireTime:string = localStorage.getItem(this.expireTime);
        if(!expireTime) throw 'no token found';
        return moment.unix(Number(expireTime)).format("DD-MM-YYYY H:m:s");
    }

    retrieveEmail(){
        let storedEmail:string = localStorage.getItem(this.email);
        if(!storedEmail) throw 'no token found';
        return storedEmail;
    }

    haveStorage(){
        let storedToken:string = localStorage.getItem(this.jsonWebToken);
        if(!storedToken){
            return false
        }
        return true
    }
}