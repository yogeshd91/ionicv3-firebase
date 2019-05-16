import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-addplayer',
  templateUrl: 'addplayer.html',
})
export class AddplayerPage {

	user: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public toastCtrl:ToastController, public loadingCtrl: LoadingController) {

		this.user = {
			username: '',
			password: '',
			balance: 0
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddplayerPage');
	}

	savePlayerData() { 

		let loading = this.loadingCtrl.create({ content: "Loading..."});
		loading.present();

		if(this.user.username != '' || this.user.password != ''){		
			this.restProvider.savePlayer(this.user).then((response) => { 
				if(response.id){
					this.toastMessage('Player: '+response.data.username+" created !");
					this.navCtrl.pop();
					loading.dismiss();
				}
			}, (err) => { 
				this.toastMessage(err);
				loading.dismiss();
			}); 
		}
		else{
			this.toastMessage('Please fill in blank fields');
		}
	}

	toastMessage(msg){
		this.toastCtrl.create({
			message: msg,
			duration: 3000
		}).present();
	}
}
