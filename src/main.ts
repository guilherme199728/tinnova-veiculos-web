import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { VehicleModule } from './app/component/vehicle/vehicle.module';


platformBrowserDynamic().bootstrapModule(VehicleModule)
  .catch(err => console.error(err));
