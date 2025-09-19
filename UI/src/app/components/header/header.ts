import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  searchTerm: string = '';

  constructor(public authService: AuthService, private router: Router) { }

  onSearch() {
    if (this.searchTerm == '' || !this.searchTerm) {
      this.router.navigateByUrl('/products');
    }
    else {
      this.router.navigate(['/products'], { queryParams: { name: this.searchTerm } });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
