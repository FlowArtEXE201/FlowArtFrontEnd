import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Đảm bảo đường dẫn đúng

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
