import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-factureEacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent implements OnInit {

  clientes !:Array<any>;
  productos !:Array<any>;

  venta = {
    cliente: "",
    producto:"",
    cantidad:0,
    precio:0,
    productos_detalle: []as any,
    total: 0
  };
  
  constructor(
    private sc:ClientesService,
    private sp:ProductosService,
    private sf:FacturasService
    ){}

  ngOnInit(): void {
    this.sc.listar().subscribe(data =>{
      this.clientes = data;
    },err =>{

    });

    this.sp.listar().subscribe(data =>{
      this.productos = data;
    },err =>{

    });
  }

  setearPrecio(){
    let data = this.venta.producto.split("-");
    this.venta.precio = Number(data[1]);
  }

  agregar(){
    let data = this.venta.producto.split("-");
    let existe = this.venta.productos_detalle.findIndex((e: { producto_id: string; }) => e.producto_id == data[0]);
    if(existe != -1){
      this.venta.productos_detalle[existe]={
        producto_id : data[0],
        producto_nombre : data[2],
        cantidad: Number(this.venta.productos_detalle[existe].cantidad)+Number(this.venta.cantidad),
        precio: Number(this.venta.precio),
        subtotal: (Number(this.venta.productos_detalle[existe].cantidad)+Number(this.venta.cantidad))*Number(this.venta.precio)
      }

    } else {
      this.venta.productos_detalle.push({
        producto_id : data[0],
        producto_nombre : data[2],
        cantidad: Number(this.venta.cantidad),
        precio: this.venta.precio,
        subtotal: this.venta.cantidad*this.venta.precio
      });
    }
    this.venta.total += Number(this.venta.cantidad)*Number(this.venta.precio);
  }

  guardar(){
    this.sf.guardar(this.venta).subscribe();
    location.reload(); 

  }
}
