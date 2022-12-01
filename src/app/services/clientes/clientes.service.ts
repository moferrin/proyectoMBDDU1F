import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private _http : HttpClient) { }

  public url = "http://localhost:3000";

  listar() : Observable<any> {
    return this._http.get(`${this.url}/cliente`);
  }

  guardar(cliente:any): Observable<any>{
    return this._http.post(`${this.url}/cliente`,cliente);
  }

  editarCliente(cliente: any){
    return this._http.put(`${this.url}/cliente/${cliente._id}`, cliente);
  }

  eliminarCliente(id:any): Observable<any>{
    return this._http.delete(`${this.url}/cliente/`+id);
  }
}
