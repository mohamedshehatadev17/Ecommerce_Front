import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:any;
  categories2:any;
  fillCategories:any;
  constructor(private myService:CategoryService){}
  ngOnInit(): void {
    this.myService.GetParentCategories().subscribe({
      next:(data)=>
      {
        this.categories=data;
      },
      error:(err)=>{console.log(err)}
    })
    
    
    this.myService.GetAllSubCategoriesUnique().subscribe({
      next:(data)=>
      {
        this.categories2=data;
        console.log(this.categories2);

        this.fillCategories = this.categories2.filter((c: { name: string; }) => {
          if (c.name === 'Men' || c.name === 'Women' || c.name === 'Kids') {
            return false;
          }
          return true;
        }).slice(0, 3);
        console.log(this.fillCategories)
      },
      error:(err)=>{console.log(err)}
    })
  }
}
