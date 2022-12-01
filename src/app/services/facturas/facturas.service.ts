import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private _http : HttpClient) { }

  public url = "http://localhost:3000"
/*
  listar() : Observable<any> {
    return this._http.get(`${this.url}/producto`);
  }
*/
  guardar(factura:any): Observable<any>{
    return this._http.post(`${this.url}/factura`,factura);
  }
}
