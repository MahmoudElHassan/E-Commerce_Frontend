import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponent } from './components/pager/pager.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    RouterModule
  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent
  ]
})
export class SharedModule { }
