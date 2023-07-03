import React, {useState} from "react";

const App = () =>{
  const[search,setSearch] = useState("");
  const [data,setData] = useState([]);

  const submitHandler = e => {
    e.preventDefault();
   fetch(`https://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
    response => response.json()
   ).then(value => setData(value.Search))
  }

  const download = url => {
    fetch(url).then(response => {
      response.arrayBuffer().then(function(buffer){
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        link.click();
      });
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      <center>
        <h2>Search your favorite movie</h2>
        <form onSubmit={submitHandler}>
          <input type="text" value={search} onChange={(e) =>setSearch(e.target.value)}/> <br/>
          <input type="submit" value="search"/>
          <br />
        </form>
        <div className="row">
        {data.map(movie=>
        <div className="col-md-3">
          <div className="card" style={{"width":"15rem"}}>
          <img className="card-img-top" src={movie.Poster} alt={movie.Title}/>
          <div className="card-body">
            <h4 className="card-title">{movie.Title}</h4>
            <a className="btn btn-primary" onClick={()=> download(movie.Poster)}>download Poster</a>
            </div>
          </div>
        </div>
          )}
          </div>
      </center>
    </div>
  )
}
export default App