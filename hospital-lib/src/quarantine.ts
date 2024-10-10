import { PatientStateEnum } from "./enum";
import { DrugEnum } from "./enum";

import { PatientsRegister } from "./patientsRegister";

class Patient {
  public state: PatientStateEnum;
  public has_received_treatment: boolean;

  constructor(state: PatientStateEnum) {
    this.state = state;
  }
}

export class Quarantine {
  private static readonly NOT_IMPLEMENTED_MESSAGE = "Work, work.";

  patients: Patient[];
  drugs: String[];

  constructor(_patients: PatientsRegister) {
    let keys = Object.keys(_patients);
    this.patients = [];
    for (let key of keys) {
      for (let i = 0; i < _patients[key]; i++) {
        this.patients.push(new Patient(key as PatientStateEnum));
      }
    }
  }

  public setDrugs(drugs: Array<String>): void {
    this.drugs = drugs as Array<String>;
  }

  public wait40Days(): void {
    if (this.drugs == null) {
      this.drugs = [];
    }

    for (let patient of this.patients) {
      if (patient.has_received_treatment) {
        continue;
      }

      if (
        this.drugs.includes(DrugEnum.Aspirin) &&
        this.drugs.includes(DrugEnum.Paracetamol)
      ) {
        patient.state = PatientStateEnum.Dead;
        patient.has_received_treatment = true;
      } else if (
        this.drugs.includes(DrugEnum.Insulin) &&
        this.drugs.includes(DrugEnum.Antibiotic) &&
        patient.state == PatientStateEnum.Healthy
      ) {
        patient.state = PatientStateEnum.Fever;
        patient.has_received_treatment = true;
      } else if (
        this.drugs.includes(DrugEnum.Insulin) &&
        patient.state == PatientStateEnum.Diabetes
      ) {
        patient.state = PatientStateEnum.Diabetes;
        patient.has_received_treatment = true;
      } else if (patient.state == PatientStateEnum.Diabetes) {
        patient.state = PatientStateEnum.Dead;
        patient.has_received_treatment = true;
      } else if (
        patient.state == PatientStateEnum.Tuberculosis &&
        this.drugs.includes(DrugEnum.Antibiotic)
      ) {
        patient.state = PatientStateEnum.Healthy;
        patient.has_received_treatment = true;
      } else if (
        patient.state == PatientStateEnum.Fever &&
        this.drugs.includes(DrugEnum.Aspirin)
      ) {
        patient.state = PatientStateEnum.Healthy;
        patient.has_received_treatment = true;
      } else if (
        patient.state == PatientStateEnum.Fever &&
        this.drugs.includes(DrugEnum.Paracetamol)
      ) {
        patient.state = PatientStateEnum.Healthy;
        patient.has_received_treatment = true;
      }
    }
  }

  public report(): PatientsRegister {
    let patients_status: PatientsRegister = {};

    let enum_value = Object.values(PatientStateEnum);
    for (let key of enum_value) {
      patients_status[key] = 0;
    }
    for (let patient of this.patients) {
      patients_status[patient.state]++;
    }
    return patients_status;
  }
}
