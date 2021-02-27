import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  baseDePersonas;
  constructor(
    private router: Router,
    private personasService: PersonasService
  ) {}

  ngOnInit() {
    this.personasService.getPersonas();
    this.baseDePersonas = this.personasService.basePersonas;
  }

  onEditarPersona(persona) {
    this.router.navigate([`../editar`, persona.id]);
    this.personasService.editarPersona = persona;
  }

  onRemoverPersona(persona) {
    console.log(persona);
    console.log(this.baseDePersonas);
    let index = this.baseDePersonas.indexOf(persona);
    this.baseDePersonas.splice(index, 1);
    this.personasService.basePersonas = this.baseDePersonas;
    this.personasService.saveLocalStorage();
  }
}
