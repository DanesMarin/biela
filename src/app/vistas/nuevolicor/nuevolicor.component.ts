import { MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from '../../Servicio/servicio.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevolicor',
  templateUrl: './nuevolicor.component.html',
  styleUrls: ['./nuevolicor.component.css'],
})
export class NuevolicorComponent implements OnInit {
  nuevolicorForm!: FormGroup;
  bGuardar: string = 'GUARDAR';

  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public editarDatos: any,private api: ServicioService,
    private CerrarDialogo: MatDialogRef<NuevolicorComponent>
  ) {}

  ngOnInit(): void {
    this.nuevolicorForm = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Tipo: ['', Validators.required],
      ContenidoNeto: ['', Validators.required],
      Precio: ['', Validators.required],
      Cantidad: ['', Validators.required],
      GradoAlcohol: ['', Validators.required],
      PaisdeOrigen: ['', Validators.required],
    });

    if (this.editarDatos) {
      this.bGuardar = 'ACTUALIZAR LICOR';
      this.nuevolicorForm.controls['Nombre'].setValue(this.editarDatos.Nombre);
      this.nuevolicorForm.controls['Tipo'].setValue(this.editarDatos.Tipo);
      this.nuevolicorForm.controls['ContenidoNeto'].setValue(this.editarDatos.ContenidoNeto);
      this.nuevolicorForm.controls['Precio'].setValue(this.editarDatos.Precio);
      this.nuevolicorForm.controls['Cantidad'].setValue(this.editarDatos.Cantidad);
      this.nuevolicorForm.controls['GradoAlcohol'].setValue(this.editarDatos.GradoAlcohol);
      this.nuevolicorForm.controls['PaisdeOrigen'].setValue(this.editarDatos.PaisdeOrigen);
    }
  }
  onSubmit() {}

  nuevoLicor() {
    if (!this.editarDatos) {
      if (this.nuevolicorForm.value) {
        this.api.crearlicor(this.nuevolicorForm.value).subscribe({
          next: (res) => {
            alert('Licor agregado correctamente')
            this.nuevolicorForm.reset()
            this.CerrarDialogo.close('guardar')
          },error: () => {
            alert('error al guardar');
          }
        });
      }
    } else {
      this.modificarlicor()
    }
  }

  modificarlicor() {
    this.api
      .modificarlicores(this.nuevolicorForm.value, this.editarDatos.id)
      .subscribe({
        next: (res) => {
          alert('Licor editado con existo..!')
          this.nuevolicorForm.reset()
          this.CerrarDialogo.close('modificar')
        },
        error: () => {
          alert('Error al editar licor')
        }
      })
  }
}
