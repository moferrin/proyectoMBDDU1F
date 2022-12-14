import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import Swal from 'sweetalert2';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

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
    precio : 0,
    cantidad : 0,
    proveedor:"",
    //imagen : ""
  }

  formCategorias = {
    nombre: "",
  }

  imagen !: File;

  productos!: Array<any>;
  proveedores!: Array<any>;
  categorias!: Array<any>;

  constructor(
    private sp : ProductosService,
    private sprov : ProveedoresService,
    private sc: CategoriasService) { }

  cargarImagen(img : any){
    this.imagen = img.target.files[0];
  }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.sp.listar().subscribe(data => {
      this.productos = data;
      console.log(data);
    }, err => {

    });
    this.sprov.listar().subscribe(data => {
      this.proveedores = data;
    }, err => {

    });
    this.sc.listar().subscribe(data => {
      this.categorias = data;
      console.log(data);
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
    });
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
      precio : 0,
      cantidad : 0,
      proveedor:"",
    }
  }

  guardarCat(){
    this.sc.guardar(this.formCategorias)
    .subscribe(data => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Nueva categoria agregada',
        showConfirmButton: false,
        timer: 1500,
      });
      this.listar();
      this.limpiarForm();
      this.formCategorias={
        nombre:""
      }
    }, err => {

    })
  }

}
