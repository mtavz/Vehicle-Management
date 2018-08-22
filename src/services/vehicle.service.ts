import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  fromPromise
} from 'rxjs/observable/fromPromise';
import {
  Web3Service
} from './web3.service'

const vehicleArtifacts = require('../../build/contracts/Vehicles.json');
const contract = require('truffle-contract');

@Injectable()
export class VehicleService {

  Vehicle = contract(vehicleArtifacts);

  constructor(
    private web3Ser: Web3Service,
  ) {
    this.Vehicle.setProvider(web3Ser.web3.currentProvider);
  }

  getFixedInfo(plate_id): Observable < any > {
    let meta;

    return Observable.create(observer => {
      this.Vehicle
        .deployed()
        .then(instance => {
          meta = instance;
          //we use call here so the call doesn't try and write, making it free
          return meta.getFixedInfo.call(plate_id);
        })
        .then(value => {
          observer.next(value)
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }


  getDynamicInfo(plate_id): Observable < any > {
    let meta;

    return Observable.create(observer => {
      this.Vehicle
        .deployed()
        .then(instance => {
          meta = instance;
          //we use call here so the call doesn't try and write, making it free
          return meta.getDynamicInfo.call(plate_id);
        })
        .then(value => {
          observer.next(value)
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }


  addVehicle(from, owner, plate_id, name, type, color, yearPro, yearReg, charac, manufac, serial): Observable < any > {
    let meta;
    
    
    let x = Observable.create(observer => {
      this.Vehicle
        .deployed()
        .then(instance => {
        meta = instance;
        return meta.addVehicle(owner, plate_id, name, type, color, yearPro, yearReg, charac, manufac, serial, {
            from: from,
          });
        })
        .then((value) => {
          console.log(value);
        })
        .catch(e => {
          console.log(e);
        });
    });
    console.log("ahihi " + x + " ahihi");
    return x;
  }
}
