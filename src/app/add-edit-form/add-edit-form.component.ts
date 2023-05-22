import * as alertifyjs from 'alertifyjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormationserviceService } from 'src/app/services/formationservice/formationservice.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent implements OnInit {
  editmode: boolean = false;
  editdata: any;
  respdata: any;
  ListFormations: any = [];

  Reactiveform = new FormGroup({
    idformation: new FormControl({ value: 0, disabled: true }),
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    niveau: new FormControl("", Validators.required),
    specialite: new FormControl("", Validators.required),
    date_formation: new FormControl(new Date()),
    heure_formation: new FormControl("", Validators.required),

    cout: new FormControl("", Validators.required),
    quota_max: new FormControl("", Validators.required),
    nbre_places: new FormControl("", Validators.required),
  });

  constructor(
    private service: FormationserviceService,
    @Inject(MAT_DIALOG_DATA) public d: any,
    public dialogRef: MatDialogRef<AddEditFormComponent>
  ) {}

  ngOnInit(): void {
    this.editmode = this.d.editmo;
    this.GetAllFormations();

    if (this.d.idformation != null && this.d.idformation !== '') {
      this.service.getFormationById(this.d.idformation).subscribe(response => {
        this.editdata = response;
        console.log(this.editdata);
        this.Reactiveform.setValue({
          idformation: this.editdata.idformation,
          titre: this.editdata.titre,
          description: this.editdata.description,
          niveau: this.editdata.niveau,
          specialite: this.editdata.specialite,
          date_formation: this.editdata.date_formation,
          heure_formation: this.editdata.heure_formation,
          cout: this.editdata.cout,
          quota_max: this.editdata.quota_max,
          nbre_places: this.editdata.nbre_places
        });
      });
    }
  }

  getReservFormData() {
    if (this.Reactiveform.valid) {
      const editid = this.Reactiveform.getRawValue().idformation;
      console.log(editid);
      if (editid != null && this.editmode) {
        this.updateFormation();
      } else {
        this.addFormation();
      }
    } else {
      alertifyjs.error("Merci d'entrer des données valides pour La Formation");
    }
  }

  addFormation() {
    this.service.saveFormation(this.Reactiveform.value).subscribe(result => {
      this.respdata = result;
      if (this.respdata) {
        this.dialogRef.close();
        alertifyjs.success('Bravo! Les coordonnées de formation sont enregistrées avec succès');
      }
      location.reload();
    });
  }

  updateFormation() {
    const editid = this.Reactiveform.getRawValue().idformation;
    this.service.UpdateFormation(editid, this.Reactiveform.value).subscribe(result => {
      this.respdata = result;
      if (this.respdata) {
        this.dialogRef.close();
        alertifyjs.success('Bravo! Les coordonnées de Formation sont enregistrées avec succès');
      }
      location.reload();
    });
  }

  GetAllFormations() {
    this.service.getAllFormation().subscribe(reps => {
      this.ListFormations = reps;
    });
  }
}
