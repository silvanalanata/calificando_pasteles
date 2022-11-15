import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService {


  constructor(private http: HttpClient) {
   // this.retornarId()
   }

  retornar() {
    return this.http.get(environment.servicesURLGetAll);
  }

  retornarId(id: String) {
    let url= `${environment.servicesURLGetId}/${id}`;

   return this.http.get(url)

  }

  postNuevoPastel(pastelero: String, imagen: String){
    let url= (environment.servicesURLnuevoPastel);
    console.log(pastelero)

    return this.http.post(url,{pastelero, imagen})

  }


  postNuevaCalificacion(nota: String, comentario: String, id: String){

    console.log(nota)
    console.log(comentario)
    console.log(id)
    let url= `${environment.servicesURLnuevaCalificacion}/${id}`;

    return this.http.post(url,{nota, comentario})

  }



}
