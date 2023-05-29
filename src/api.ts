import { Params } from "react-router-dom";

const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ITvShows {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: number;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface IGetTvShowsResult {
  page: number;
  results: ITvShows[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=ko&api_key=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
}

export function getTvShows() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?language=ko&api_key=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
}

export function getDetails(match: Params<string>) {
  if (match.tvId) {
    return fetch(
      `${BASE_PATH}/tv/${match.tvId}?language=ko&api_key=${process.env.REACT_APP_API_KEY}`
    ).then((response) => response.json());
  }
  if (match.movieId) {
    return fetch(
      `${BASE_PATH}/movie/${match.movieId}?language=ko&api_key=${process.env.REACT_APP_API_KEY}`
    ).then((response) => response.json());
  }
  return null;
}

export function getSearch(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?query=${keyword}&language=ko&api_key=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
}
