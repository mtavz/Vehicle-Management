/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit,Component,HostListener,NgZone } from '@angular/core';

import { Web3Service } from 'services/web3.service'

import { VehicleService } from 'services/vehicle.service';

@Component({
    selector: 'newVehicle',
    templateUrl: './newVehicle.component.html'
})
export class newVehicleComponent implements OnInit {

    vehicle_id: string;
    vehicle_owner: string;
    vehicle_name: string;
    vehicle_type: string;
    vehicle_color: string;
    vehicle_charac: string;
    vehicle_manufac: string;
    vehicle_datereg: string;
    vehicle_datepro: string;
    vehicle_serial: string;
    vehicle_status: string;

    status: string;

    account: any;
    isLoaded: boolean = false;

    constructor(
        private _ngZone: NgZone,
        private web3Service: Web3Service,
        private vehicleServie: VehicleService
    ) {

        // Get the initial account balance so it can be displayed.
        this.web3Service.getAccounts().subscribe(accs => {
            this.account = accs[0];
            console.log(this.account);

            this._ngZone.run(() => {
                this.isLoaded = true;
            });
        }, err => alert(err));

    }

    ngOnInit() {
    }


    setStatus = message => {
        this.status = message;
    };


    addVehicle = () => {
        this.setStatus('Initiating transaction... (please wait)');
        this.vehicleServie.addVehicle(
            this.account,
            this.vehicle_owner,
            this.vehicle_id,
            this.vehicle_name,
            this.vehicle_type,
            this.vehicle_color,
            this.vehicle_datepro,
            this.vehicle_charac,
            this.vehicle_manufac,
            this.vehicle_serial
        ).subscribe(() => {
            this.setStatus('Transaction complete!');
        }, e => this.setStatus('Error sending coin; see log.'))
    };

}