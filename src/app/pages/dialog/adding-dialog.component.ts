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
  parameterValues:any[] = [];
  snackBar: any;
  paramIDs:any;
//   currentParameterIds:any[] = [];
 
  constructor(
    public dialogRef: MatDialogRef<AddingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: APIService,
  ) {
    debugger;}

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
    //this.data.currentParameterIds bunu post request at bitti
    //bu veriyi çekerken parameterID diye çekmişsin Id diye çek tekrar uğraşma

    
    // this.apiService.GetAllParamIDs().subscribe(paramResult => {
    //     this.paramIDs = paramResult;
        
    //     // Determine the maximum RowId in existing parameterValues
    //     let maxRowId = 0;
    //     for (let key in this.parameterValues) {
    //         if (this.parameterValues.hasOwnProperty(key) && this.parameterValues[key].hasOwnProperty('RowId')) {
    //             maxRowId = Math.max(maxRowId, this.parameterValues[key].RowId);
    //         }
    //     }
    //     // Set maxRowId to one more than the highest existing RowId
    //     maxRowId += 1;

    //     // Initialize the new columns for parameterValues
    //     for (let key in this.parameterValues) {
    //         if (this.parameterValues.hasOwnProperty(key)) {
    //             // Ensure parameterValues[key] is an object
    //             if (typeof this.parameterValues[key] === 'string') {
    //                 this.parameterValues[key] = { Value: this.parameterValues[key], ParameterID: null, RowId: maxRowId };
    //             } else {
    //                 this.parameterValues[key].ParameterID = null;
    //                 this.parameterValues[key].RowId = maxRowId;
    //             }
    //         }
    //     }

    //     // Check if parameterValues has the same string in its index with parameterIDs Name
    //     for (let key in this.parameterValues) {
    //         if (this.parameterValues.hasOwnProperty(key)) {
    //             let matchingParam = this.paramIDs.find((p: { Name: string; }) => p.Name === key);
    //             console.log(matchingParam);
    //             if (matchingParam) {
    //                 this.parameterValues[key].ParameterID = matchingParam.ParamId;
    //             }
    //         }
    //     }

    //     // Print the updated parameterValues to the console
    //     console.log(this.parameterValues);
    // });
    this.apiService.AddParameterValue(this.data.currentParameterIds).subscribe(paramResult => {

        debugger;

    });
    this.dialogRef.close(this.data);
    console.log("Added to DB");
}

}