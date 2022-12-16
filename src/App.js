import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import YouTube from 'react-youtube';

function App() {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '5781dc68edd336a415b02ad15023cdf1';
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading movies..." });
  const [playing, setPlaying] = useState(false);

  //funcion para realizar la petición por get a la api
  const traerPeliculas = async(searchKey) =>{
    const type = searchKey ? "search" : "discover";
    const {data: {results}, } = await axios.get(`${API_URL}/${type}/movie` , {
      params: {
        api_key: API_KEY,
        query: searchKey,
      }
    });
    setMovies(results);
    setMovie(results[0]);
  }

  // funcion para buscar peliculas por nombre
  const buscarPelicula = (e) => {
    e.preventDefault();
    traerPeliculas(searchKey);
  }

  useEffect(() => {
    traerPeliculas();
  },[]);

  return (
    <div>
      <h2 className='text-center mt-5 mb-5'>Trailer de películas</h2>
      {/* buscador de peliculas */}
      <form  className='container mb-4' onSubmit={buscarPelicula}>
        <div class="input-group">
          <span class="input-group-text">Búsqueda</span>
          <input className='text form-control' type="text" aria-label="First name" placeholder='buscar...' onChange={(e) =>
          setSearchKey(e.target.value)} />
          <button className='btn btn-primary ms-3'>Buscar</button>
        </div>
      </form>
      {/* contenedor que va a mostrar las peliculas actuales */}
      <div className='container mt-3'>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie.id} className='col-md-4 mb-3'>
              <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" />
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
