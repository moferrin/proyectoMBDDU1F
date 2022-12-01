import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private usuario ="dddd";

  constructor() { }

  public setUser(usuario:string){
    this.usuario=usuario;
  }

  public getUser(){
    return this.usuario;
  }

}
