import React from "react";
import Axios from "axios";
import "./style.css"


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getCountryData = this.getCountryData.bind(this);
  }


  state = {
    confirmed: 0.,
    recovered: 0,
    deaths: 0,
    countries: [],
    lastUpdate: 0,
  };

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const resApi = await Axios.get("https://covid19.mathdro.id/api");
    const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
    const countries = [];
    for (var i = 0; i < resCountries.data.countries.length; i++) {
      countries.push(resCountries.data.countries[i].name);
    }

    this.setState({
      confirmed: resApi.data.confirmed.value,
      recovered: resApi.data.recovered.value,
      deaths: resApi.data.deaths.value,
      countries,
      lastUpdate: resApi.data.lastUpdate,

    })
  }

  async getCountryData(e) {
    if (e.target.value === "worldwide cases") {
      return this.getData()
    }
    const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
    this.setState({
          confirmed: res.data.confirmed.value,
          recovered: res.data.recovered.value,
          deaths: res.data.deaths.value,
        }
    )
  }

  renderCountryOptions() {
    return this.state.countries.map((country, i) => {
      return <option key={i}>{country}</option>
    });


  }


  render() {
    return (
        <div className="container">
          <h1 className="headerVirus">Corona Virus</h1>

          <div className="flex">
            <div className="world">
              <h1 className="world_header">Wirus na świecie</h1>
              <div>
                <select className="dropdown" onChange={this.getCountryData}>
                  <option> Worldwide Cases</option>
                  {this.renderCountryOptions()}
                </select>

                <div className="box confirmed">
                  <h3>Confirmed Cases:</h3>
                  <h4>{this.state.confirmed}</h4>
                </div>
                <div className="box recovered">
                  <h3>Recovered Cases:</h3>
                  <h4>{this.state.recovered}</h4>
                </div>
                <div className="box deaths">
                  <h3>Deaths:</h3>
                  <h4>{this.state.deaths}</h4>
                </div>
              </div>
            </div>
            <div className="poland">
              <h1 className="poland_header">Wirus w Polsce</h1>
              <div className="map_and_chart">

                <div className="infogram-embed map" data-id="3471f218-44e8-4497-a4fc-52ca63a44130"
                     data-type="interactive" data-title="Mapa koronawirusa w Polsce">
                </div>
                <div className="infogram-embed chart" data-id="938cadb1-13d6-49e2-bbb2-ead89d1ecb76"
                     data-type="interactive" data-title="Statystyki Koronawirusa">
                </div>
              </div>
            </div>
          </div>
          <div className="update"> Ostatnia aktualizacja {this.state.lastUpdate}</div>
        </div>
    )
  }
}