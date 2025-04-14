import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Request } from "../model/request";

const URL = 'http://localhost:8080/api/requests/list-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  constructor(private http: HttpClient) { }


  list(): Observable<Request[]>{
    return this.http.get(URL + '/') as Observable<Request[]>;
  }
  getReviews(id: number): Observable<Request[]>{
    return this.http.get(URL + '/'+id) as Observable<Request[]>;
  }
}