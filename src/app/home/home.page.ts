import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {

  apiURL = "https://apibikes.up.railway.app/apiBikes";
  bikes = <any>[];
  bikesCount = 0;
  brands = <any>[];

  filtredBrand = "all";
  filtredOrder = "relevance"

  constructor() {}

  ngOnInit(){
    this.getBikes();
  };

  async getBikes(){
    this.bikesCount = 0;
    const jsonBikes = await fetch(this.apiURL + "/motos");
    this.bikes = await jsonBikes.json();
    this.bikes.forEach((bike: any) => {
      this.bikesCount++;
      if(!this.brands.includes(bike.brand)){
        this.brands.push(bike.brand);
      }
    });
  }

  async getBikesFiltred(){
    this.bikesCount = 0;
    if(this.filtredBrand == "all" && this.filtredOrder == "relevance"){
      this.getBikes();
    }
    if(this.filtredBrand != "all" && this.filtredOrder == "relevance"){
      const jsonBikes = await fetch(this.apiURL + "/motos?brand=" + this.filtredBrand);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand == "all" && this.filtredOrder != "relevance"){
      const jsonBikes = await fetch(this.apiURL + "/motos?order=" + this.filtredOrder);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand != "all" && this.filtredOrder != "relevance"){
      const jsonBikes = await fetch(this.apiURL + "/motos?order=" + this.filtredOrder + "&brand=" + this.filtredBrand);
      this.bikes = await jsonBikes.json();
    }
    this.bikes.forEach((bike: any) => {
      this.bikesCount++;
    });
  }

  brandFilter(ev: any){
    this.filtredBrand = ev.target.value;
  }
  orderFilter(ev: any){
    this.filtredOrder = ev.target.value;
  }
}
