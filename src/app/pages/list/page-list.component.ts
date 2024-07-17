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
  pageParamIdResult: any[] = [];

  constructor(
    private apiService: APIService,
    private changeDedector: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.apiService.GetAllPages().subscribe(result => {
      //debugger;

      this.PageDataSource = result;
      console.table(result);
      //debugger;
    });




    // this.apiService.RemmoveParameterValue().subscribe(removeResult => {
    //   console.log('Parameter removed:', removeResult);
    // });

  }


  GetPageValues(): any {
    if (this.selectedPage == -1) { return; }
    console.log(this.selectedPage);
    this.apiService.GetPageValuesById(this.selectedPage).subscribe(pageResult => {


      this.PageDatas = pageResult;
      console.table(pageResult);

      this.displayedColumns = Object.keys(this.PageDatas[0]);
      this.displayedColumns.push("Actions");
      console.log(this.displayedColumns);


      this.changeDedector.detectChanges();
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openDialog(): void {

    this.apiService.GetAllParamIDs(this.selectedPage).subscribe(result => {
      let dialogRef = this.dialog.open(AddingDialogComponent, {
        data: {
           currentParameterIds: result, currentPage: this.PageDataSource[this.selectedPage - 1], selectedPageId: this.selectedPage,
          pagedata: this.PageDatas,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog result:' + result)
      })

    });
  }
  deleteElement(pageId:number, rowId:any) {
    debugger;
    console.table(this.PageDatas);
    console.log(pageId);
  }
  editElement(element: any) {
    // Your edit logic here
  }
  
  
}
