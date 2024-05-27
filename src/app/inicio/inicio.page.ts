import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  filtro: string = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
    this.productoService.productoCambio$.subscribe(() => {
      this.cargarProductos();
    });
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter(
      (producto) =>
        producto.producto.toLowerCase().includes(this.filtro.toLowerCase()) ||
        producto.unidad.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  recargarDatos() {
    // Llama a la función cargarProductos() para recargar los datos
    this.cargarProductos();
  }
}
