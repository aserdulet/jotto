import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecretWordService {

  constructor(private http: HttpClient) {

   }
   getWords() {
    return this.http.get<{
    [key: string]: string[];
}>('assets/words/en-words.json');
   }
}
