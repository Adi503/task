import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  //@getprofile
  getProfile(): Observable<any> {
    return this.http
      .get<any>("http://localhost:3000/user/list")
      .pipe(map(response => response));
  }

  //@save profile
  saveProfile(obj: any): Observable<any> {
    return this.http
      .post("http://localhost:3000/user/save/", obj)
      .pipe(map(response => response));
  }

  //@get profile by id
  getData(id: String): Observable<any> {
    return this.http
      .get("http://localhost:3000/user/profile/" + id)
      .pipe(map(response => response));
  }

  //@update profile
  updateData(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/user/update", obj)
      .pipe(map(response => response));
  }
}
