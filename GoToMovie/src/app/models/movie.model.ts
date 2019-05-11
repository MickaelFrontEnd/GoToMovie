export const MOVIES = 'movies'; 

export default class MovieModel {
  constructor(
    public _id: string,
    public movieTitle: string,
    public movieDescription: string,
    public movieLanguage: string,
    public movieType: string,
    public movieActor: string,
    public movieDirector: string,
    public movieTrailer: string,
    public moviePic: string
  ) {}
}
