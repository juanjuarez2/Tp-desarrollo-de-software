import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemaService } from '../../services/tema.service';
import { DocenteService } from '../../services/docente.service';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  filteredCursosList: Curso[] = [];
  searchTerm: string = '';
  alumnoId: number | null = null;
  fechaFin: string = '';
  alumnosSeleccionados: number[] = []; // Alumnos ya seleccionados
  idDocente: number | null = null;
  temas: any[] = [];
  docentes: any[] = [];
  cursos: Curso[] = [];
  alumnos: Alumno[] = []; 
  cursoForm: FormGroup;
  editing = false;  
  currentCursoId: number | null = null;  
  alumnoSeleccionado: Alumno | null = null;
  curso: any;
  alumnosDisponibles: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private cursoService: CursoService,
    private temaService: TemaService,
    private docenteService: DocenteService,
    private alumnoService: AlumnoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cursoForm = this.fb.group({
      docente: ['', Validators.required],
      tema: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      precio: [0, [Validators.required]],
      alumnos: this.fb.array([]),  // Inicializa el grupo de alumnos
    });
  }

  ngOnInit(): void {
    this.getAllCursos();
    this.cargarTemas();
    this.cargarDocentes();
    this.cargarEstudiantesDisponibles();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.obtenerCurso(id);
    }
  }

  cargarEstudiantesDisponibles(): void {
    this.alumnoService.getAll().subscribe(
      (data) => {
        this.alumnosDisponibles = data;
        console.log(this.alumnosDisponibles);
      },
      (error) => {
        console.error('Error al obtener los estudiantes disponibles:', error);
      }
    );
  }
  getAllCursos(): void {
    this.cursoService.getAll().subscribe((data) => {
      this.cursos = data;
    });
  }
  get alumnosFormArray(): FormArray {
    return this.cursoForm.get('alumnos') as FormArray;
  }
  
  obtenerCurso(id: number): void {
    this.cursoService.getById(id).subscribe(
      (data) => {
        this.curso = data;
        this.populateCursoForm();
      },
      (error) => {
        console.error('Error al obtener los detalles del curso:', error);
      }
    );
  }

  populateCursoForm(): void {
    if (this.curso) {
      this.cursoForm.patchValue({
        tema: this.curso.tema,
        fechaInicio: this.curso.fechaInicio,
        fechaFin: this.curso.fechaFin,
        docente: this.curso.docente,
        precio: this.curso.precio,
      });

      // Poblar los alumnos seleccionados en el formulario
      this.editing = true;
      this.currentCursoId = this.curso.id; 
    }
  }
  onSubmit(): void {
    if (this.cursoForm.valid) {
      const curso: Curso = this.cursoForm.value;
      const cursoData = this.cursoForm.value;
      console.log("valido");
      cursoData.alumnos = this.alumnosFormArray.controls.map(control => {
        console.log(control.value.alumnoId );
          return { id: control.value.alumnoId }; // Envía solo el ID
      });
      if (this.editing && this.currentCursoId) {
        this.cursoService.update(this.currentCursoId, curso).subscribe(() => {
          this.getAllCursos(); 
          this.resetForm(); 
        });
      } else {
        this.cursoService.create(curso).subscribe(() => {
          this.getAllCursos();
          this.resetForm();  
        });
      }
    }else{
    console.log("invalido")}
  }

  deleteCurso(id: number): void {
    this.cursoService.delete(id).subscribe(() => {
      this.getAllCursos(); 
    });
  }
  inscribirAlumnoEnCurso(): void {
    // Crear un nuevo FormGroup para el alumno que contiene el ID del alumno seleccionado
    const nuevoAlumno = this.fb.group({
      alumnoId: [null, Validators.required] // Puedes añadir más controles si fuera necesario
    });
    
    // Agrega el nuevo FormGroup al FormArray de alumnos
    this.alumnosFormArray.push(nuevoAlumno);
  }

  removerAlumnoEnCurso(alumnoId: number): void {
    this.cursoService.removerAlumno(this.curso.id, alumnoId).subscribe(
      () => {
        alert('Alumno removido exitosamente');
        this.obtenerCurso(this.curso.id); 
      },
      (error) => {
        console.error('Error al remover alumno:', error);
      }
    );
  }

  resetForm(): void {
    this.cursoForm.reset({
      tema: '',
      fechaInicio: '',
      fechaFin: '',
      docente: '',
      precio: 0,
      alumnos: [],
    });
    this.editing = false; 
    this.currentCursoId = null; 
  }

  cargarTemas(): void {
    this.temaService.getAll().subscribe((temas) => {
      this.temas = temas;
    });
  }

  cargarDocentes(): void {
    this.docenteService.getAll().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }

  buscarCursosByFechaFin(): void {
    if (this.fechaFin) {
      this.cursoService.getCursosByFechaFin(this.fechaFin).subscribe(
        (data) => {
          this.cursos = data; 
          this.searchTerm = ''; 
          this.idDocente = null;
        },
        (error) => {
          console.error('Error al obtener los cursos:', error);
        }
      );
    }
  }

  getFilteredCursos(): Curso[] {
    let filteredCursos = this.cursos.filter(curso => 
      this.searchTerm ? curso.tema.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) : true
    );

    if (this.fechaFin) {
      filteredCursos = filteredCursos.filter(curso => new Date(curso.fechaFin) <= new Date(this.fechaFin));
    }

    return filteredCursos;
  }
  editCurso(cursoId: number): void {
    this.obtenerCurso(cursoId); // Llama a la función que carga el curso para editar
  }
  agregarAlumno(alumnoId?: number): void {
    const alumnoGroup = this.fb.group({
      alumnoId: [alumnoId || null, Validators.required],
    });
    this.alumnosFormArray.push(alumnoGroup); // Agrega el nuevo FormGroup al FormArray
  }

  eliminarAlumno(index: number) {
    const alumnoId = this.alumnosFormArray.controls[index].value.alumnoId;
    this.alumnosSeleccionados = this.alumnosSeleccionados.filter(id => id !== alumnoId); // Eliminar el ID del alumno que se va a eliminar
    this.alumnosFormArray.removeAt(index);
  }
  yaSeleccionado(alumnoId: number, index: number): boolean {
    // Verifica si el alumno ya está seleccionado en algún otro control del FormArray
    for (let i = 0; i < this.alumnosFormArray.length; i++) {
      // No verifica el control actual (index) para evitar que se desactive la opción seleccionada en el mismo control
      if (i !== index) {
        const controlValue = this.alumnosFormArray.at(i).get('alumnoId')?.value;
        if (controlValue === alumnoId) {
          return true; // El alumno ya está seleccionado
        }
      }
    }
    return false; // El alumno no está seleccionado
  }
}