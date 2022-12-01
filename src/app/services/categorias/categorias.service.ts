import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private _http : HttpClient) { }

  public url = "http://localhost:3000";

  listar() : Observable<any> {
    return this._http.get(`${this.url}/categoria`);
  }

  guardar(categoria:any): Observable<any>{
    return this._http.post(`${this.url}/categoria`,categoria);
  }

  editarCategoria(categoria: any){
    return this._http.put(`${this.url}/categoria/${categoria._id}`, categoria);
  }

  eliminarCategoria(id:any): Observable<any>{
    return this._http.delete(`${this.url}/categoria/`+id);
  }
}
