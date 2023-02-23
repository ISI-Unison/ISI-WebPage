import { gql } from 'apollo-angular';

const GET_NOTICIAS = gql`
  query {
    allNoticia {
      id
      titulo
      contenido
    }
  }
`;

const ADD_NOTICIA = gql`
  mutation addNoticia($titulo: String!, $contenido: String!) {
    createNoticia(titulo: $titulo, contenido: $contenido) {
      id
      titulo
      contenido
    }
  }
`;

const DELETE_NOTICIA = gql`
  mutation deleteNoticia($id: ID!) {
    removeNoticia(id: $id) {
      id
    }
  }
`;

export { GET_NOTICIAS, ADD_NOTICIA, DELETE_NOTICIA };
