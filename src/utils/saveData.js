export function saveData(results) {
    //Expect results to be { score, maxStreak, correctCount, gameMode, maxScore }
    let storedData = JSON.parse(localStorage.getItem(`unit_circle_${results.gameMode}`)) || null;
    if(!storedData) {
        const toSave = { score: results.score, maxStreak: results.maxStreak, correctCount: results.correctCount, maxScore: results.maxScore };
        localStorage.setItem(`unit_circle_${results.gameMode}`,JSON.stringify(toSave));
    } else {
        if(results.score > storedData.score) {
            storedData.score = results.score;
        }
        if(results.maxStreak > storedData.maxStreak) {
            storedData.maxStreak = results.maxStreak;
        }
        if(results.correctCount > storedData.correctCount) {
            storedData.correctCount = results.correctCount;
        }
        if(results.maxScore > storedData.maxScore) {
            storedData.maxScore = results.maxScore;
        }
        localStorage.setItem(`unit_circle_${results.gameMode}`,JSON.stringify(storedData));
    }
}

export function getResults(gameMode) {
    return JSON.parse(localStorage.getItem(`unit_circle_${gameMode}`)) || null;
}