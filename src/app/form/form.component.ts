import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  url: boolean;
  personas: any = {};

  error = false;
  exito = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personasService: PersonasService
  ) {}

  ngOnInit() {
    //fetch persona que quiere editar
    this.personas = this.personasService.editarPersona;
    //route para saber que tipo de form usar
    if (this.router.url == '/agregar') {
      this.url = true;
    } else {
      this.url = false;
    }
  }
  ngOnDestroy() {
    this.personasService.editarPersona = {
      apellido: '',
      nombre: '',
      direccion: '',
      nacimiento: '',
      pais: '',
      telefono: '',
    };
  }

  onEditarPersona(val) {
    //si la pagina hace reload manda devuelta a la tabla
    if (val.apellido == '') {
      console.log('funciono');
      this.router.navigate(['']);
    }
    //fetch persona
    let persona = {
      id: this.personas.id,
      apellido: val.apellido,
      nombre: val.nombre,
      direccion: val.direccion,
      nacimiento: val.nacimiento,
      pais: val.pais,
      telefono: val.telefono,
    };
    //valdiar todos los campos esten completos
    for (let i of Object.keys(persona)) {
      if (persona[i] === '') {
        this.error = true;
        this.exito = false;
        return;
      }
    }
    //realizar el cambio
    let index;
    this.personasService.basePersonas.find((el, ix) => {
      if (el.id == persona.id) {
        return (index = ix);
      }
    });
    this.personasService.basePersonas.splice(index, 1);
    this.personasService.basePersonas.push(persona);
    this.personasService.saveLocalStorage();
    //modificacion de alertas
    this.exito = true;
    this.error = false;
    this.router.navigate(['']);
  }

  onCrearPersonas(val) {
    //fetch persona del form
    let persona = {
      id: Date.now(),
      apellido: val.apellido,
      nombre: val.nombre,
      direccion: val.direccion,
      nacimiento: val.nacimiento,
      pais: val.pais,
      telefono: val.telefono,
    };
    //validar los campos completos
    for (let i of Object.keys(persona)) {
      if (persona[i] === '') {
        return (this.error = true);
      }
    }
    //manejo de mensajes de error
    this.error = false;
    this.exito = true;
    //guardar la persona
    this.personasService.basePersonas.push(persona);
    this.personasService.saveLocalStorage();
  }
}
