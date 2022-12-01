import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private _http : HttpClient) { }

  public url = "http://localhost:3000";

  listar() : Observable<any> {
    return this._http.get(`${this.url}/proveedor`);
  }

  guardar(proveedor:any): Observable<any>{
    return this._http.post(`${this.url}/proveedor`,proveedor);
  }

  editarProveedor(proveedor: any){
    return this._http.put(`${this.url}/proveedor/${proveedor._id}`, proveedor);
  }

  eliminarProveedor(id:any): Observable<any>{
    return this._http.delete(`${this.url}/proveedor/`+id);
  }
}
