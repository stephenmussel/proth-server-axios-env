
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App () {
  const [results, setResults] = useState([]);

  // REVIEW: getting data from giphy API
  const fetchGiphyResults = () => {
    axios({
      method: 'GET',
      url: '/giphy'
    }).then(response => {
      // response we get back is an object
      // console.log(response);
      // REVIEW: response is an array of objects
      // console.log(response.data);
      // NOTES: sift thru to get to what you really WANT
      // NOTES: ...which is an array of GIPHY objects w/properties
      console.log(response.data.data);
      // REVIEW: sets resonse to variable `results`
      setResults(response.data.data)

    }).catch(error => {
      console.log('error in fetchGiphyResults', error);
    });
  }

  useEffect(() => {
    fetchGiphyResults();
  }, []);


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">APIS</h1>
          <h4><i>APIS</i></h4>
        </header>
        {/* REVIEW: displays all the results as set from above */}
        {/* {JSON.stringify(results)} */}
        {
          results.map(gif => (
            <p><img src={gif.images.downsized_medium.url} /></p>
          ))
        }
        <br/>
      </div>
    );
  
}

export default App;
