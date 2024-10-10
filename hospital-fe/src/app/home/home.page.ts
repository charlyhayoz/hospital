import { Component, inject } from '@angular/core';
import { Services } from '../services/services.service';
import {
  Quarantine,
  DrugEnum,
  PatientStateEnum,
  PatientsRegister,
} from 'hospital-lib';
import { History } from '../models/history';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'hospital-fe';

  MAX_HISTORY = 10;

  public patients!: PatientsRegister;
  public history: History[] = [];
  public drugs!: string[];
  quarantine!: Quarantine;
  constructor(public services: Services) {}

  ngOnInit() {
    this.fetchData();
  }

  // Get full drug name from key
  returnDrugName(key: string): string {
    for (let entrie of Object.entries(DrugEnum)) {
      if (entrie[1] == key) {
        return entrie[0];
      }
    }

    return key;
  }

  // Get full patient state name from key
  returnPatientState(key: string): string {
    for (let entrie of Object.entries(PatientStateEnum)) {
      if (entrie[1] == key) {
        return entrie[0];
      }
    }

    return key;
  }

  update() {
    this.fetchData();
  }

  fetchData() {
    this.retrieve_patients();
    this.retrieve_drugs();
  }

  // Fetch patients state from server
  retrieve_patients() {
    this.services.apiService
      .get<string>('patients')
      .subscribe((_patients: string) => {
        this.patients = {};
        let all_patients: string[] = _patients.split(',');

        for (let entrie of Object.entries(PatientStateEnum)) {
          this.patients[entrie[1]] = 0;
        }

        for (let patient of all_patients) {
          if (this.patients[patient] != null) {
            this.patients[patient]++;
          }
        }

        this.quarantine = new Quarantine(this.patients);
      });
  }

  // Fetch drugs from server
  retrieve_drugs() {
    this.services.apiService.get<string>('drugs').subscribe((drugs: string) => {
      if (drugs.length > 1) this.drugs = drugs.split(',');
      else this.drugs = [];
    });
  }

  // Administer drugs and fill the history
  administer_drugs() {
    this.quarantine.setDrugs(this.drugs);
    this.quarantine.wait40Days();
    let report = this.quarantine.report();

    this.history.unshift(new History(this.patients, report, this.drugs));
  }
}
