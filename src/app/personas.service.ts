import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  basePersonas = [];
  editarPersona: {} = {
    apellido: '',
    nombre: '',
    direccion: '',
    nacimiento: '',
    pais: '',
    telefono: '',
  };
  constructor() {}

  getPersonas() {
    if (localStorage.getItem('personas')) {
      this.basePersonas = JSON.parse(localStorage.getItem('personas'));
    } else {
      localStorage.setItem('personas', '[]');
    }
  }

  saveLocalStorage() {
    localStorage.setItem('personas', JSON.stringify(this.basePersonas));
  }
}
