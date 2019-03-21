interface ServerCoordinate{
  readonly lat: number
  readonly lng: number
}

interface BookInstance {
  id: string
  book: Book
  user: User
  location: ServerCoordinate
}