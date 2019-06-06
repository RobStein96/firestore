import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/shared/alumno.model';
import { AlumnoService } from 'src/app/shared/alumno.service';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {

  list: Alumno[];
  constructor(private service: AlumnoService,
    private firestore:AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getAlumnos().subscribe(actionArray =>{
      this.list = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data()
        } as Alumno;
      })
    });
  }

  onEdit(alum:Alumno){
    this.service.formData = Object.assign({},alum);
  }

  onDelete(id:string){
    if(confirm("Are you sure to delete this record")){
      this.firestore.doc('alumnos/'+id).delete();
      this.toastr.warning('Deleted successfully');
    }
  }

}
