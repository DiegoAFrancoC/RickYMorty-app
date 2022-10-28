import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'

function App() {

  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if (searchInput) {
      id = searchInput
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event => {

    if (event.target.value === '') {
      setSuggestedList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="App">
      <div>
      <img className='image' src="img/image 3.png" alt="" />
      <img className='name' src="img/image 2.png" alt="" />
      </div>
      <form className='search' onSubmit={handleSubmit}>
        <input
          id='idLocation'
          placeholder='Enter another number from 1 to 126'
          type="text"
          onChange={handleChange}
        />
        <button>Search</button>
        <FilterList 
          suggestedList={suggestedList}
          setSearchInput={setSearchInput}
        />
      </form>
      {
        hasError ?
          <ErrorScreen />
          :
          <>
            <LocationInfo location={location} />
            <div className='card-container'>
              {
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
