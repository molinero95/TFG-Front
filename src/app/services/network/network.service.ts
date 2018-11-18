import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceURLs } from 'src/app/constants';
import { Network } from 'src/app/entities/network';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  createNetwork(model: Network): Promise<object>{
    return this.http.post(ServiceURLs.SERVICE + ServiceURLs.CREATE_NETWORK, model, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }).toPromise();
  }

  getNetwork(name: string): Promise<any>{
    return this.http.get(ServiceURLs.SERVICE + ServiceURLs.GET_NETWORK + "/name=" + name).toPromise();
  }

  getNetworksNames(): Promise<any>{
    return this.http.get(ServiceURLs.SERVICE + ServiceURLs.GET_ALL_NETWORKS).toPromise();
  }
}
