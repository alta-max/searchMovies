import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
  const { id } = useParams()
  const [movie, setmovie] = useState({})
  const [isLoading, setisLoading] = useState(true)
  const [error, seterror] = useState({ show: false, msg: "" })

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "False") {
      seterror({ show: true, msg: data.error })
    }
    else {
      setmovie(data);
      setisLoading(false)
      seterror(false)
    }

  }

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`)
  }, [id])

  if (isLoading) {
    return <div className="loading"></div>
  }
  if (error) {
    return <div className="page-error">
      <h1>{error.msg}</h1>
      <Link to="/" className="btn">back to movies</Link>
    </div>
  }
  const { Poster, Title, Plot, Year } = movie;
  return <section className="single-movie">
    <img src={Poster} alt={Title} />
    <div className="single-movie-info">
      <h2>{Title}</h2>
      <p>{Plot}</p>
      <h4>{Year}</h4>
      <Link to="/" className="btn">Back to Movies</Link>
    </div>
  </section>
}

export default SingleMovie
