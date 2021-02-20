import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }

    register(payload): Observable<any>{
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + environment.methods.createUser, JSON.stringify(payload),{'headers': headers})
    }

    login(payload): Observable<any>{
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + environment.methods.login, JSON.stringify(payload),{'headers': headers})
    }

    saveSolution(payload): Observable<any>{
        return this.http.post(environment.apiUrl + environment.methods.saveSolution, JSON.stringify(payload));
    }
}