import { Component, OnInit } from '@angular/core';
import{Router}from'@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ruta:Router) { }

  ngOnInit(): void {
  }

  paginaadmin()
  {
  this.ruta.navigate(['administrador'])
  }

  home()
  {
  this.ruta.navigate(['stock'])
  }

  paginacerrar()
  {
  this.ruta.navigate(['login'])
  }


}
