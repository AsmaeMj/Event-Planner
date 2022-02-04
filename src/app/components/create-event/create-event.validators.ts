import { FormControl, FormGroup } from '@angular/forms';

export function dateValidator(control: FormControl) {
    if (new Date(control.value) <= new Date()) {
        return { invalidDate: true };
    }
}

export function endDateIsBeforeStartDateValidator(p1, p2) {
    return (group: FormGroup) => {
        let start = group.controls[p1];
        let end = group.controls[p2];

        if (start.value >= end.value) {
            return { endDateIsBeforeStartDate: true };
        }
    };
}


export function datesValidator (control: Array<FormControl>) {
    console.log("dates validatorsssssss");
    return false;
}