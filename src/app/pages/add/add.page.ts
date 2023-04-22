import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
selector: 'app-add',
templateUrl: './add.page.html',
styleUrls: ['./add.page.scss'],
standalone: true,
imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class AddPage implements OnInit {

apiURL = "https://apibikes.up.railway.app/apiBikes";
addBikeForm!: FormGroup;

constructor(private navCtrl: NavController, private http: HttpClient) { }

ngOnInit() {
this.addBikeForm = new FormGroup({
image: new FormControl(null, [Validators.required]),
brand: new FormControl(null, [Validators.required, Validators.minLength(2)]),
model: new FormControl(null, [Validators.required, Validators.minLength(2)]),
year: new FormControl(null, [Validators.required, Validators.min(2000)]),
price: new FormControl(null, [Validators.required, Validators.min(350)])
});
}

submitAddBike(){
let headers = new HttpHeaders({
brand: this.addBikeForm.value.brand,
model: this.addBikeForm.value.model,
year: this.addBikeForm.value.year.toString(),
price: this.addBikeForm.value.price.toString(),
image: this.addBikeForm.value.image
});
this.http.post<any>(`${this.apiURL}/moto`, null, {headers}).subscribe(res => {
console.log(res);
});
this.goBackHome(true);
}

goBackHome(detailAction: boolean) {
this.navCtrl.navigateBack(['home', { detailAction }]);
}

}

