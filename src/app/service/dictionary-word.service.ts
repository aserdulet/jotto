import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import { selectFeatureLn } from '../store/selectors/selectors';


type DictionaryAPIResponse = {
  [key: string]: string
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryWordValidator implements AsyncValidator {

  language = '';
  constructor(private http: HttpClient, private store: Store) {
    this.getLanguage() 
   }

  getLanguage() {
    return this.store.pipe(select(selectFeatureLn))
  }

  validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {

    // Currently CORS errors when the project is built for PROD
    // if (this.language === 'en') {
    //   return this.http.get<DictionaryAPIResponse>(`https://api.dictionaryapi.dev/api/v2/entries/en/${control.value}`).pipe(
    //     map((val) => {
    //       return val?.['title'] ? {
    //         dictionaryWord: {
    //           isWord: true
    //         }
    //       } : null 
    //     }),
    //     catchError(() => of({ dictionaryWord: {unkownError: true}}))
    //   )
    // }

    if (this.language === 'ro' || this.language === 'bg' || this.language === 'en') {
      const url = `https://${this.language}.wiktionary.org/w/api.php`;
      const params: any = {
        action: 'query',
        titles: control.value,
        format: 'json',
        origin: '*'
      };
      return this.http.get<{query: {[key: string]: { pages: unknown}}}>(url, { params }).pipe(map(val => {
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
