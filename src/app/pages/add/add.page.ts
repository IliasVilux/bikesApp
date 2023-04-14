import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class AddPage implements OnInit {

  apiURL = "https://apibikes.up.railway.app/apiBikes";

  brand = new FormControl();
  model = new FormControl();
  year = new FormControl();
  price = new FormControl();

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {}

  addBike(){
    console.log(1);
    /* this.http.post(`${this.apiURL}/moto`, { Headers: {
      brand: this.brand,
      model: this.model,
      year: this.year,
      price: this.price
    }}).subscribe(); */
    this.goBackHome(true);
  }

  goBackHome(detailAction: boolean) {
    this.navCtrl.navigateBack(['home', { detailAction }]);
  }

}
