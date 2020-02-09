import {Injectable} from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Iregister, Ilogin } from '../model/user';
import { Observable,BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class RegisterServices {
    private register_endpoint = "http://localhost:4500/users/api/newuserdata";
    private login_endpoint = "http://localhost:4500/api/user/auth";
    private loggedIn_endpoint = "http://localhost:4500/api/user/me";
    private forgotpassword_endpoint = "http://localhost:4500/password/forgotpassword/";
    private SENDMAIL_ENDPOINT = "http://localhost:4500/nodemailer/sendmail";
    public headers: HttpHeaders;
    public user = new BehaviorSubject(JSON.parse(localStorage.getItem("loggedUser")));
    public loggedInUser = this.user.asObservable();
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
        return this.http.get(this.loggedIn_endpoint, { headers: this.headers }).pipe(map((item: any) => {
            localStorage.setItem("loggedUser", JSON.stringify(item));
            this.user.next(item);
        }));
    };

    Forgotpassword(token,item) {
        alert(JSON.stringify(item));
        return this.http.post(this.forgotpassword_endpoint + token, JSON.stringify(item), { headers: this.headers });
    };
    SendMail(data) {
        return this.http.post(this.SENDMAIL_ENDPOINT, JSON.stringify(data), {headers: this.headers});
    };
    Logout(){
        localStorage.removeItem("currentuser");
        localStorage.removeItem("loggedUser");
        this.user.next(null);
    }
    
};

