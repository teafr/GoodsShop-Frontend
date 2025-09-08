import { Routes } from '@angular/router';
import { ProductDetails } from './components/product-details/product-details';
import { ProductList } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { Profile } from './components/profile/profile';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ThankYou } from './components/thank-you/thank-you';
import { EditProfile } from './components/edit-profile/edit-profile';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    }, {
        path: 'products',
        component: ProductList
    }, {

        path: 'products/:id',
        component: ProductDetails
    }, {
        path: 'cart',
        component: Cart
    }, {
        path: 'checkout',
        component: Checkout
    }, {
        path: 'profile',
        component: Profile
    }, {
        path: 'login',
        component: Login
    }, {
        path: 'register',
        component: Register
    }, {
        path: 'thank-you',
        component: ThankYou
    }, {
        path: 'edit-profile',
        component: EditProfile
    }
];
