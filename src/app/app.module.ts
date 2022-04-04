import { NgModule } from '@angular/core';
import { components, imports, providers, bootstrap } from './declarations';

@NgModule({
  declarations: [components],
  imports: [imports],
  providers: [providers],
  bootstrap: [bootstrap],
})
export class AppModule {}
