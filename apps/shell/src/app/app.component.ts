import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RemoteComponentRendererDirective } from './remote-component-renderer.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RemoteComponentRendererDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shell';
}
