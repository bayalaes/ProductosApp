import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  producto: any = {
    presupuesto: 0,
    unidad: '',
    producto: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
    fechaAdquisicion: '',
    proveedor: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.obtenerProducto(id).subscribe((data) => {
        this.producto = data;
      });
    }
  }

  guardarProducto() {
    if (this.producto._id) {
      this.productoService
        .actualizarProducto(this.producto._id, this.producto)
        .subscribe(() => {
          this.router.navigate(['/inicio']);
        });
    } else {
      this.productoService.crearProducto(this.producto).subscribe(() => {
        this.router.navigate(['/inicio']);
      });
    }
  }

  eliminarProducto() {
    if (this.producto._id) {
      this.productoService.eliminarProducto(this.producto._id).subscribe(() => {
        this.router.navigate(['/inicio']);
      });
    }
  }
}
