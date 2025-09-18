import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { NavigationMenu } from './components/navigation-menu/navigation-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, NavigationMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
