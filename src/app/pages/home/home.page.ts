import { Component } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, NgFor, RouterLink, HttpClientModule],
})
export class HomePage {

  apiURL = "https://apibikes.up.railway.app/apiBikes";
  bikes = <any>[];
  bikesCount = 0;
  
  brands = <any>[];
  years = <any>[];

  filtredBrand = "all";
  filtredOrder = "relevance"
  filtredYear = "any"

  detailAction: string | null | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private loadingCtrl: LoadingController) {}

  ionViewDidEnter(){
    this.detailAction = this.activatedRoute.snapshot.paramMap.get('detailAction');
    this.getBikes();
    if(this.detailAction == 'true'){
      this.showLoading();
    }
  };

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  getBikes(){
    this.bikesCount = 0;
    this.http.get(`${this.apiURL}/motos`).subscribe(res => {
      this.bikes = res;
      this.bikes.forEach((bike: any) => {
        this.bikesCount++;
        if(!this.brands.includes(bike.brand)){
          this.brands.push(bike.brand);
        }
        if(!this.years.includes(bike.year)){
          this.years.push(bike.year);
        }
        this.years.sort(function(a: number, b: number){return b-a});
      });
    });
  };

  async getBikesFiltred(){
    this.bikesCount = 0;
    if(this.filtredBrand == "all" && this.filtredOrder == "relevance" && this.filtredYear == "any"){
      this.getBikes();
    }
    if(this.filtredBrand != "all" && this.filtredOrder == "relevance" && this.filtredYear == "any"){
      const jsonBikes = await fetch(this.apiURL + "/motos?brand=" + this.filtredBrand);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand == "all" && this.filtredOrder != "relevance" && this.filtredYear == "any"){
      const jsonBikes = await fetch(this.apiURL + "/motos?order=" + this.filtredOrder);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand == "all" && this.filtredOrder == "relevance" && this.filtredYear != "any"){
      const jsonBikes = await fetch(this.apiURL + "/motos?year=" + this.filtredYear);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand != "all" && this.filtredOrder != "relevance" && this.filtredYear == "any"){
      const jsonBikes = await fetch(this.apiURL + "/motos?order=" + this.filtredOrder + "&brand=" + this.filtredBrand);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand != "all" && this.filtredOrder == "relevance" && this.filtredYear != "any"){
      const jsonBikes = await fetch(this.apiURL + "/motos?year=" + this.filtredYear + "&brand=" + this.filtredBrand);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand == "all" && this.filtredOrder != "relevance" && this.filtredYear != "any"){
      const jsonBikes = await fetch(this.apiURL + "/motos?order=" + this.filtredOrder + "&year=" + this.filtredBrand);
      this.bikes = await jsonBikes.json();
    }
    if(this.filtredBrand != "all" && this.filtredOrder != "relevance" && this.filtredYear != "all"){
      const jsonBikes = await fetch(this.apiURL + "/motos?order=" + this.filtredOrder + "&brand=" + this.filtredBrand + "&year=" + this.filtredYear);
      this.bikes = await jsonBikes.json();
    }
    this.bikes.forEach((bike: any) => {
      this.bikesCount++;
    });
  };

  brandFilter(ev: any){
    this.filtredBrand = ev.target.value;
  };
  orderFilter(ev: any){
    this.filtredOrder = ev.target.value;
  };
  yearFilter(ev: any){
    this.filtredYear = ev.target.value;
  };
}
