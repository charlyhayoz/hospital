import { PatientsRegister } from 'hospital-lib';

export class History {
  public input: PatientsRegister;
  public output: PatientsRegister;
  public drugs: string[];

  constructor(
    input: PatientsRegister,
    output: PatientsRegister,
    drugs: string[]
  ) {
    this.input = input;
    this.output = output;
    this.drugs = drugs;
  }
}
