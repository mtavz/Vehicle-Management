import {HomeComponent} from "./pages/home/home.component";
import { changeOwnerComponent } from "./pages/changeOwner/changeOwner.component";
import { changeSttComponent } from "./pages/changeStt/changeStt.component";
import { getVehicleComponent } from "./pages/getVehicle/getVehicle.component";
import { newVehicleComponent } from "./pages/newVehicle/newVehicle.component";
import { manageComponent } from "./pages/manage/manage.component";

export const appRoutes=[
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'changeOwner',
        component: changeOwnerComponent
    },
    {
        path: 'changeStt',
        component: changeSttComponent
    },
    {
        path: 'getVehicle',
        component: getVehicleComponent
    },
    {
        path: 'newVehicle',
        component: newVehicleComponent
    },
    {
        path: 'manage',
        component: manageComponent
    },
];
