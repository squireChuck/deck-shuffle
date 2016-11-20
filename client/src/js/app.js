class Card extends React.Component {
    render() {
        return (
            <div className="col-lg-1 col-sm-2 col-xs-3">
                <div className="card rank-q diams">
                    <span className="rank">Q</span>
                    <span className="suit">&diams;</span>
                </div>
            </div>
        );
    }
}

class CardArea extends React.Component {
    render() {
        var cards = [];

        this.props.cards.forEach(function(card) {
            cards.push(<Card suit={card.suit} rank={card.rank} />);
        });

        return (
            <div className="row playingCards">
                {cards}
            </div>
        );
    }
}

class ShuffleBar extends React.Component {
    render() {
        return (
            <div className="row">
            <div className="col-sm-12">
                <h1>{this.props.name} - {this.props.numberOfCards} cards</h1>
                <button type="button" className="btn btn-primary">Shuffle!</button>               <hr />
            </div>
            </div>
        );
    }
}

class ShuffleableCardApp extends React.Component {
  render() {
    var cards = this.props.deck.cards;

    return (
      <div className="container">
        <ShuffleBar name={this.props.deck.name} numberOfCards={cards.length} />
        <CardArea cards={cards} /> 
      </div>
    );
  }
}

var basicDeck = {"name":"basicDeck","cards":[{"suit":"hearts","rank":"2"},{"suit":"diamonds","rank":"2"},{"suit":"clubs","rank":"2"},{"suit":"spades","rank":"2"},{"suit":"hearts","rank":"3"},{"suit":"diamonds","rank":"3"},{"suit":"clubs","rank":"3"},{"suit":"spades","rank":"3"},{"suit":"hearts","rank":"4"},{"suit":"diamonds","rank":"4"},{"suit":"clubs","rank":"4"},{"suit":"spades","rank":"4"},{"suit":"hearts","rank":"5"},{"suit":"diamonds","rank":"5"},{"suit":"clubs","rank":"5"},{"suit":"spades","rank":"5"},{"suit":"hearts","rank":"6"},{"suit":"diamonds","rank":"6"},{"suit":"clubs","rank":"6"},{"suit":"spades","rank":"6"},{"suit":"hearts","rank":"7"},{"suit":"diamonds","rank":"7"},{"suit":"clubs","rank":"7"},{"suit":"spades","rank":"7"},{"suit":"hearts","rank":"8"},{"suit":"diamonds","rank":"8"},{"suit":"clubs","rank":"8"},{"suit":"spades","rank":"8"},{"suit":"hearts","rank":"9"},{"suit":"diamonds","rank":"9"},{"suit":"clubs","rank":"9"},{"suit":"spades","rank":"9"},{"suit":"hearts","rank":"10"},{"suit":"diamonds","rank":"10"},{"suit":"clubs","rank":"10"},{"suit":"spades","rank":"10"},{"suit":"hearts","rank":"J"},{"suit":"diamonds","rank":"J"},{"suit":"clubs","rank":"J"},{"suit":"spades","rank":"J"},{"suit":"hearts","rank":"Q"},{"suit":"diamonds","rank":"Q"},{"suit":"clubs","rank":"Q"},{"suit":"spades","rank":"Q"},{"suit":"hearts","rank":"K"},{"suit":"diamonds","rank":"K"},{"suit":"clubs","rank":"K"},{"suit":"spades","rank":"K"},{"suit":"hearts","rank":"A"},{"suit":"diamonds","rank":"A"},{"suit":"clubs","rank":"A"},{"suit":"spades","rank":"A"}]};

//   <ShuffleableCardApp url="/deckshuffle/api/v1/decks/basicDeck" />,
ReactDOM.render(
  <ShuffleableCardApp deck={basicDeck} />,
  document.getElementById('container')
);