import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Alumno } from './alumno.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
formData: Alumno;

  constructor(private firestore:AngularFirestore) { }

  getAlumnos(){
    return this.firestore.collection('alumnos').snapshotChanges();
  }

}
