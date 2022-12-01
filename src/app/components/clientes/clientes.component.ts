import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit{

  formClientes = {
    idC:"",
    nombre: "",
    direccion : "",
    telefono : ""
  }

  clientes!: Array<any>;
  
  constructor(private sc: ClientesService) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.sc.listar().subscribe(data => {
      this.clientes = data;
    }, err => {
    });
  }

  guardar(){
    this.sc.guardar(this.formClientes)
    .subscribe(data => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Nuevo cliente agregado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.listar();
      this.limpiarForm();
    }, err => {

    })
  }

  eliminar(id_c: string){
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
        this.sc.eliminarCliente(id_c).subscribe((res) => {
          Swal.fire('Eliminado!', 'Registro eliminado', 'success');
          this.listar();
        });
      }
    });
  }

  actualizarProducto(){
    console.log(this.formClientes)
    this.sc.editarCliente(this.formClientes)
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
    this.formClientes = producto;
  }

  limpiarForm(){
    this.formClientes={
      idC:"",
      nombre: "",
      direccion : "",
      telefono : ""
    }
  }
}
