import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsModuleTemplate } from './app/elements/elements.module.template';

platformBrowserDynamic()
  .bootstrapModule(ElementsModuleTemplate)
  .catch(err => console.error(err));
