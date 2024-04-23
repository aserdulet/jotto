import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';


type DictionaryAPIResponse = {
  [key: string]: string
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryWordValidator implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {
    return this.http.get<DictionaryAPIResponse>(`https://api.dictionaryapi.dev/api/v2/entries/en/${control.value}`).pipe(
      map((val) => {
        console.log('val', val)
        return val?.['title'] ? {
          dictionaryWord: {
            isWord: true
          }
        } : null 
      }),
      catchError(() => of({ dictionaryWord: {unkownError: true}}))
    )
  }
}
