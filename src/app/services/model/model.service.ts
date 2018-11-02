import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceURLs } from 'src/app/constants';
import { Model } from 'src/app/entities/model';


@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  createModel(model: Model): Promise<object>{
    return this.http.post(ServiceURLs.SERVICE + ServiceURLs.CREATE_MODEL, model, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }).toPromise();
  }

  getModel(name: string): Promise<any>{
    return this.http.get(ServiceURLs.SERVICE + ServiceURLs.GET_MODEL + "/name=" + name).toPromise();
  }
}
