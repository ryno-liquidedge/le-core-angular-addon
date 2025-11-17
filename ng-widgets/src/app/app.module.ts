import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HelloWidgetComponent } from './widgets/hello-widget.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HelloWidgetComponent],
  // No bootstrap component when using custom elements
  providers: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const helloEl = createCustomElement(HelloWidgetComponent, { injector: this.injector });
    customElements.define('hello-widget', helloEl);
  }
}
