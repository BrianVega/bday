import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {PhotoInterface} from '../app/interfaces/PhotoInterface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private baseUrl: string = "assets/photos";


  constructor() { }

  getPhotosFromAssets(): Observable<PhotoInterface[]> {
    // Yes, this and many more things are hardcoded
    const photoScaffold : PhotoInterface[] =
      [
        {
          url : `${this.baseUrl}/photo1.jpg`,
          caption: "Día de pumpeaños en Gastro Pub"
        },
        {
          url : `${this.baseUrl}/photo2.jpg`,
          caption: "Fotito express en farmacia GDL"
        },
        {
          url : `${this.baseUrl}/photo3.jpg`,
          caption: "Quemándonos en el Jardín"
        },
        {
          url : `${this.baseUrl}/photo4.jpg`,
          caption: "Escalada fit a la fuerza"
        },
        {
          url : `${this.baseUrl}/photo5.jpg`,
          caption: "Comprando una burguesa pa la nenuca"
        },
        {
          url : `${this.baseUrl}/photo6.jpg`,
          caption: "Picnic sin saca-corchos"
        },
        {
          url : `${this.baseUrl}/photo7.jpg`,
          caption: "Bodorrio"
        },
        {
          url : `${this.baseUrl}/photo8.jpg`,
          caption: "Dándole de comer a las ardillas"
        },
        {
          url : `${this.baseUrl}/photo9.jpg`,
          caption: "Foto navideña en el arco"
        },
      ]

    return from([photoScaffold]);
  }
}
