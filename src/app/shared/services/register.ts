import {Injectable} from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Iregister } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class RegisterServices {
    private register_endpoint = "http://localhost:4500/users/api/newuserdata";
    public headers: HttpHeaders;
    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders({ "Content-Type": "application/json" });
    }
    createUser(data: Iregister):Observable<Iregister> {
        return this.http.post<Iregister>(this.register_endpoint, JSON.stringify(data), {headers: this.headers});
    }
}
