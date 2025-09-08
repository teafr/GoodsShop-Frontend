import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  getProducts(query: string) : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + query);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}