import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteComponent } from './components/docente/docente.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { CursoComponent } from './components/curso/curso.component';
import { TemaComponent } from './components/tema/tema.component';


export const routes: Routes = [
  { path: 'temas', component: TemaComponent },
  { path: '', redirectTo: '/cursos', pathMatch: 'full' }, // redireccion por dfecto
  
  { path: 'cursos', component: CursoComponent },
  { path: 'docentes', component: DocenteComponent },
  { path: 'alumnos', component: AlumnoComponent },

  { path: '**', redirectTo: '/cursos' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
