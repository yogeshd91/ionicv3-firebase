import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AddplayerPage } from '../../pages/addplayer/addplayer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	players: any;

	constructor(public navCtrl: NavController, public restProvider: RestProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
	}

	ionViewDidEnter(){
		this.listofPlayers();
	}

	listofPlayers() {

		let loading = this.loadingCtrl.create({ content: 'Loading...'});
		loading.present();
		this.restProvider.getPlayers().then(data => {
			this.players = data;
			loading.dismiss();
		});
	}

	addPlayer(){
		this.navCtrl.push(AddplayerPage)
	}

	updatePlayers(player,data){
		let loading = this.loadingCtrl.create({ content: "Updating..."});
		loading.present();

		var obj = {
			"password": data.password
		};

		this.restProvider.updatePlayer(player.id,obj).then((response) => { 
			if(!response.error){
				this.toastMessage("Player password updated");
				loading.dismiss();
				this.listofPlayers();
			}
		}, (err) => { 
			this.toastMessage(err);
			loading.dismiss();
		}); 
	}

	deletePlayers(data){

		let loading = this.loadingCtrl.create({ content: "Processing..."});
		loading.present();

		this.restProvider.removePlayer(data).then((response) => { 
			if(!response.error){
				this.toastMessage(response.message);
				loading.dismiss();
				this.listofPlayers();
			}
		}, (err) => { 
			this.toastMessage(err);
			loading.dismiss();
		}); 
	}

	holdClick(data) {
		const confirm = this.alertCtrl.create({
		  title: 'Delete player?',
		  message: 'Do you agree to delete player?',
		  buttons: [
		    {
		      text: 'No',
		      handler: () => {
		        console.log('Disagree clicked');
		      }
		    },
		    {
		      text: 'Yes',
		      handler: () => {
		        console.log('Agree clicked');
		        this.deletePlayers(data);
		      }
		    }
		  ]
		});
		confirm.present();
	}

	update(player) {
		const prompt = this.alertCtrl.create({
		  title: 'Update Player',
		  message: "Enter new password",
		  inputs: [
		    {
		      name: 'password',
		      placeholder: 'Password'
		    },
		  ],
		  buttons: [
		    {
		      text: 'Cancel',
		      handler: data => {
		        console.log('Cancel clicked');
		      }
		    },
		    {
		      text: 'Update',
		      handler: data => {
		        console.log('Saved clicked');
		        this.updatePlayers(player,data);
		      }
		    }
		  ]
		});
		prompt.present();
	}

	toastMessage(msg){
		this.toastCtrl.create({
			message: msg,
			duration: 3000
		}).present();
	}
}