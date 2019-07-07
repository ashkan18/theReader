import axios, { AxiosResponse } from 'axios'
import AuthService from './AuthService'

interface FindResponse{
  book: any
}

interface Coords {
  latitude: number
  longitude: number
}

export default class BookService {
  authService: AuthService = new AuthService;
  // Initializing important variables
  constructor() {
    this.findBook = this.findBook.bind(this)
    this.authService
  }

  public findBook(isbn: string): Promise<FindResponse>{
    return new Promise((resolve, rejected) =>
      this.authService.getToken()
      .then( token => {
        console.warn(token)
        axios({
          url: "https://readtome.herokuapp.com/api/",
          method: "post",
          data: {
            query: `
              mutation findBookInTheWild($isbn: String!) {
                findInTheWild(isbn: $isbn){
                  title
                  id
                  smallCoverUrl
                  authors(first: 10) {
                    edges {
                      node {
                        id
                        name
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              isbn,
            }
          },
          headers: { 'Authorization': `Bearer ${token}`} }
        )
        .then( (response: AxiosResponse) => {
          console.warn(response.data.errors)
          return resolve(response.data)
        })
        .catch( (error: any) => rejected(error))
      })
      .catch((error:any) => rejected(error))
    )
  }

  public postBook(coords: Coords, bookId: string): Promise<{}>{
    return new Promise((resolve, rejected) =>
      this.authService.getToken()
      .then( token => {
        axios({
          url: "https://readtome.herokuapp.com/api/",
          method: "post",
          data: {
            query: `
              mutation postBook($bookId: !ID, $lat: Float, $lng: Float, $offerings: String!, $availability: String!, $medium: String!, $condition: String) {
                postBook(bookId: $bookId, offerings: $offerings, availability: $availability, medium: $medium, condition: $condition, lat: $lat, lng: $lng){
                  id
                  location
                  book {
                    title
                    id
                    authors(first: 10) {
                      edges {
                        node {
                          id
                          name
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              medium: 'test',
              offerings: 'reading',
              condition: 'fair',
              lat: coords.latitude,
              lng: coords.longitude,
              bookId: bookId
            }
          },
          headers: { 'Authorization': `Bearer ${token}`} }
        )
        .then( response => resolve(response.data))
        .catch( error => rejected(error))
      })
      .catch(error => rejected(error))
    )
  }

  public fetchBooks(lat: number, lng: number, term: string): Promise<Array<BookInstance>>{
    return new Promise((resolve, rejected) =>
      this.authService.getToken()
      .then( token => {
        axios({
          url: "https://readtome.herokuapp.com/api/",
          method: "post",
          data: {
            query: `
              query bookInstances($lat: Float, $lng: Float, $term: String, $offerings: [String] ) {
                bookInstances(lat: $lat, lng: $lng, term: $term, offerings: $offerings) {
                  id
                  reader {
                    id
                    name
                    photos
                  }
                  book {
                    id
                    title
                    smallCoverUrl
                    authors(first: 10) {
                      edges {
                        node {
                          name
                          id
                          bio
                        }
                      }
                    }
                  }
                  location
                }
              }
            `,
            variables: {term: null, lat, lng }
          },
          headers: { 'Authorization': `Bearer ${token}`} }
        )
        .then( response => {
          return resolve(response.data.data.bookInstances);
        })
        .catch( error => rejected(error))
      })
      .catch(error => rejected(error))
    )
  }
}
