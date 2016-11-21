/*
 *  Component that renders a single card via the "Styles for CSS Playing Cards" classes.
 */ 
class Card extends React.Component {
    render() {
        var suit = this.props.suit === "diamonds" ? "diams" : this.props.suit;
        var suitUnicodeEntity = "&" + suit + ";";
        var cardClass = "card rank-"+ this.props.rank.toLowerCase() + " " + suit;

        return (
            <div className="col-lg-1 col-sm-2 col-xs-3">
                <div className={cardClass}>
                    <span className="rank">{this.props.rank.toUpperCase()}</span>
                    <span className="suit" 
                          dangerouslySetInnerHTML={{__html: suitUnicodeEntity}}></span>
                </div>
            </div>
        );
    }
}

/*
 *  Component that renders the given deck of cards, provides a mechanism for the user to shuffle them. 
 */
class ShuffleableCardArea extends React.Component {
    constructor(props) {
        super(props);
        this.shuffle = this.shuffle.bind(this);   
        this.state = { cards: props.cards };
    }

    /*
     * Used to shuffle the cards on button click.
     */
    shuffle() {
        this.setState((prevState, props) => {
            var newCards = prevState.cards;

            for (let i = newCards.length; i; i--) {
                let j = Math.floor(Math.random() * i);
                [newCards[i - 1], newCards[j]] = [newCards[j], newCards[i - 1]];
            }

            return { 
                     cards : newCards
                   };
        });
    }

    render() {
        if (this.state.cards.length > 0) {
            var cards = [];

            this.state.cards.forEach(function(card) {
                cards.push(<Card suit={card.suit} rank={card.rank} />);
            });

            return (
                <div>
                    <div className="row btnRow">
                    <div className="col-sm-12">
                        <button type="button" id="shuffleBtn" 
                                onClick={this.shuffle}
                                className="btn btn-lg btn-primary">Shuffle!</button>
                        <hr />
                    </div>     
                    </div>        
                    <div className="row playingCards simpleCards">    
                        {cards}
                    </div>
                </div>
            );

        } else {
            return (
                <div className="row playingCards simpleCards">
                </div>
            );
        }
    }
}

/*
 * Component containing info on the displayed deck.
 */
class DeckHeader extends React.Component {
    render() {
        return (
            <div className="row">
            <div className="col-sm-12">
                <h1>{this.props.name} - {this.props.numberOfCards} cards</h1>
            </div>
            </div>
        );
    }
}

class ShuffleableCardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: {} };
  }

  componentDidMount() {
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function (data) {
            this.setState({ deck: data });
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }

  render() {
    if (this.state.deck.cards) {
        var cards = this.state.deck.cards;

        return (
            <div className="container">
                <DeckHeader name={this.state.deck.name} numberOfCards={cards.length} />
                <ShuffleableCardArea cards={cards} /> 
            </div>
        );
    } else {
        return (
            <div className="container">
            </div>
        );
    }
  }
}

ReactDOM.render(
  <ShuffleableCardApp url="/deckshuffle/api/v1/decks/Basic Deck" />,
  document.getElementById('container')
);