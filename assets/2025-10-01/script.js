document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.querySelector('.game-grid');
    const movesSpan = document.querySelector('.moves');
    const restartBtn = document.querySelector('.restart-btn');

    // 10 unique emojis for a 5x4 grid (20 cards total)
    const emojis = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍑', '🍍', '🥝', '🥭'];
    
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false; // Prevents clicking more than two cards at once
    let moves = 0;
    let matchedPairs = 0;

    // Function to create and shuffle the board
    function createBoard() {
        // Double the emojis to create pairs and shuffle them
        const shuffledCards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
        
        // Reset the game state
        gameGrid.innerHTML = '';
        moves = 0;
        matchedPairs = 0;
        movesSpan.textContent = `Moves: ${moves}`;
        resetBoard();

        // Create card elements and add to the grid
        shuffledCards.forEach(emoji => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;

            card.innerHTML = `
                <div class="card-face card-front">${emoji}</div>
                <div class="card-face card-back"></div>
            `;

            card.addEventListener('click', flipCard);
            gameGrid.appendChild(card);
        });
    }

    // Function to handle card flipping
    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('is-matched')) {
            return;
        }

        this.classList.add('is-flipped');

        if (!firstCard) {
            firstCard = this; // First card of the pair is clicked
            return;
        }

        secondCard = this; // Second card is clicked
        lockBoard = true;
        updateMoves();

        checkForMatch();
    }

    // Check if the two flipped cards match
    function checkForMatch() {
        const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
        isMatch ? disableCards() : unflipCards();
    }

    // If cards match, make them disappear and unclickable
    function disableCards() {
        firstCard.classList.add('is-matched');
        secondCard.classList.add('is-matched');
        
        matchedPairs++;
        resetBoard();
        
        // Check for win condition
        if (matchedPairs === emojis.length) {
            setTimeout(() => {
                alert(`🎉 You won in ${moves} moves! 🎉`);
            }, 800);
        }
    }

    // If cards don't match, flip them back over
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');
            resetBoard();
        }, 1000); // Wait 1 second before flipping back
    }
    
    // Increment and display the move counter
    function updateMoves() {
        moves++;
        movesSpan.textContent = `Moves: ${moves}`;
    }

    // Reset variables for the next turn
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
    
    // Event listener for the restart button
    restartBtn.addEventListener('click', createBoard);

    // Initial game setup
    createBoard();
});