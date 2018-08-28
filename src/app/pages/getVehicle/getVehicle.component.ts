/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, HostListener, NgZone } from '@angular/core';

import { Web3Service } from 'services/web3.service'

import { VehicleService } from 'services/vehicle.service';

@Component({
    selector: 'getVehicle',
    templateUrl: './getVehicle.component.html'
})
export class getVehicleComponent implements OnInit {

    fixedInfo: any;
    dynamicInfo: any;
    vehicle_plate_id: string;
    status: string;

    constructor(
        private _ngZone: NgZone,
        private web3Service: Web3Service,
        private vehicleServie: VehicleService
    ) {
    }

    ngOnInit() {
    }


    setStatus = message => {
        this.status = message;
    };

    getInfo = () => {
        this.setStatus('Getting information... (please wait)');
        this.vehicleServie.getFixedInfo(this.vehicle_plate_id)
            .subscribe((fixedInfo) => {
                fixedInfo[1] = new Date(fixedInfo[1] * 1000);

                this.fixedInfo = fixedInfo;
                
                console.log(this.fixedInfo);
                this.setStatus("Infomation already!");
            }, e => this.setStatus('Error when getting information; see log. '))

        this.vehicleServie.getDynamicInfo(this.vehicle_plate_id)
            .subscribe((dynamicInfo) => {
                dynamicInfo[3] = new Date(dynamicInfo[3] * 1000);

                this.dynamicInfo = dynamicInfo;
                console.log(this.dynamicInfo);
                this.setStatus("Infomation already!");
            }, e => this.setStatus('Error when getting information; see log. '))
    };

}