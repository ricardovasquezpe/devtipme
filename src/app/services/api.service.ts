import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }

    register(payload): Observable<any>{
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + 'people', JSON.stringify(payload),{'headers':headers})
    }
}