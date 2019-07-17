import { FormControl } from '@angular/forms';
 
export class PlaceValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "pas un numéro": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "pas un nombre entier": true
            };
        }
 
        if (control.value > 13){
            return {
                "not realistic": true
            };
        }
 
        return null;
    }
 
}