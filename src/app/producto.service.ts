import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';
  private productoCambioSubject = new Subject<void>();

  productoCambio$ = this.productoCambioSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any> {
    return this.http
      .get(this.apiUrl);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http
      .post(this.apiUrl, producto)
      .pipe(tap(() => this.productoCambioSubject.next()));
  }

  actualizarProducto(id: string, producto: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${id}`, producto)
      .pipe(tap(() => this.productoCambioSubject.next()));
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.productoCambioSubject.next()));
  }
}
