import React from 'react';
//https://www.geeksforgeeks.org/elo-rating-algorithm/
function EloRating(winner, loser) {

    function Probability(ratingA, ratingB) {
        return 1.0 / (1 + (Math.pow(10, (ratingA - ratingB) / 400)));
    }

    let Pb = Probability(winner, loser);
    let Pa = Probability(loser, winner);

    winner = winner + 20 * (1 - Pa);
    loser = loser + 20 * (0 - Pb);

    return (winner, loser)
}

export default EloRating;
// For K Value the larger the number the more volatility. So probably stick around 20 to start
/*
 float Ra = 1200, Rb = 1000;

        int K = 30;
        boolean d = true;

        EloRating(Ra, Rb, K, d);
 */