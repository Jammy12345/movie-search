import React, { useState, useEffect } from "react";
import logo from './star-wars-logo.png';
import './index.css';
import axios from "axios"
import NotFound from "../NotFound";
import { useHistory } from 'react-router';

function HomePage() {
  const history = useHistory()
  const [error,setError] = useState(true)
  const [searchinput, setsearchinput] = useState("")
  const [personData, setpersonData] = useState([]);
  const [suggestion, setSuggestion] = useState([])


  useEffect(() => {
    const getPersons = async () => {
      const res = await axios.get('https://swapi.dev/api/people/');
      setpersonData(res.data.results)
    }
    getPersons();
  }, []);

  
  const handlePerson = (id) => {
    history.push(`/person/${id}`)
  }


  const handleChange = (searchinput) => {
    let matches = []
    if (searchinput.length > 0) {
      matches = personData.filter((personData) => {
        const regex = new RegExp(`${searchinput}`, "");
        return personData.name.match(regex)
      })
      if(searchinput.length && matches.length === 0){
        setError(false)
      }
    }
    
    setSuggestion(matches)
    setsearchinput(searchinput)
  }
  return (
    error ? 
    (<div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input className="search-input" onChange={(e) => handleChange(e.target.value)} type="text"
        placeholder="Search by name"
        value={searchinput}
      />
      {suggestion && suggestion.map((s, i) =>
        <div className="suggestion" key={i}>{s.name}</div>
      )}

      <div>
        {suggestion.map((item, i) => (
          <div onClick={() => handlePerson(i)} >
            <div className="box">
              <p>{item.name}</p>
              <p>{item.height}</p>
              <p>{item.mass}</p>
              <p>{item.gender}</p>
              <p>{item.eye_color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>) : (<NotFound />)
  );
}

export default HomePage;
