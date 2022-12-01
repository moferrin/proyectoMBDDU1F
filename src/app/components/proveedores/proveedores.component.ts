import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  formProveedores = {
    idP:"",
    nombre: "",
    direccion : "",
    telefono : "",
    correo : ""
  }

  proveedores!: Array<any>;

  constructor(private sp: ProveedoresService) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.sp.listar().subscribe(data => {
      this.proveedores = data;
    }, err => {
    });
  }

  guardar(){
    this.sp.guardar(this.formProveedores)
    .subscribe(data => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Nuevo proveedor agregado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.listar();
      this.limpiarForm();
    }, err => {

    })
  }

  eliminar(id_p: string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este registro se eliminará completamente',
      position: 'top',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sp.eliminarProveedor(id_p).subscribe((res) => {
          Swal.fire('Eliminado!', 'Registro eliminado', 'success');
          this.listar();
        });
      }
    });
  }

  actualizarProducto(){
    console.log(this.formProveedores)
    this.sp.editarProveedor(this.formProveedores)
    .subscribe(data => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Registro actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.listar();
    });
  }

  actualizarForm(producto:any){
    console.log(producto);
    this.formProveedores = producto;
  }

  limpiarForm(){
    this.formProveedores={
      idP:"",
      nombre: "",
      direccion : "",
      telefono : "",
      correo : ""
    }
  }

}
