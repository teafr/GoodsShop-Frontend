import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Sale } from "../models/sale.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SaleService {
    private baseUrl = environment.apiUrl + '/sales';

    constructor(private http: HttpClient) { }
    
    getUserSales(userId: string): Observable<Sale[]> {
        return this.http.get<Sale[]>(`${this.baseUrl}/user/${userId}`);
    }
    
    createSale(sale: Sale): Observable<Sale> {
        return this.http.post<Sale>(this.baseUrl, { ...sale, product: sale.product.id }, { withCredentials: true });
    }

    createMultipleSales(sales: Sale[]): Observable<Sale[]> {
        return this.http.post<Sale[]>(this.baseUrl + '/many', sales.map(sale => ({ ...sale,  product: sale.product.id, })));
    }

    deleteSale(id: number) {
        this.http.delete(`${this.baseUrl}/${id}`).subscribe({
            next: () => console.log('Sale was successfully deleted:'),
            error: err => console.error('Delete failed', err.status)
        });
    }
}