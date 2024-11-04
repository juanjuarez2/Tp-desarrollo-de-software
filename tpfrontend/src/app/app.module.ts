import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Asegúrate de que la ruta sea correcta
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Im/
/*import { CursoComponent } from './components/curso/curso.component';*/
import { TemaComponent } from './components/tema/tema.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Módulo para formularios reactivos
    FormsModule,         // Módulo para formularios basados en template
  ],
  providers: [],
})
export class AppModule { }
