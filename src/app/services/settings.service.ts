
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class DbSettings {
    constructor() { }

    setDefaultDbApproach() {
        localStorage.setItem('dbApproach', 'ADO');
    }

    getDbApproach(): string {
        return localStorage.getItem('dbApproach')!;
    }

    setDbApproach(dbApproach: string) {
        localStorage.setItem('dbApproach', dbApproach);
    }


}