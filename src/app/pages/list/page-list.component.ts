import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../Services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AddingDialogComponent } from '../dialog/adding-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonParametersService } from '../../Services/commonParameters.service';
import { RouterOutlet } from '@angular/router';



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
    MatPaginatorModule,
    MatBadgeModule,
    MatTooltipModule,
    RouterOutlet
    
  ],
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
  
})
export class PageListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  PageDataSource: any = [];
  PageDatas = new MatTableDataSource<any>();
  PageDatasId: any;
  removeResult: any;
  names: string[] = [];
  ids: number[] = [];
  pageNum: number = 0;
  selectedPage: number = -1;
  displayedColumns: string[] = [];
  rowCount: number = 0;

  name: string = '';
  animal: string = '';
  favoriteColor: string = '';
  messageForChild: string = "hello";

  pageParamIdResult: any;
  editRow: any;
  currentPageParamIds: any;
  updateRowId: any;

  tooltipOpenTime: number = 500;
  tooltipCloseTime: number = 500;

  constructor(
    private commonParametersService: CommonParametersService,
    private changeDedector: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
   
  ) {}

  ngOnInit(): void {
    
    this.PageDatas.paginator = this.paginator;
    this.commonParametersService.GetAllPages().subscribe(result => {
      this.PageDataSource = result;
      
    });

  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");
  }


  onPaginatorChange(pageIndex:number, pageSize:number) {
    
    console.log("Paginator has changed");
    this.GetPageValues(pageIndex, pageSize);
    console.log(this.paginator.getNumberOfPages());
  }

  GetPageValues(pageIndex: number, pageSize: number): any {
    this.PageDatas.paginator = this.paginator;
    console.log("Get page values called");
    if (this.selectedPage == -1) { return; }

    const skip = pageIndex * pageSize;
    const take = pageSize;

    this.commonParametersService.GetTotalCount(this.selectedPage).subscribe((total: number) => {
      this.rowCount = total;
      

      this.commonParametersService.GetPageValuesById(this.selectedPage, skip, take).subscribe((data: any[]) => {
        this.PageDatas.data = data;

        if (data && data.length > 0) {
          console.table(data);
          this.displayedColumns = Object.keys(data[0]);
          if (!this.displayedColumns.includes("Actions")) {
            this.displayedColumns.push("Actions");
          }
        }

        this.commonParametersService.GetAllParamIDs(this.selectedPage).subscribe(result => {
          this.currentPageParamIds = result;
          this.changeDedector.detectChanges();
        });
        this.changeDedector.detectChanges();
      }, error => {
        console.error('Error fetching page values', error);
        this.PageDatas.data = [];
      });
    }, error => {
      console.error('Error fetching total count', error);
      this.rowCount = 0;
      this.paginator.length = 0;
    });
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
        debugger;
        console.table(this.PageDataSource);
        this.commonParametersService.RemoveParameterValue(rowId, this.selectedPage).subscribe(result => {
          console.log("this pageId"+this.selectedPage );

          this.GetPageValues(this.paginator.pageIndex, this.paginator.pageSize);
          this.changeDedector.detectChanges();
        });
      }
    });
  }
   
  openDialog(): void {
    let dialogRef = this.dialog.open(AddingDialogComponent, {
      data: {
        currentParameterIds: this.currentPageParamIds,
        currentPage: this.PageDataSource[this.selectedPage - 1],
        selectedPageId: this.selectedPage,
        pagedata: this.PageDatas.data,
        updateRow: null,
        updateRowId: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.commonParametersService.AddParameterValue(result).subscribe(x => {
        this.GetPageValues(this.paginator.pageIndex, this.paginator.pageSize);
        this.changeDedector.detectChanges();
      });
    });
  }

  editElement(rowId: any) {
    this.editRow = this.PageDatas.data.find((data: { Id: any }) => data.Id === rowId);
    console.log(this.editRow);
    this.updateRowId = rowId;

    let dialogRef = this.dialog.open(AddingDialogComponent, {
      data: {
        currentParameterIds: this.currentPageParamIds,
        currentPage: this.PageDataSource[this.selectedPage - 1],
        selectedPageId: this.selectedPage,
        pagedata: this.PageDatas.data,
        updateRow: this.editRow,
        updateRowId: this.updateRowId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.commonParametersService.UpdateParameterValue(this.updateRowId, this.selectedPage, result).subscribe(x => {
        this.GetPageValues(this.paginator.pageIndex, this.paginator.pageSize);
        this.changeDedector.detectChanges();
      });
    });
  }
}