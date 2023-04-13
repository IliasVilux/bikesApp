import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class DetailPage implements OnInit {

  apiURL = "https://apibikes.up.railway.app/apiBikes";
  id: any;
  bike = <any>[];
  handlerMessage = '';
  roleMessage = '';

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(`${this.apiURL}/moto/${this.id}`).subscribe(res => {
      for (const [key, value] of Object.entries(res)) {
        this.bike = value;
      }});
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Eliminar',
      role: 'confirm'
    }
  ];

  goBackHome(detailAction: boolean){
    this.navCtrl.navigateBack(['home', {detailAction}]);
  }

  async deleteResult(ev: any){
    if(ev.detail.role == "confirm"){
      this.http.delete(`${this.apiURL}/moto/${this.bike.id}`).subscribe();
      this.goBackHome(true);
    }
  }

}
