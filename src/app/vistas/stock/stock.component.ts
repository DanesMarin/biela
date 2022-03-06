import { ServicioService } from '../../Servicio/servicio.service';
import { Component, OnInit, resolveForwardRef,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NuevolicorComponent } from '../nuevolicor/nuevolicor.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(private dialogo:MatDialog, private api:ServicioService) { }

 DialogoN(){
 this.dialogo.open(NuevolicorComponent,
  { width:'30%' }).afterClosed().subscribe(valor=>{
   if(valor === 'guardar'){
     this.buscar()
   } }) }


  ngOnInit(): void {
    this.buscar()
  }

  buscar(){
        this.api.buscarlicor()
        .subscribe({next:(res)=>{
        this.datos = new MatTableDataSource(res)
        this.datos.paginator=this.paginas
        this.datos.sort = this.clasificar
      } })
  }

  Columnas: string[] = ['Nombre', 'Tipo', 'ContenidoNeto','Precio', 'Cantidad'];
  datos!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginas!: MatPaginator;
  @ViewChild(MatSort) clasificar!: MatSort;

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datos.filter = filterValue.trim().toLowerCase();
    if (this.datos.paginator) {
      this.datos.paginator.firstPage()}
   }
}
