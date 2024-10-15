import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmptyObject } from 'jquery';
import { Filter } from 'src/app/Models/Products/Filter';
import { ProductDetails } from 'src/app/Models/Products/Product';
import { ProductsService } from 'src/app/services/Product/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public myService: ProductsService,
    public route: ActivatedRoute
  ) {}

  // parentCategories: any;
  // subcategories: any;
  // productsFromCategory: any;
  // ///;
  // ID: any;
  // products: any[] = [];
  // page: number = 1;
  // totalRecords: number = 0;
  // categoryId: any;
  // searchKey: string = '';
  // filterCategory: any;
  // totalCount = 0;
  // showButton: boolean = false;
  // isLoading = false;
  // isLoadingg = false;
  // items: any;
  // itemsURL: [] = [];

  // counterPerPage = 10;
  CategoryId = this.route.snapshot.params['id'];
  subCategories: any;
  productsofSub: any;
  arrrry: [] = [];
  subCategoryId: any;
  Color: any;
  Size: any;
  originSubCateories: any;
  originproducts: [] = [];
  Images: any;

  filter: Filter = {
    subCategories: [],
    color: [],
    size: [],
  };

  async ngOnInit() {
    this.myService.getSubcategories(this.CategoryId).subscribe({
      next: (res) => {
        this.originSubCateories = res;
        this.subCategories = this.originSubCateories;
        this.originproducts = this.originSubCateories.map((p: { products: any }) => p.products).filter((p: any) => !isEmptyObject(p));
        console.log('aaaa');
        console.log(this.originSubCateories);
        console.log(this.originproducts);
        //this.subCategories = [...this.originSubCateories];
        //this.productsofSub = [...this.subCategories.map((p: { products: any; })=>p.products).filter((p: any) => (!isEmptyObject(p)))];
        this.productsofSub = this.originproducts;
        console.log('ressssssssss');
        console.log(this.subCategories);
        console.log(this.productsofSub);
        const arrrry = [].concat(...this.productsofSub);
        this.productsofSub = arrrry;
        /*for(let i=0 ;i<this.productsofSub;i++){
          for(let y=0 ;y<this.productsofSub;y++){

          this.arrrry.push(this.productsofSub[i])
        }*/
        console.log(this.productsofSub);
      },
      error: (err) => {
        console.log(err);
      },
    });

    //this.GetAll();
  }

  getProductsbyCategory(subcategoryId: string) {
    this.myService.getProductsbyCategory(subcategoryId).subscribe({
      next: (res) => {
        this.productsofSub = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(this.productsofSub);
  }

  /*GetAll() {
    this.myService.getProductsByParentCategoryId(this.CategoryId).subscribe({
      next: (res) => {
        this.productsofSub = res;
        this.originproducts =res;
        console.log("done");
        console.log(this.productsofSub);
        this.FilterCombo();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }*/

  subId(e: any) {
    // this.subCategoryId = subId;
  }

  color(col: any) {
    this.Color = col;
  }

  size(si: any) {
    this.Size = si;
  }

  /*Filter() {
    this.myService
      .getProductsFiltered(
        this.CategoryId,
        this.subCategoryId,
        this.Color,
        this.Size
      )
      .subscribe({
        next: (res) => {
          this.productsofSub = res;
          console.log(this.productsofSub);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }*/

  Colors: string[] = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Purple',
    'Pink',
    'Black',
    'White',
    'Gray',
    ' Brown',
  ];

  Sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  // getProducts(page: number) {
  //   this.isLoading = true;
  //   this.myService
  //     .getProductsPaginagtion(page, this.counterPerPage)
  //     .subscribe((data: any) => {
  //       console.log(data);

  //       this.isLoading = false;
  //       this.totalCount = data.totalCount;
  //       this.items = data.items;
  //       console.log(this.items);
  //     });
  // }

  fiterdataBySubCategory(e: any) {
    if (this.filter.subCategories.includes(e.target.value)) {
      let index = this.filter.subCategories.indexOf(e.target.value);
      if (this.filter.subCategories !== -1) {
        this.filter.subCategories.splice(index, 1);
      }
    } else {
      this.filter.subCategories.push(e.target.value);
    }
    console.log(this.filter);
  }

  fiterdataByColor(e: any) {
    console.log(e.target);

    if (this.filter.color.includes(e.target.value)) {
      let index = this.filter.color.indexOf(e.target.value);
      if (this.filter.color !== -1) {
        this.filter.color.splice(index, 1);
      }
    } else {
      console.log(this.filter);

      this.filter.color.push(e.target.value);
    }
    console.log(this.filter);
  }

  fiterdataBySize(e: any) {
    console.log(e.target.value);
    if (this.filter.size.includes(e.target.value)) {
      let index = this.filter.size.indexOf(e.target.value);
      if (this.filter.size !== -1) {
        this.filter.size.splice(index, 1);
      }
    } else {
      this.filter.size.push(e.target.value);
    }
    console.log(this.filter);
  }

  FilterCombo() {
    //console.log('filterrrrr');
    const arrya = [];
    let categorycheck: Boolean = this.originSubCateories.map((c: { id: any }) => c.id)
      .some((item: any) => this.filter.subCategories.includes(item));

    //console.log('cccccccccc' + categorycheck);
    //console.log(this.originSubCateories.map((c: { id: any }) => c.id));
    //console.log(this.filter.subCategories);
    if (!isEmptyObject(this.filter.subCategories)) {
      this.subCategories = this.originSubCateories.filter((c: { id: any }) =>
        this.filter.subCategories.includes(c.id)
      );
      //console.log('rtrtr');
      this.productsofSub = [].concat(
        ...this.subCategories
          .map((c: { products: any }) => c.products)
          .filter((p: any) => !isEmptyObject(p))
      );
      //console.log('sas');
      //console.log(this.subCategories);
      //console.log(this.productsofSub);
      //this.productsofSub = this.originproducts.;

      this.checkcolorSize();
      //console.log('Cate');
      //console.log(this.subCategories);
      //console.log(this.productsofSub);
    } else {
      this.subCategories = this.originSubCateories;
      //console.log(this.subCategories);
      //console.log('Cate2');
      this.productsofSub = [].concat(
        ...this.subCategories
          .map((p: { products: any }) => p.products)
          .filter((p: any) => !isEmptyObject(p))
      );
      //console.log(this.productsofSub);
      this.checkcolorSize();

      console.log(this.subCategories);
      console.log(this.productsofSub);
    }
    //if(!isEmptyObject(this.filter.color)){
    //this.productsofSub = this.productsofSub.filter((p: any)=>!isEmptyObject(p)).filter((p: { color: any; })=>this.filter.color.includes(p.color))[0];
    //}
  }

  checkcolorSize() {
    console.log('Sub Filter');
    //console.log(this.productsofSub);
    //console.log(this.productsofSub.map((p: { productImages: any }) => p.productImages));
    //console.log([].concat(...this.productsofSub.map((p: { productInfo: any }) => p.productInfo)));
   
   /*Check Section*/
    let colorcheck: Boolean = [].concat(...this.productsofSub.map((p: { productInfo: any }) => p.productInfo))
      .map((x: { color: any }) => x.color).some((item: any) => this.filter.color.includes(item));
    //console.log(colorcheck)
    let sizecheck: Boolean = [].concat(...this.productsofSub.map((p: { productInfo: any }) => p.productInfo))
      .map((x: { size: any }) => x.size).some((item: any) => this.filter.size.includes(item));
    //console.log(colorcheck);
    //console.log(sizecheck);

    /*check end*/
    if (!isEmptyObject(this.filter.color) && !isEmptyObject(this.filter.size)) {
      this.productsofSub = this.productsofSub.filter((p: { productInfo: any; })=>!isEmptyObject(p.productInfo.filter((i: { color: any; size: any; })=>this.filter.color.includes(i.color)&&this.filter.size.includes(i.size))));
      
      console.log("Color&Size");
      console.log(this.productsofSub);
    } else if (!isEmptyObject(this.filter.color)) {
      this.productsofSub = this.productsofSub.filter((p: { productInfo: any[]; }) => p.productInfo.filter(()=>colorcheck));
      console.log("Color");
      console.log(this.productsofSub)
      console.log(this.productsofSub.filter((p: { productInfo: any; })=>!isEmptyObject(p.productInfo.filter((i: { color: any; })=>this.filter.color.includes(i.color)))))

      this.productsofSub = this.productsofSub.filter((p: { productInfo: any; })=>!isEmptyObject(p.productInfo.filter((i: { color: any; })=>this.filter.color.includes(i.color))));
      console.log("fColor");
      console.log(this.productsofSub);
    } else if (!isEmptyObject(this.filter.size)) {
      this.productsofSub = this.productsofSub.filter((p: { productInfo: any; })=>!isEmptyObject(p.productInfo.filter((i: { size: any; })=>this.filter.size.includes(i.size))));
      console.log("Size");
      console.log(this.productsofSub);
    }
  }

  clear(e: any) {
    console.log("after Clearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    this.filter = {
      subCategories: [],
      color: [],
      size: [],
    };
console.log("sadsadas")
    this.subCategories = this.originSubCateories;
    //console.log(this.originSubCateories);
    //console.log(this.subCategories);
    this.productsofSub = [].concat(...this.originproducts);
    const x = e.target.parentElement.parentElement;
    const checkboxes = x.getElementsByClassName('removecheckbox');
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      checkbox.checked = false;
    }
  }
}
