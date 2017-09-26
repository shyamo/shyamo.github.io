/*Copyright 2017 - Shyam B*/
var ComSingleComponent = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>component render</h1>
          </div>
        </div>
      </div>
    );
  }
});

var selectedPlayer = "1";
var ComWrapper = React.createClass({
    render: function() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2>ux-component</h2>
            </div>
          </div>
        </div>
      );
    }
});

var PlusMinus = React.createClass({

  getInitialState() {
    var players = [{
      "id": "1",
      "name": "component 1",
      "idName": "player1",
      "score": 0,
      "selectedClass": "selected",
      "selected": true,
      "hide": ""
    }, {
      "id": "2",
      "name": "component 2",
      "idName": "player2",
      "score": 0,
      "selectedClass": "",
      "selected": false,
      "hide": ""
    }, {
      "id": "3",
      "name": "component 3",
      "idName": "player3",
      "score": 0,
      "selectedClass": "",
      "selected": false,
      "hide": ""
    }, {
      "id": "4",
      "name": "component 4",
      "idName": "player4",
      "score": 0,
      "selectedClass": "",
      "selected": false,
      "hide": ""
    }];
    return {
        players
    };
  },

  render: function() {

    var self = this;
    var buttonText = [{
      "name": "-10",
      "countClass": "circle minus-ten"
    },{
      "name": "-1",
      "countClass": "circle minus"
    },{
      "name": "+1",
      "countClass": "circle plus"
    },{
      "name": "+10",
      "countClass": "circle plus-ten"
    }];

    var listItems = this.state.players.map(function (plyr, index) {
      let classList = self.state.players[index].selectedClass;
      classList += ' ' + self.state.players[index].hide;
      return (
        <li id={self.state.players[index].idName} draggable="true" className={classList}
        onClick={() => self.playerSelect(self.state.players[index].idName,
          self.state.players[index].id, self.state.players[index].selectedClass, self.state.players[index].selected)}
          ontap={() => self.playerSelect(self.state.players[index].idName,
            self.state.players[index].id, self.state.players[index].selectedClass, self.state.players[index].selected)}>
          <span className="playername">{self.state.players[index].name}</span> <span className="score-badge">{self.state.players[index].score}</span>
        </li>
      );
    });

    var buttonTextComponent = buttonText.map(function (item, i) {
      return (
         <div id={self.state.players[i].idName} className={item.countClass}
         onClick={() => self.eventButton(item.name, self.state.players[i].id)} ontap={() => self.eventButton(item.name, self.state.players[i].id)}
         data-value={item.name}>
          <div className="buttonText">{item.name}</div>
        </div>
      );
    });

    var bigScoreElem = buttonText.map(function (item, i) {
      return (
        <div className={self.state.players[i].selected}>
          <span className="bigscore-value" data-selected={self.state.players[i].selected}
          data-playerscore={self.state.players[i].id}>{self.state.players[i].score}</span>
        </div>
      );
    });

    var deletePlayerList = this.state.players.map(function (index, i) {
      let classList = 'flexbox-container ';
      classList += self.state.players[i].hide;

      return (
          <li className={classList}
          onClick={() => self.deletePlayer(self.state.players[i].id)}
          ontap={() => self.deletePlayer(self.state.players[i].id)}>
            <div className="flexbox-name">
              {self.state.players[i].name}
            </div>
            <div className="flexbox-delete">
              <a href="#" id={'delete' + self.state.players[i].id} className={self.state.players[i].selectedClass}
              onClick={() => self.deletePlayer(self.state.players[i].id)}
              ontap={() => self.deletePlayer(self.state.players[i].id)} role="button">Delete</a>
            </div>
          </li>
      )
    });

    return (
      <div className="score-center">

        <div className="container addremove">
          <div className="row">
            <div className="col-sm-12 update-players">
                <a href="#" className="btn player-add" onClick={() => self.addPlayerModal()} role="button">Settings</a>
            </div>

            <div id="modalbox" className="modalbox-container">

              <div className="container">
                <div className="row">
                  <div className="modal-close" onClick={() => self.closeModal()} ontap={() => self.closeModal()}>
                    <div className="close">
                      &#10005;
                    </div>
                  </div>
                </div>
              </div>

              <div className="add-container">
                <div className="container">
                  <div className="row">
                    <input type="text" className="txt txt-addplayer" id="txtNewPlayer" />
                    <div className="btn-container">
                      <a href="#" className="btn btn-add btn-primary" id="btn-add" onClick={() => self.addNewPlayer()}>add</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="delete-container">
                <div className="container">
                  <div className="row">
                    <ul className="sortable sortable-players">
                      {deletePlayerList}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div className="container list">
          <div className="row">
            <div className="col-sm-12 players">
              <ul className="sortable sortable-players">
                {listItems}
              </ul>
            </div>
            <div className="col-sm-12 actions-container">
              <div className="actions">
                <div className="counter-container">
                  {buttonTextComponent}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  },

  closeModal: function() {
    document.getElementById('modalbox').style.display = 'none';
  },

  addNewPlayer: function() {
    var nextId = this.state.players.length + 1;
    var newPlayerObject = [{
      "id": String(nextId),
      "name": document.getElementById('txtNewPlayer').value,
      "idName": "player" + nextId,
      "score": 0,
      "selectedClass": "",
      "selected": false,
      "hide": ""
    }];
    var players = [];
    player = this.state.players;
    this.state.players.push({id: String(nextId),
      name: document.getElementById('txtNewPlayer').value,
      idName: "player" + nextId,
      score: 0,
      selectedClass:'',
      selected: false
    });
    this.forceUpdate();
  },

  addPlayerModal: function() {
    document.getElementById('modalbox').style.display = 'block';
  },

  deletePlayer: function(rowId) {
    var self = this;
    var hide = this.state.players[rowId - 1].hide;
    var object = this.state.players[rowId - 1];
    object.hide ='hide';
    this.setState({
      hide: 'hide'
    });
    this.forceUpdate();
  },

  eventButton: function(score){
    var self = this;
    var item = this.state.players[selectedPlayer - 1].score;
    var buttonValue = score.substring(1);
    var object = this.state.players[selectedPlayer - 1];
    object.score += parseInt(score);
    this.setState({
      score: score
    });
  },

  playerSelect: function(playerId, id, selectedClass, selected) {
    selectedPlayer = id;

    for (i=0; i < this.state.players.length; i++) {
      object = this.state.players[i];
      object.selectedClass = '';
      this.setState({
        selectedClass: selectedClass
      });
      object.selected = 'false';
      this.setState({
        selected: selected
      });
    }
    object = this.state.players[parseInt(id) - 1];
    object.selectedClass = 'selected';
    this.setState({
      selectedClass: selectedClass
    });
    object.selected = true;
    this.setState({
      selected: selected
    });
  }

});

React.render(<div>
    <PlusMinus/>
  </div>, document.getElementById("root"));
