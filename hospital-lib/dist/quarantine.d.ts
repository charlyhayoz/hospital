import { PatientStateEnum } from "./enum";
import { PatientsRegister } from "./patientsRegister";
declare class Patient {
    state: PatientStateEnum;
    has_received_treatment: boolean;
    constructor(state: PatientStateEnum);
}
export declare class Quarantine {
    private static readonly NOT_IMPLEMENTED_MESSAGE;
    patients: Patient[];
    drugs: String[];
    constructor(_patients: PatientsRegister);
    setDrugs(drugs: Array<String>): void;
    wait40Days(): void;
    report(): PatientsRegister;
}
export {};
