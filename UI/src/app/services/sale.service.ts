import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Sale } from "../models/sale.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class SaleService {
    private baseUrl = environment.apiUrl + '/sales';

    constructor(private http: HttpClient) { }
    
    getUserSales(userId: string) {
        return this.http.get<Sale[]>(`${this.baseUrl}/user/${userId}`);
    }
    
    createSale(sale: Sale) {
        const saleDto = {
        ...sale,
        product: sale.product.id, 
        };

        return this.http.post(this.baseUrl, saleDto, { withCredentials: true });
    }

    createMultipleSales(sales: Sale[]) {
        return this.http.post(this.baseUrl + '/many', sales.map(sale => ({
            ...sale,
            product: sale.product.id,
        })));
    }

    deleteSale(id: number) {
        this.http.delete(`${this.baseUrl}/${id}`);
    }
}