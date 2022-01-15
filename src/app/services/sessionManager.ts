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
        if(!storedToken) return null;
        return storedToken;
    }

    retrieveExpireTime(){
        let expireTime:string = localStorage.getItem(this.expireTime);
        if(!expireTime) throw 'no time found';
        return new Date(Number(expireTime) * 1000)
    }

    retrieveEmail(){
        let storedEmail:string = localStorage.getItem(this.email);
        if(!storedEmail) throw 'no email found';
        return storedEmail;
    }

    verifyAuth(){
        let storedToken:string = localStorage.getItem(this.jsonWebToken);
        if(!storedToken){
            return false
        }
        var now = new Date();
        if(now > this.retrieveExpireTime()){
            return false;
        }

        return true;
    }

    clearSession(){
        localStorage.clear()
    }
}