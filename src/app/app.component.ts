import { Component, OnInit } from '@angular/core';
import  { DatosService } from './datos.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pasteles';
  datos: any;
  datosid: any = {};
  verdetalle: boolean = false;
  datosnuevo: any;
  formPastel: FormGroup
  formCalifiacion: FormGroup
  promedio: number = 0

  constructor(private datosService: DatosService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
   this.getretornar()

  this.formPastel = this.formBuilder.group({
     nombre: [''],
     imagen:['']
   })
  this.formCalifiacion = this.formBuilder.group({
      nota: [''],
      comentario:['']
  })

  }

  getretornar(){
    this.datosService.retornar()
    .subscribe( result =>  this.datos = result)
    this.verdetalle = false;

  }


 getretornarId(id: String){ //recibe el id

  let tempObservable = this.datosService.retornarId(id)

 tempObservable.subscribe( result => {this.datosid = result

  if (this.datosid.calificaciones.length >0){
    let suma:number= 0;
    for (let i =0; i<this.datosid.calificaciones.length ; i++){
      suma = suma + this.datosid.calificaciones[i].nota;

    }
    this.promedio = Math.round(suma/this.datosid.calificaciones.length);

  }
});


//console.log(this.datosid.calificaciones.length)

 this.verdetalle = true;




 }

nuevopastel(){
  const {nombre, imagen} = this.formPastel.value
  this.ingresarPastel(nombre, imagen)

}

ingresarPastel(nombre: String, imagen: String){
  let tempObservable = this.datosService.postNuevoPastel(nombre, imagen)
  tempObservable.subscribe( result => this.datosid = result);


}

nuevaCalificacion(id: String){
  const {nota, comentario} = this.formCalifiacion.value
  let tempObservable = this.datosService.postNuevaCalificacion(nota, comentario,id)
  tempObservable.subscribe( result => this.datosid = result);
}


}
