import React, { Component } from 'react';
import axios from 'axios';

const Match = props => (
    <tr>
      <td>{props.match.outcome + " (" + fancyTimeFormat(props.match.duration) + ")"} </td>
      <td>
        {props.match.championName + "(Level " + props.match.maxLevel + ")"}
        <br />
        {props.match.totalCS +" CS (" +CSpersmin(props.match.totalCS,props.match.duration) + " CS per min)"}
      </td>
      <td style={{ whiteSpace: 'pre-wrap' }} >
        <ul>
        {
            listItems(props.match.items).map((item, index) =>{
                console.log(item)
                return React.createElement(
                    'li',
                    "list" + index,
                    item
                )
            })

        }
        </ul>
      </td>
      <td>{props.match.summonerSpells.spell1 + "/" + props.match.summonerSpells.spell2}</td>
      <td>{props.match.KDA}</td>
      <td>
        {props.match.perks.perk0}
        <br />
        {props.match.perks.perk1}
        <br />
        {props.match.perks.perk2}
        <br />
        {props.match.perks.perk3}
        <br />
        {props.match.perks.perk4}
        <br />
        {props.match.perks.perk5}</td>
      <td>
      </td>
    </tr>
)
function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
function CSpersmin (cs, time){
    return ( cs/time * 60).toFixed(1);
}

function listItems(items){
    var itemslist = [];

    for(var a in items){
        if(items[a] !== "empty")
        itemslist.push(items[a]);
    }

    return itemslist;

    
    // Create the list element:
   /* var list = document.createElement('ul');

    for(var a in items){
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(items[a]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;*/
    
}
export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            matches:[],
            username: ''
        };
    }

    onSubmit(e){
        e.preventDefault();

        console.log(this.state.username);

        axios.get('http://localhost:5000/search/' + this.state.username)
        .then(res => {
            console.log(res.data);
            this.setState({
                matches : res.data
            });
        });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    matchList() {
        return this.state.matches.map((currentMatch,index) => {
            return <Match match={currentMatch}  key = {index}/>;
        })
    }

    render() {
        return (
            <div>
                <div>
                <h3>Search Player</h3>
                <form onSubmit={this.onSubmit}>
            
                <div className="form-group"> 
                    <label>Summoner Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                </div>
                
                
                <div className="form-group">
                    <input type="submit" value="Search" className="btn btn-primary" />
                </div>
                </form>
                </div>

                <div>
                <h3>Recent matches</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Outcome</th>
                    <th>Champion Stats</th>
                    <th>Items</th>
                    <th>Summoners</th>
                    <th>K/D/A</th>
                    <th>Runes</th>
                    </tr>
                </thead>
                <tbody>
                    { this.matchList() }
                </tbody>
                </table>
                </div>
            </div>
        )
    }
}