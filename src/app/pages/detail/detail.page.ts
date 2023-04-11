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

  bike: any;

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {
    let tmpData = this.route.snapshot.params['data'];
    this.bike = JSON.parse(tmpData);
    console.log(this.bike.brand);
  }

  ngOnInit() {
  }

  goBackHome(){
    this.navCtrl.navigateBack('home');
  }

}
