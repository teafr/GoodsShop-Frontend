import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = environment.apiUrl + '/auth';
    private key = environment.authKey;

    constructor(private http: HttpClient) {}

    getUser() {
        console.log(`Token in local storage: ${localStorage.getItem(this.key)}`)
        return this.http.get<User>(this.baseUrl);
    }

    register(lastName: string, firstName: string, patronymic: string, email: string, phone: string, address: string, password: string) {
        return this.http.post<string>(`${this.baseUrl}/register`, { lastName, firstName, patronymic, email, phone, address, password }, { withCredentials: true }).pipe(
            tap(token => {
                localStorage.setItem(this.key, token);
            })
        );
    }

    updateUser(user: User) {
        return this.http.put(this.baseUrl, user);
    }

    markUserAsLoyal(id: string) {
        console.log(`Id: ${id}`);
        return this.http.put(`${this.baseUrl}/mark/${id}`, {}).subscribe();
    }

    login(email: string, password: string) {
        return this.http.post<string>(`${this.baseUrl}/login`, { email, password }, { withCredentials: true }).pipe(
            tap(token => {
                localStorage.setItem(this.key, token);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.key);
        this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe({
            next: () => console.log("User logged out, refresh token removed"),
            error: err => console.error("Logout failed", err)
        });
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem(this.key);
        return token !== null && token !== undefined;
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.key);
    }

    refreshTokens(): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/refresh`, {}, { withCredentials: true }).pipe(
            tap(token => {
                console.log(`Token refreshed. Token: ${token}`);
                localStorage.setItem(this.key, token);
            })
        );
    }
}