import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {




  rutalicor:string="http://localhost:3000/Licores/"
  rutausuario:string="http://localhost:3000/usuario"


  constructor(private http:HttpClient) { }

  buscarusario(){
    return this.http.get<any>(this.rutausuario)
  }


  crearlicor(data:any){
    return this.http.post<any>(this.rutalicor,data)
  }

  buscarlicor(){
    return this.http.get<any>(this.rutalicor)
  }
  modificarlicores(data:any, id:number){
  return this.http.put<any>(this.rutalicor+id,data)
  }

  borrarlicor(id:number ){
    return this.http.delete<any>(this.rutalicor+id)
  }
}
