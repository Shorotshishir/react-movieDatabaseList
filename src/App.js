import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
import MovieRow from './component/MovieRows'

class App extends Component {
  /**
   * @param  {} props
   * @param  {} {super(props
   * @param  {} this.performSearch(
   */
  constructor(props){
    super(props)
    this.performSearch()
    this.state = {}
  }
  /**
   * @param  {} searchTerm
   * @param  {} {console.log('SearchwithTMDB'
   * @param  {leturl=''if(searchTerm===''} constapi_key='e636871c32d8612f210710f411a807df'consturlString='https
   */
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
  /**
   * @param  {} event
   * @param  {} {console.log(event.target.value
   * @param  {} constsearchTerm=event.target.valueif(searchTerm
   * @param  {} {this.performSearch(searchTerm
   * @param  {} }else{this.defaultList(
   */
  searchChangeHandler(event){
    console.log(event.target.value)
    const searchTerm = event.target.value
    if (searchTerm) {
        this.performSearch(searchTerm)
    } else {
        this.defaultList()
    }
    
  }
  /**
   * @param  {} {return(<div><tableclassName='tableNavbar'><tbody><tr><td><imgwidth='50'src="tmdb_logo.svg"alt="tmdb"/></td><tdwidth='8'></td><td><h2>MoviesDBSearch</h2></td></tr></tbody></table><inputclassName='searchBar'type="text"placeholder='providesearchterm'onChange={this.searchChangeHandler.bind(this
   * @param  {} }/>{this.state.rows}</div>
   */
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
