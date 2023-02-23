import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  GET_NOTICIAS,
  ADD_NOTICIA,
  DELETE_NOTICIA,
} from 'src/app/graphql/graphql.queries';

type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
};

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.sass'],
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  error: any;

  noticiaForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required),
  });

  addNoticia() {
    // apollo graphql query to add Noticia
    this.apollo
      .mutate({
        mutation: ADD_NOTICIA,
        variables: {
          titulo: this.noticiaForm.value.titulo,
          contenido: this.noticiaForm.value.contenido,
        },
        refetchQueries: [
          {
            query: GET_NOTICIAS,
          },
        ],
      })
      .subscribe(({ data, error }: any) => {
        this.noticias = Object.values(data.createNoticia);
        this.noticiaForm.reset();
        this.error = error;
      });
  }

  deleteNoticia(id: string) {
    // apollo graphql query to delete Noticia
    this.apollo
      .mutate({
        mutation: DELETE_NOTICIA,
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_NOTICIAS,
          },
        ],
      })
      .subscribe(({ data, error }: any) => {
        this.noticias = Object.values(data.removeNoticia);
        this.error = error;
      });
  }

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_NOTICIAS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.noticias = Object.values(data.allNoticia);

        this.error = error;
      });
  }
}
