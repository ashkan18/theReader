interface User {
  id: string
  name: string
  username: string
  photos?: Array<Photo>
}


interface Photo {
  thumb: string
}