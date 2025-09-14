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

    getUser(): Observable<User> {
        return this.http.get<User>(this.baseUrl);
    }

    register(user: User, password: string): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/register`, { ...user, password }, { withCredentials: true }).pipe(
            tap(token => this.setAccessToken(token))
        );
    }

    login(email: string, password: string): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/login`, { email, password }, { withCredentials: true }).pipe(
            tap(token => this.setAccessToken(token))
        );
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.baseUrl, user);
    }

    markUserAsLoyal(id: string): void {
        this.http.put(`${this.baseUrl}/mark/${id}`, {}).subscribe({
            next: () => console.log("User is marked as loyal"),
            error: err => console.error("User wasn't marked as loyal", err)
        });
    }

    logout(): void {
        localStorage.removeItem(this.key);
        this.http.delete(`${this.baseUrl}/logout`, { withCredentials: true }).subscribe({
            next: () => console.log("User logged out, refresh token removed"),
            error: err => console.error("Logout failed", err)
        });
    }

    refreshTokens(): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/refresh`, {}, { withCredentials: true }).pipe(
            tap(token => this.setAccessToken(token))
        );
    }

    isAuthenticated(): boolean {
        return this.getAccessToken() != null;
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.key);
    }

    setAccessToken(token: string): void {
        localStorage.setItem(this.key, token)
    }
}