import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../services/productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {


  formProductos = {
    idP:"",
    nombre: "",
    categoria : "",
    precio : "",
    cantidad : 0,
    //imagen : ""
  }

  imagen !: File;

  productos!: Array<any>;

  constructor(private sp : ProductosService) { }

  cargarImagen(img : any){
    this.imagen = img.target.files[0];
  }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.sp.listar().subscribe(data => {
      this.productos = data;
    }, err => {

    });
  }

  guardar(){
    this.sp.guardar(this.formProductos)
    .subscribe(data => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Nuevo producto agregado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.listar();
      this.formProductos =  {
        idP:"",
        nombre: "",
        categoria : "",
        precio : "",
        cantidad : 0,
        //imagen : ""
      };
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
        this.sp.eliminar(id_p).subscribe((res) => {
          Swal.fire('Eliminado!', 'Registro eliminado', 'success');
          this.listar();
        });
      }
    });
  }

  actualizarProducto(){
    console.log(this.formProductos)
    this.sp.editarProducto(this.formProductos)
    .subscribe(data => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Registro actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.listar();
    }

    );
    
  }

  actualizarForm(producto:any){
    console.log(producto);
    this.formProductos = producto;
  }

  limpiarForm(){
    this.formProductos={
      idP:"",
      nombre: "",
      categoria : "",
      precio : "",
      cantidad : 0,
    }
  }


}
