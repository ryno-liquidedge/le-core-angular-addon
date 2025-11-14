import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CommonModule } from '@angular/common';

// AUTO-GENERATED IMPORTS WILL BE INSERTED HERE
import { ButtonStandardComponent } from './components/buttons/button-standard.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
            ButtonStandardComponent
  ],
})
export class ElementsModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const button_standard = createCustomElement(ButtonStandardComponent, { injector: this.injector });
    if (!customElements.get('button-standard')) {
        customElements.define('button-standard', button_standard);
    }
  }
}
