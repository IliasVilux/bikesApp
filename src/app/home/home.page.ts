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

  constructor() {}

  ngOnInit(){
    this.getBikes();
  };

  async getBikes(){
    const jsonBikes = await fetch(this.apiURL + "/motos");
    this.bikes = await jsonBikes.json();
    this.bikes.forEach(() => {
      this.bikesCount++;
    });
  }
}
