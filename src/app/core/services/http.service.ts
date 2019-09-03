import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var Buffer: any;
@Injectable()
export class HttpService {

    serverUrl = 'https://widget.agentapp.ru';
    // serverUrl = 'https://venture-box-back-test.herokuapp.com';

    public headers: Headers = new Headers();
    constructor(public httpClient: HttpClient, public http: Http) {
        this.BaseHeadersInit();
    }

    BaseInitByToken(data: string)
    {
        if (data) {
            if (this.headers.has('Authorization')) {
                this.headers.delete('Authorization');
            }
            this.headers.append('Authorization', "Token " + data);
        }
    }

    BaseHeadersInit()
    {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        // this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // this.headers.append('Access-Control-Allow-Credentials', 'true');
        // this.headers.append('Accept', '*/*');
        // this.headers.append('User-Agent', 'PostmanRuntime/7.16.3');
    }

    validResp(resp){
        let body = resp._body;
        if(body==" ")return false;
        return true;
    }

    CommonRequest(fun:()=>Observable<Response>, success?: (data) => void, fail?: (err) => void)
    {
        this.BaseHeadersInit();

        return fun()
            .subscribe(
                (response: Response) =>
                {
                    // response.headers.set
                    // response.headers.set("Access-Control-Allow-Origin", "*");
                    // response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                    // response.headers.set("Access-Control-Allow-Headers", "Content-Type");
                    console.log(response);
                    if(success && typeof success == "function")
                    {
                        success(this.validResp(response)?response.json():"");
                    }
                },
                (error) =>
                {
                    if(fail && typeof fail == "function")
                    {
                        let errObj = error;
                        errObj.body = this.validResp(error)?error.json():""
                        fail(errObj);
                    }
                }
            )
    }

    // TestPost(method: string, data: any)
    // {
    //     console.log(data);
    //     return this.httpClient.post<any>(this.serverUrl + method, data, {
    //         "headers": this.headers,
    //         "responseType": "json"
    //     });
    //     // return this.http.post(this.serverUrl + method, data, {headers: this.headers});
    // }

    GetQueryStr(method: string, params?: string)
    {
        return this.serverUrl + method + '?' + params;
    }

    GetData(method: string, params?: string)
    {
        // return this.http.get(this.serverUrl + method + '?' + params, {headers: this.headers});
    }

    DeleteData(method: string)
    {
        // return this.http.delete(this.serverUrl + method, {headers: this.headers});
    }

    DeleteDataWithBody(method: string, body: any)
    {
        return this.http.delete(this.serverUrl + method, new RequestOptions({
            // headers: this.headers,
            body: body
          }));
    }

    DeleteDataWithParam(method: string, param)
    {
        // return this.http.delete(this.serverUrl + method + '?' + param, {headers: this.headers});
    }

    PostData(method: string, data: any)
    {
        return this.http.post(this.serverUrl + method, data, {headers: this.headers});
    }

    PatchData(method: string, data: any)
    {
        // return this.http.patch(this.serverUrl + method, data, {headers: this.headers});
    }

    PutData(method: string, data: string)
    {
        // return this.http.put(this.serverUrl + method, data, {headers: this.headers});
    }

    GetDataFromOtherUrl(url: string)
    {
        return this.http.get(url);
    }
}
