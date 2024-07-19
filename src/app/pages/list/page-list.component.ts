import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AddingDialogComponent } from '../dialog/adding-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';




@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [
    FormsModule,
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
    AddingDialogComponent,

  ],

  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.scss'
})


export class PageListComponent implements OnInit {

  PageDataSource: any = [];
  PageDatas: any;
  PageDatasId: any;
  removeResult: any;
  selected = 'option2';
  names: string[] = [];
  ids: number[] = [];
  pageNum: number = 0;
  selectedPage: number = -1;
  displayedColumns: string[] = [];

  name: string = ''; // Add property for name
  animal: string = ''; // Add property for animal
  favoriteColor: string = ''; // Add property for favoriteColor
  messageForChild: string = "hello";
  pageResult: any;
  pageParamIdResult:any;
  editRow:any;
  currentPageParamIds:any;
  updateRowId:any;



  constructor(
    private apiService: APIService,
    private changeDedector: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.GetAllPages().subscribe(result => {
      this.PageDataSource = result;
      
    });
  }

  GetPageValues(): any {
    if (this.selectedPage == -1) { return; }
    console.log(this.selectedPage);
    this.apiService.GetPageValuesById(this.selectedPage).subscribe(pageResult => {

      this.PageDatas = pageResult;

      pageResult.forEach((element: { Id: any; }) => 
      {
        console.log('Id:', element.Id);
      });

      this.displayedColumns = Object.keys(this.PageDatas[0]);
      this.displayedColumns.push("Actions");

      this.apiService.GetAllParamIDs(this.selectedPage).subscribe(result => {
        this.currentPageParamIds=result;
        console.table(this.currentPageParamIds);
        
        this.changeDedector.detectChanges();
      });
      this.changeDedector.detectChanges();



    });   
    // this.apiService.GetAllParamIDs(1).subscribe(resultParamIds => {
    //   this.pageParamIdResult=resultParamIds;
    //   console.table(this.pageParamIdResult)
    // });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  deleteElement(rowId: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { id: rowId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.RemmoveParameterValue(rowId, this.PageDataSource[this.selectedPage - 1].Id).subscribe(() => {
          console.log("Deletion complete");
          this.GetPageValues();
          this.changeDedector.detectChanges();
        });
      }
    });
  }
   
  openDialog(): void {
      let dialogRef = this.dialog.open(AddingDialogComponent, {
        data: {
            currentParameterIds: this.currentPageParamIds, currentPage: this.PageDataSource[this.selectedPage - 1],
            selectedPageId: this.selectedPage,
            pagedata: this.PageDatas,
            updateRow: null,
            updateRowId:null
          }
      });
      
      dialogRef.afterClosed().subscribe(result => {
          this.apiService.AddParameterValue(result).subscribe(paramResult => {
          this.GetPageValues();
        });
      })

  }

  editElement(rowId: any) {
    this.editRow = this.PageDatas.find((data: { Id: any; }) => data.Id === rowId);
    console.log(this.editRow);
    this.updateRowId = rowId;
  
    let dialogRef = this.dialog.open(AddingDialogComponent, {
      data: {
        currentParameterIds: this.currentPageParamIds,
        currentPage: this.PageDataSource[this.selectedPage - 1],
        selectedPageId: this.selectedPage,
        pagedata: this.PageDatas,
        updateRow: this.editRow,
        updateRowId: this.updateRowId,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.UpdateParameterValue(this.updateRowId,this.selectedPage, result).subscribe(updateResult=>{
        this.GetPageValues();
      });
      
    });
  }
  
}
