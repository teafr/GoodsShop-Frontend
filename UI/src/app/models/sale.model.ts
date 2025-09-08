import { Product } from "./product.model";

export interface Sale {
    product: Product;
    user: string;
    quantity: number;
    deliveryDate?: Date;
    purchaseDate: Date;
    discount: number;
}