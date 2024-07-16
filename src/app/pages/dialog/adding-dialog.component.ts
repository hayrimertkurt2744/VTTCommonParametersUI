import { Component, Inject,  Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../Services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-adding-dialog',
  standalone: true,
  imports: [FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    
    ],
  templateUrl: './adding-dialog.component.html',
  styleUrl: './adding-dialog.component.scss'
})
export class AddingDialogComponent {
  selectedColumn:string=""
  ParameterValue: any;
  paramVal: any;
  paramInput: string="";
  parameterValues: { [key: string]: any } = {};
  snackBar: any;
 
  constructor(
    public dialogRef: MatDialogRef<AddingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: APIService,
    
  ) {}

  onNoClick(): void {
    console.table(this.parameterValues);
    this.dialogRef.close();

  }

  // save(): void {
  //   console.table(this.parameterValues);
  //   this.dialogRef.close(this.data);
  //   this.apiService.AddParameterValue(this.parameterValues);
  //   debugger;
  //   console.debug("Added to DB");

  // }
  save(): void {
    // Assuming parameterId and value structure; modify based on actual model
    const valuesToSend = Object.keys(this.parameterValues).map(key => ({
      parameterId:6, // Ensure this matches your backend's expected field
      value: this.parameterValues[key],
      parameter: { 
        id: 0, // Modify this as needed
        pageId: 1, // Modify this as needed
        columnName: key,
        orderId: 1, // Modify this as needed
        type: 'string', // Modify this as needed
        defaultValue: '', // Modify this as needed
        page: { 
          id: 0, // Modify this as needed
          name: this.data.currentPage, // Modify this as needed
          projectId: 1, // Modify this as needed
          project: { 
            id: 0, // Modify this as needed
            name: '' // Modify this as needed
          }
        }
      }
      
    }));

    console.log('Sending data to API:', valuesToSend);

    this.apiService.AddParameterValue(valuesToSend).subscribe({
      next: (response) => {
        console.log('Response from API:', response);
        this.dialogRef.close(this.parameterValues);
      },
      error: (error) => {
        console.error('Error occurred:', error);
      }
    });
  }
}
