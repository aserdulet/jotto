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

  language = 'ro';
  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {

    if (this.language === 'en') {
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

    if (this.language === 'ro' || this.language === 'bg') {
      const url = `https://${this.language}.wiktionary.org/w/api.php`;
      const params: any = {
        action: 'query',
        titles: control.value,
        format: 'json',
        origin: '*'
      };
      return this.http.get<{query: {[key: string]: { pages: unknown}}}>(url, { params }).pipe(map(val => {
        console.log(val)
        const page = val.query['pages'];
        const pageId = Object.keys(page)[0];
        return pageId !== "-1"
        ? null
        : {
          dictionaryWord: {
            isWord: true
          }
        }
      }));
    }
    return of(null)
    }
  }
