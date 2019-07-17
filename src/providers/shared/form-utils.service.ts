import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Injectable()
export class FormUtilsService {
    constructor() {}

    markAsPristine(form: FormGroup): void {
        Object.keys(form.controls).forEach( key => {
            form.controls[key].markAsPristine();
        });
    }

    hasError(field: string, errors: Array<any>): boolean {
        const err = errors.filter(item => item['field'] === field);
        return err.length > 0 ? true : false;
    }

    getError(field: string, errors: Array<any>): string {
        let err = '';
        errors.forEach(item => {
            if (item['field'] === field) {
                err = item['message'];
            }
        });
        return err;
    }

    disableForm(form: FormGroup): void {
        for (const field of Object.keys(form.controls)) {
            form.controls[field].disable();
        }
    }

    enableForm(form: FormGroup): void {
        for (const field of Object.keys(form.controls)) {
            form.controls[field].enable();
        }
    }
}