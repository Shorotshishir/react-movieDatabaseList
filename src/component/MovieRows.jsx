import React, { Component } from 'react'

export default class MovieRow extends Component {
  render() {
    return (
      
      <React.Fragment>
        
        <table key={this.props.movie.id}>
            <tbody>
                <tr key={this.props.movie.id}>
                  {/* <td>for christ sake show me something !!!!</td> */}
                    <td><img src={this.props.movie.poster_src} alt="poster"/></td>
                    <td>
                      <p>{this.props.movie.title}</p>
                      <p>{this.props.movie.overview}</p>
                      <input type="button" value="View" href='google.com' target_='blank'/>
                    </td>
                    
                </tr>
            </tbody>
        </table>
      </React.Fragment>

    )
  }
}
