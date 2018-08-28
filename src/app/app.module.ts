import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { Web3Service } from '../services/web3.service'
import { VehicleService } from '../services/vehicle.service'


import { Topnavbar } from './components/topnavbar/topnavbar.component';
import { Navigation } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';
import { getVehicleComponent } from './pages/getVehicle/getVehicle.component';
import { newVehicleComponent } from './pages/newVehicle/newVehicle.component';
import { changeOwnerComponent } from './pages/changeOwner/changeOwner.component';
import { changeSttComponent } from './pages/changeStt/changeStt.component';
import { manageComponent } from './pages/manage/manage.component';


const SERVICES = [
    VehicleService,
    Web3Service,
]

@NgModule({
    declarations: [
        AppComponent,
        Navigation,
        Topnavbar,

        HomeComponent,
        getVehicleComponent,
        newVehicleComponent,
        changeOwnerComponent,
        changeSttComponent,
        manageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [SERVICES],
    bootstrap: [AppComponent]
})
export class AppModule { }
