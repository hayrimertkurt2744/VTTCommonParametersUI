import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageListComponent } from './pages/list/page-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    PageListComponent,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    MatDialogModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'VTTCommonParametersUI';
}
