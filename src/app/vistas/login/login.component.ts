import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../Servicio/servicio.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginformulario!: FormGroup;

  constructor(private ruta: Router, private formBuilder: FormBuilder, private api: ServicioService) {}

  ngOnInit(): void {
    this.loginformulario = this.formBuilder.group({
      email: [''],
      clave: [''],
    });
  }

  login(){
    this.api.buscarusario().subscribe(res=>{
      const usuario = res.find((a:any)=>
      {
        return a.email === this.loginformulario.value.email &&
        a.clave === this.loginformulario.value.clave
      }); if(usuario){
        alert("Ingreso exitoso")
        this.loginformulario.reset()
        this.ruta.navigate(['stock'])
      }else{
        alert("clave o usario incorrecto")
      }
    })

  }

  onLogin(form: any) {}

  paginastock() {
    this.ruta.navigate(['stock']);
  }
}
