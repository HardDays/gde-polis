// import { CompanyModel } from './../models/company.model';
// import { LoginModel } from './../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
// import { UserModel } from '../models/user.model';
// import { TokenModel } from '../models/token.model';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { TokenModel } from '../models/token.model';


// const https = require('https');
// declare var require: any;
@Injectable()
export class AuthService
{
    protected token_field:string = "token";

    public onAuthChange$: Subject<boolean> = new Subject<boolean>();
    public IsLoggedIn: boolean = false;

    constructor(private http: HttpService, private router: Router) 
    {
        this.onAuthChange$.next(false);
    }

    Login(data: LoginModel)
    {
        // const https = require('https');

        // console.log(https);
        // var options = {
        //     'method': 'POST',
        //     'hostname': 'https://widget.agentapp.ru',
        //     'path': '/v1/users/obtain-token',
        //     'headers': {
        //       'Content-Type': 'application/json'
        //     }
        //   };
          
        //   var req = https.request(options, function (res) {
        //     var chunks = [];
          
        //     res.on("data", function (chunk) {
        //       chunks.push(chunk);
        //     });
          
        //     res.on("end", function (chunk) {
        //       var body = Buffer.concat(chunks);
        //       console.log(body);
        //     });
          
        //     res.on("error", function (error) {
        //       console.error(error);
        //     });
        //   });
          
        //   var postData =  "{\n  \"username\": \"kka@pro-brokers.ru\",\n  \"password\": \"kka@pro\"\n}";
          
        //   req.write(postData);
          
        //   req.end();
        this.http.CommonRequest(
            () => this.http.PostData('/v1/users/obtain-token', {
                    "username": "kka@pro-brokers.ru",
                    "password": "kka@pro"
                }),
            (res: TokenModel) => console.log(res)
        )
        // console.log(LoginModel);
        // const obj = {
        //     "username": "kka@pro-brokers.ru",
        //     "password": "kka@pro"
        // };
        // let headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/json');
        // this.http.httpClient.post("https://widget.agentapp.ru/v2/users/obtain-token", obj,{
        //     headers: headers
        // }).subscribe(
        //     (res: TokenModel) => {
        //         console.log(res);
        //     }
        // );
    }

    InitSession(data:TokenModel)
    {
        localStorage.setItem(this.token_field ,data.token);
        this.http.BaseInitByToken(data.token);
        this.onAuthChange$.next(true);
    }
}
