import { FormControl } from '@angular/forms';

export class LoginValidator {

    static matchOtherValidator (otherControlName: string) {
        let thisControl: FormControl;
        let otherControl: FormControl;
        return function matchOtherValidate (control: FormControl) {
            if (!control.parent) {
                return null;
            }
            if (!thisControl) {
                thisControl = control;
                otherControl = control.parent.get(otherControlName) as FormControl;
                if (!otherControl) {
                    throw new Error('Renseignez l\'autre champ');
                }
                otherControl.valueChanges.subscribe(() => {
                thisControl.updateValueAndValidity();
                });
            }
            if (!otherControl) {
                return null;
            }
            if (!otherControl.value && thisControl.value === '' || !thisControl.value && otherControl.value === '') {
                return null;
            }
            if (otherControl.value !== thisControl.value) {
                return {
                    noMatchOther: true
                };
            }
            return null;
        };
    }
}
