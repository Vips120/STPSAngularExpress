import {Injectable} from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Iregister, Ilogin } from '../model/user';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class RegisterServices {
    private register_endpoint = "http://localhost:4500/users/api/newuserdata";
    private login_endpoint = "http://localhost:4500/api/user/auth";
    private loggedIn_endpoint = "http://localhost:4500/api/user/me";
    public headers: HttpHeaders;
    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders({ "Content-Type": "application/json" });
    }
    createUser(data: Iregister):Observable<Iregister> {
        return this.http.post<Iregister>(this.register_endpoint, JSON.stringify(data), {headers: this.headers});
    };

    loginUser(data: Ilogin): Observable<Ilogin> {
        return this.http.post<Ilogin>(this.login_endpoint, JSON.stringify(data), { headers: this.headers })
            .pipe(map((data:any) => {
                if (data && data.token) {
                    localStorage.setItem("currentuser", JSON.stringify(data.token));
                } else {
                    return data;
                }
            }));
    };

    LoggedInUser() {
        let token = JSON.parse(localStorage.getItem("currentuser"));
        this.headers = new HttpHeaders({ "Content-type": "application/json", "x-auth-token": token });
        return this.http.get(this.loggedIn_endpoint, { headers: this.headers });
    }
}
