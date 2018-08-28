import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service} from '../services/web3.service'

import {VehicleService} from '../services/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO add proper types these variables
  account: any;
  accounts: any;
  fixedInfo: any;
  dynamicInfo: any;
  address: any;
  balance: number;
  vehicle_plate_id: string;
  status: string;

  vehicle_id: string;
  vehicle_owner: string;
  vehicle_name: string;
  vehicle_type: string;
  vehicle_color: string;
  vehicle_charac: string;
  vehicle_manufac: string;
  vehicle_datereg: string;
  vehicle_datepro: any;
  vehicle_serial: string;
  vehicle_status: string;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private vehicleServie: VehicleService
    ) {
    this.onReady();
  }

  onReady = () => {

    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];
      this.address= this.account;
      console.log(this.account);
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
        this.refreshBalance()
      );
    }, err => alert(err))

    this.web3Service.getNetworkID().subscribe(accs => {
      var networkID = accs;
      console.log(networkID);
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
    }, err => alert(err))

    this.web3Service.getBalance('0xca4dbd935ade806b74b94e1ffe706d0eec770174').subscribe(value => {
      console.log(value);
      this.balance=value;
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
    }, err => alert(err))
  };

  


  refreshBalance = () => {
    this.web3Service.getBalance(this.account)
      .subscribe(value => {
        this.balance = value
      }, e => {this.setStatus('Error getting balance; see log.')})
  };

  setStatus = message => {
    this.status = message;
  };

  getInfo =() =>{
    this.setStatus('Getting information... (please wait)');
    this.vehicleServie.getFixedInfo(this.vehicle_plate_id)
    .subscribe((fixedInfo)=>{
      this.fixedInfo = fixedInfo;
      console.log(this.fixedInfo.join(', '));
      this.setStatus("Infomation already!");
    }, e=> this.setStatus('Error when getting information; see log. '))

    this.vehicleServie.getDynamicInfo(this.vehicle_plate_id)
    .subscribe((dynamicInfo)=>{
      this.dynamicInfo = dynamicInfo;
      console.log(this.dynamicInfo.join(', '));
      this.setStatus("Infomation already!");
    }, e=> this.setStatus('Error when getting information; see log. '))
  };

  addVehicle = () => {
    console.log(Date.parse(this.vehicle_datepro)/1000);
    this.vehicle_datepro = Date.parse(this.vehicle_datepro)/1000
    this.setStatus('Initiating transaction... (please wait)');
    this.vehicleServie.addVehicle(this.account,this.vehicle_owner,this.vehicle_id,this.vehicle_name,this.vehicle_type,this.vehicle_color,this.vehicle_datepro, this.vehicle_charac,this.vehicle_manufac,this.vehicle_serial)
    .subscribe(() => {
      this.setStatus('Transaction complete!');
    }, e => this.setStatus('Error sending coin; see log.'))
  };
  }
