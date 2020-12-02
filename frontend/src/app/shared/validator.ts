import { ValidatorFn, AbstractControl } from '@angular/forms';

export function equalValidator(compareTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const controlValue = control.value;
        const controlToCompare = control.root.get(compareTo);

        if (controlToCompare && controlValue !== controlToCompare.value) {
            return { 'notEqual': true };
        }
        return null;
    }
}