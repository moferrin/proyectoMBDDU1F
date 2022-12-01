import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  constructor(private _http : HttpClient) { }

  public url = "http://localhost:3000"

  listar() : Observable<any> {
    return this._http.get(`${this.url}/producto`);
  }

  guardar(producto:any): Observable<any>{
    return this._http.post(`${this.url}/producto`,producto);
  }

  editarProducto(producto: any){
    return this._http.put(`${this.url}/producto/${producto._id}`, producto);
  }

  eliminar(id:any): Observable<any>{
    return this._http.delete(`${this.url}/producto/`+id);
  }
  
}
