import useFetch from "./useFatch";
export default function useMovieDb(endpoint, query) {
  return useFetch({
    url: `https://api.themoviedb.org/3/${endpoint}`,
    query: {
      api_key: "86ba05b5b5ef9e6cd98405fff0572996",
      languege: "en-US",
      ...query,
    },
  });
}
