import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + environment.methods.saveSolution, JSON.stringify(payload),{'headers': headers});
    }

    uploadFile(payload): Observable<any>{
        return this.http.post(environment.apiUrl + environment.methods.uploadFile, payload);
    }

    findSolutions(payload): Observable<any>{
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + environment.methods.findSolution, JSON.stringify(payload),{'headers': headers})
    }

    getSolutionById(id: string): Observable<any>{
        const headers = { 'content-type': 'application/json'}
        return this.http.get(environment.apiUrl + environment.methods.getSolutionByID + "/" + id, {'headers': headers})
    }

    findCommentsBySolutionId(solutionId: string): Observable<any>{
        let params = new HttpParams();
        params = params.append('solutionId', solutionId);
        return this.http.get(environment.apiUrl + environment.methods.findComments, {params: params})
    }

    postComment(payload): Observable<any>{
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + environment.methods.postComment, JSON.stringify(payload), {'headers': headers});
    }

    insertTip(payload): Observable<any>{
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + environment.methods.insertTip, JSON.stringify(payload), {'headers': headers});
    }
    
    authorizePayment(payload){
        const headers = { 'content-type': 'application/json'}
        return this.http.post(environment.apiUrl + environment.methods.authorizePayment, JSON.stringify(payload), {'headers': headers}).toPromise();
    }
}