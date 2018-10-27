import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 
export class User {
  name: string;
  email: string;
  school: string;
  items: any[];
  points: string;
  universityPoints: string;

  constructor(name: string, email: string, school: string, items: any[], points: string, universityPoints: string) {
    this.name = name;
    this.email = email;
    this.school = school;
    this.items = items;
    this.points = points;
    this.universityPoints = universityPoints;
  }
}
 
@Injectable()
export class Connector {
  currentUser = null;
  constructor(private http:HttpClient) { }

  public getLeaderboard() {
    return this.http.post("http://localhost:5000/leaderboard", {}).map(
      resp => {
        console.log("Leaderboard:", resp);
        return resp;
      }
    );
  }
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please enter both email and password.");
    } else {
      console.log(credentials);
      return this.http.post('http://localhost:5000/dashboard', credentials).map(
        res => { 
          console.log(res);
          this.currentUser = new User(res["name"], credentials.email, res["school"], res["items"], res["totalPoints"], "50000");
          return this.currentUser; 
        }
      );
    } 
}
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.name == null || credentials.school) {
      return Observable.throw("Please enter both email and password.");
    } else {
      this.http.post('http://localhost:5000/register', credentials).map(
        res => {
          return res;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        }
      );
    }
  }
 
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}