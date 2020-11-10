import axios from "axios";

const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    params:{
        api_key:"84ed74fda1c213a0d80c5e1533e55707",
        language: "en-US"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) => 
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos"
            }
    }),
    search: (term) => 
        api.get("search/movie", {
            params: {
                query: term
            }
    })
}

export const TVApi =  {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: (id) => api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("search/tv", {
        params: {
            query: term
        }
    })
}

export const collectionApi = (id) => api.get(`collection/${id}`);