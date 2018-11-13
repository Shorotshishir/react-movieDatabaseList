import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
import MovieRow from './component/MovieRows'

class App extends Component {
  constructor(props){
    super(props)
    this.performSearch()
    this.state = {}
  }
  performSearch(searchTerm){
    console.log('Search with TMDB')
    const api_key= 'e636871c32d8612f210710f411a807df'
    const urlString='https://api.themoviedb.org/4/search/movie?api_key='+api_key
    let url=''
    // const api_key= ''
    if (searchTerm==='') {
      console.log('type in the search term')
    } else {
      url=urlString+'&&query='+searchTerm
    }

    $.ajax({
      url:url,
      success:(searchResults)=>{
        const results = searchResults.results
        let movieRows = []
        
        results.forEach(movie => {
            if (movie.poster_path ===undefined) {
                movie.poster_src =''
            } else {
                movie.poster_src ='https://image.tmdb.org/t/p/w185'+ movie.poster_path
            }
            
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
        //   console.log(movieRow)
          movieRows.push(movieRow)
        });
        this.setState({rows: movieRows})
        // console.log({movieRows})
      },
    //   error:(xhr, status, err)=>{
    //     console.error("data fetch failed ! ! ! ")
    //   }
    })
  }

  defaultList(){
    // const api_key= 'e636871c32d8612f210710f411a807df'
    // const urlString='https://api.themoviedb.org/4/list/1?page=1&api_key='+api_key
    // let url=''
  }

  searchChangeHandler(event){
    console.log(event.target.value)
    const searchTerm = event.target.value
    if (searchTerm) {
        this.performSearch(searchTerm)
    } else {
        this.defaultList()
    }
    
  }

  render() {
    return (
      <div >
        <table className='tableNavbar'>
          <tbody>
            <tr>
              <td >
                <img width='50' src="tmdb_logo.svg" alt="tmdb"/>
              </td>
              <td width='8'></td>
              <td><h2>MoviesDB Search</h2></td>
            </tr>
          </tbody>
        </table>
      <input className='searchBar' type="text" placeholder='provide search term'
      onChange={this.searchChangeHandler.bind(this)}
      />
      {this.state.rows}
      </div>
      
    );
  }
}

export default App;
