import React, { useEffect, useId } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // const keyy = useId()
  const [movieName, setMovieName] = React.useState("");
  const [movieReview, setMovieReview] = React.useState("");

  const [apiData, setApiData] = React.useState([]);
  console.log("🚀 ~ file: App.js ~ line 13 ~ App ~ -data-", apiData);

  const [newReview, setNewReview] = React.useState('')

  useEffect(() => {
    (async function () {
      let response = await axios("http://localhost:8000/api/get");
      console.log(response);
      setApiData(response.data);
    })();
  }, []);

  const formSubmit = () => {
    axios
      .post("http://localhost:8000/apidata", {
        movieName: movieName,
        movieReview: movieReview,
      })
      .then((res) => {
        console.log(res);
      });

    setApiData([
      ...apiData,
      { movieName: movieName, movieReview: movieReview },
    ]);
  };

  const deleteAllFunc = () => {
    axios.delete(`http://localhost:8000/api/deleteall`)
  }

  // React.useMemo(() => {console.log("how are you?")}, [apiData])

  const deleteReview = (id) => {
    // axios.delete(`http://localhost:8000/api/delete?movie=${movie}`)
    axios.delete(`http://localhost:8000/api/delete/${id}`)
  }
  
  const updateReview = (id) => {
    // axios.delete(`http://localhost:8000/api/delete?movie=${movie}`)
    axios.put("http://localhost:8000/api/update", {
      id: id,
      movieReview: newReview,
    })

    setNewReview("")
  }


  return (
    <div className="App">
      <h2>Crud app</h2>

      <label>name:</label>
      <input type="text" onChange={(e) => setMovieName(e.target.value)} />

      <label>Review:</label>
      <input type="text" onChange={(e) => setMovieReview(e.target.value)} />

      <button type="submit" onClick={formSubmit}>
        Submit Data
      </button>

      <button onClick={deleteAllFunc}>Delete ALL data</button>

<div className="outerCard">

{   apiData.map(item => 
      <div key={item.id} className="card">
        <h1>{item.movieName}</h1>
        <p>{item.movieReview}</p>

        <button onClick={()=> deleteReview(item.id)}>Delete</button>
        <input type="text" id="updateInput" onChange={(e)=> {setNewReview(e.target.value)}}/>
        <button onClick={()=> updateReview(item.id)}>Update</button>
      </div>
    )
}
</div>

    </div>
  );
}

export default App;


        {/* <table>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Movie Review</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((item) => (
              <tr key={item.id}>
                <td>{item.movieName}</td>
                <td>{item.movieReview}</td>
              </tr>
            ))}
          </tbody>
        </table> */}