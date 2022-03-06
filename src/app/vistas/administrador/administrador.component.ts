import { ServicioService } from '../../Servicio/servicio.service';
import { Component, OnInit, resolveForwardRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NuevolicorComponent } from '../nuevolicor/nuevolicor.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent implements OnInit {
  constructor(private dialogo: MatDialog, private api: ServicioService) {}

  ngOnInit(): void {
    this.buscar();
  }

  EditarLicor(row: any) {
    this.dialogo.open(NuevolicorComponent, {
        width: '30%', data: row
      }).afterClosed().subscribe((valor) => {
        if (valor === 'modificar') {
          this.buscar()
        }
      })}

  buscar() {
    this.api.buscarlicor().subscribe({
      next: (res) => {
        this.datos = new MatTableDataSource(res)
        this.datos.paginator = this.paginas
        this.datos.sort = this.clasificar}
    });
  }

  eliminar(id:number){
    this.api.borrarlicor(id).subscribe({
      next:(res)=>{
        alert("Licor eliminado con exito")
        this.buscar()
      }, error:()=>{
        alert("Error al eliminar registro de licor")
      }
    })
  }





  Columnas: string[] = ['id','Nombre','Tipo','ContenidoNeto','Precio','Cantidad','GradoAlcohol','PaisdeOrigen','boton'];

  datos!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginas!: MatPaginator;
  @ViewChild(MatSort) clasificar!: MatSort;

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datos.filter = filterValue.trim().toLowerCase();
      if (this.datos.paginator) {
      this.datos.paginator.firstPage();
      }
  }


}
