import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

	apiUrl = 'https://rest-demo-ionic.web.app';

	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}

	getPlayers() {
		return new Promise(resolve => {
			this.http.get(this.apiUrl+'/api/v1/players').subscribe(data => {
				resolve(data);
			}, 
			err => {
				console.log(err);
			});
		});
	}

	savePlayer(data) {
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/api/v1/players', data ).subscribe(res => {
				resolve(res);
				}, (err) => {
				reject(err);
			});
		});
	}

	removePlayer(data) {
		return new Promise((resolve, reject) => {
			this.http.delete(this.apiUrl+'/api/v1/players/'+data.id).subscribe(res => {
				resolve(res);
				}, (err) => {
				reject(err);
			});
		});
	}	

	updatePlayer(id,obj) {
		return new Promise((resolve, reject) => {
			this.http.put(this.apiUrl+'/api/v1/players/'+id,obj).subscribe(res => {
				resolve(res);
				}, (err) => {
				reject(err);
			});
		});
	}
}
