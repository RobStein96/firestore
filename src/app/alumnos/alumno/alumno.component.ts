import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from 'src/app/shared/alumno.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  constructor(private service : AlumnoService,
    private firestore:AngularFirestore,
    private toastr : ToastrService) { }
///amazon server  
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      Nombre: '',
      Apellido_Paterno: '',
      Apellido_Materno: '',
      Correo: '',
      Matricula: '',
      Password: ''
    }
  }

  onSubmit(form : NgForm){
    console.log("On submit activated")
    let data = Object.assign({},form.value);
    console.log("Data before: ", data)
    delete data.id;
    console.log("Data after:", data)
    if(form.value.id == null){
      console.log("first if")
      this.firestore.collection('alumnos').add(data);
    } else {
      console.log("else");
      this.firestore.doc('alumnos/'+form.value.id).update(data);
      this.resetForm(form);
      
    }
    this.toastr.success('Registro Exitoso','Registro de alumno');
  }
}
