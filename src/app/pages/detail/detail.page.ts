import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {

  apiURL = "https://apibikes.up.railway.app/apiBikes";
  bike: any;
  handlerMessage = '';
  roleMessage = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {
    let tmpData = this.route.snapshot.params['data'];
    this.bike = JSON.parse(tmpData);
  }
  ngOnInit() {
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

  goBackHome(){
    this.navCtrl.navigateBack('home');
  }

  async deleteResult(ev: any){
    if(ev.detail.role == "confirm"){
      await fetch(this.apiURL + "/moto/" + this.bike.id);
    }
    this.goBackHome();
  }

}
