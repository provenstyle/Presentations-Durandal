define(['services/selectedDeck', 'services/logger'],
    function (deck, logger) {

    var viewAttached = function() {
            window.scrollTo(0, 1);
        },
        activate = function () {
            updateCard();
        };

        var next = function() {
            deck.next();
            updateCard();
        },
            previous = function() {
                deck.previous();
                updateCard();
            };
    
    var card = ko.observable(deck.currentCard()),
        flip = function () {
            $('.card').toggleClass('flip');
        },
        updateCard = function () {
            if ($('.card').hasClass('flip')) {
                setTimeout(function () {
                    card(deck.currentCard());
                }, 400);
            } else {
                card(deck.currentCard());
            }
            $('.card').removeClass('flip');
        },
        cardCount = ko.computed(function () {
            var current = deck.currentCardId() + 1;
            return current + " of " + deck.cardCount();
        }, this);
    
        var random = ko.observable(false),
            randomChanged = function () {
                logger.log("Random checkbox value: " + random());
                deck.pickRandom(random());
                return true;
            };

    return {        
        viewAttached: viewAttached,
        activate: activate,
        
        previous: previous,
        next: next,
        hasPrevious: deck.hasPrevious,
        hasNext: deck.hasNext,
        
        deckName: deck.deckName,
        card: card,
        flip: flip,
        cardCount: cardCount,
        
        random: random,
        randomChanged: randomChanged
    };
});