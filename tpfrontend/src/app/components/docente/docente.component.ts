import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../models/docente';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-docente',
  standalone:true,
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css'],
  imports:[ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
})

export class DocenteComponent implements OnInit {
  filteredDocentesList: Docente[] = [];
  searchTerm: string = ''; 

  docentes: Docente[] = [];
  docenteForm: FormGroup;
  editing = false;  
  currentDocenteId: number | null = null; 

  constructor(private fb: FormBuilder, private docenteService: DocenteService) {
    
    this.docenteForm = this.fb.group({
      nombre: ['', Validators.required],
      legajo: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {

    this.getAllDocentes();
  }


  getAllDocentes(): void {
    this.docenteService.getAll().subscribe((data) => {
      this.docentes = data;
    });
  }

  // Crear o actualizar un docente
  onSubmit(): void {
    if (this.docenteForm.valid) {
      const docente: Docente = this.docenteForm.value;

      if (this.editing && this.currentDocenteId) {
      
        this.docenteService.update(this.currentDocenteId, docente).subscribe(() => {
          this.getAllDocentes();  // Actualizamos la lista de docentes
          this.resetForm();  // Reseteamos el formulario
        });
      } else {
      
        this.docenteService.create(docente).subscribe(() => {
          this.getAllDocentes();  // Actualizamos la lista de docentes
          this.resetForm();  // Reseteamos el formulario
        });
      }
    }
  }

  deleteDocente(id: number): void {
    this.docenteService.delete(id).subscribe(() => {
      this.getAllDocentes(); 
    });
  }

  editDocente(docente: Docente): void {
    this.docenteForm.patchValue({
      nombre: docente.nombre,
      legajo: docente.legajo,
    });
    this.editing = true;  // Cambiamos a modo edición
    this.currentDocenteId = docente.id;  // Guardamos el ID del docente que estamos editando
  }

  
  resetForm(): void {
    this.docenteForm.reset({
      nombre: '',
      legajo: 0
    });
    this.editing = false;  // Cambiamos a modo creación
    this.currentDocenteId = null;  // Limpiamos el ID del docente en edición
  }

 
  getFilteredDocentes(): Docente[] {
    return this.docentes.filter(docente =>
      docente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
