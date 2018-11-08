import React, {Component} from 'react'
import '../client.css'
import apiConfig from '../../../constants/api';
import face from '../../../images/faces/a.jpg'

class TalentSearchResult extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    result_list: [
      {
        img: face,
        name: 'Philip LaVerne',
        vda_no: '222',
        role: 'Male Vocalist (tenor) who Dances and Acts',
        description: 'Pop/Rock Tenor with Strong Dancing and Acting Skills and Five Years of Cruise Ship Experience',
        rate: '9.41'
      }
    ]
  };

  btnStyle = {
    width: '18rem'
  };

  goWelcomeScreen = () => {
    window.location.href = "/client/welcome"
  };

  goTalentSearch = () => {
    window.location.href = "/client/talent_search"
  };

  render() {
    const {fetchData} = this.props.location.state;

    return (
      <div>
        <div className="result-title text-center mt-4">Search Result</div>
        <div className="result-subtitle text-center mb-3">Click Picture to View Full Profile</div>
        {fetchData.value.crt_data.map((each, index) => (
          <div key={index} className="d-flex mb-2">
            <img src={apiConfig.server + each.image} className="search-face mr-2"/>
            <div>
              <div>{each.name}(VDA{each.vda_number}) - {each.role_description}</div>
              <div className="font-weight-bold">"{each.comment}"</div>
              <div>Average Rating: {each.avg_rating}</div>
            </div>
          </div>
        ))}

        <div className="font-weight-bold mt-4 mb-2">
          NEAR AVAILABLE (Availability within 14 Days of Specified Contract Start and/or End Date)
        </div>

        {fetchData.value.next_data.map((each, index) => (
          <div key={index} className="d-flex mb-2">
            <img src={apiConfig.server + each.image} className="search-face mr-2"/>
            <div>
              <div>{each.name}(VDA{each.vda_number}) - {each.role_description}</div>
              <div className="font-weight-bold">"{each.comment}"</div>
              <div>Average Rating: {each.avg_rating}</div>
            </div>
          </div>
        ))}

        <div className="mt-5 pb-4">
          <div className="d-flex justify-content-end mr-3">
            <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcomeScreen}>
              Back to My Home Page
            </button>
          </div>
          <div className="mt-2 d-flex justify-content-end mr-3">
            <button className="btn btn-dark" style={this.btnStyle} onClick={this.goTalentSearch}>
              Back to Talent Search
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default TalentSearchResult