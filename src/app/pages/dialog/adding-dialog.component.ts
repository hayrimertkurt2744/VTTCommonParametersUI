import { Component, Inject,  Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  parameterValues:any[] = [];
  snackBar: any;
  paramIDs:any;
 
  constructor(
    public dialogRef: MatDialogRef<AddingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
  ) {}

  onNoClick(): void {
    //console.table(this.parameterValues);
    this.dialogRef.close();

  }

  save(): void {
    //this.data.currentParameterIds bunu post request at bitti
    //bu veriyi çekerken parameterID diye çekmişsin Id diye çek tekrar uğraşma
    this.dialogRef.close(this.data.currentParameterIds);
    console.log("Added to DB");
  }
  
  transformData(updateRow: any, currentParameterIds: any[]): any[] {
    return currentParameterIds.map(param => {
      return {
        ParameterId: param.ParameterId,
        Name: param.Name,
        Value: updateRow[param.Name]
      };
    });
  }

  update():void{
    this.dialogRef.close(this.transformData(this.data.updateRow,this.data.currentParameterIds));
    console.log("DB Update");
  } 

}
