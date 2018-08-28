import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { Web3Service } from '../services/web3.service'
import { VehicleService } from '../services/vehicle.service'


import { Topnavbar } from "./components/topnavbar/topnavbar.component";
import { Navigation } from "./components/navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { HomeComponent } from "./pages/home/home.component";


const SERVICES = [
    VehicleService,
    Web3Service,
]

@NgModule({
    declarations: [
        AppComponent,
        Navigation,
        Topnavbar,
        HomeComponent
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
