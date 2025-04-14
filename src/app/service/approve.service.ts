import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Request } from "../model/request";

const URL = 'http://localhost:8080/api/requests/approve';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {


  constructor(private http: HttpClient) { }
  update(request: Request): Observable<Request> {
    return this.http.put(URL + '/'+ request.id, request) as Observable<Request>;
  }
}