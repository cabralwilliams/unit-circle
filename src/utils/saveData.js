export function saveData(results) {
    //Expect results to be { score, maxStreak, correctCount, gameMode, maxScore }
    let storedData = JSON.parse(localStorage.getItem(`unit_circle_${results.gameMode}`)) || null;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    // console.log(months[today.getMonth()]);
    
    // console.log(today.toDateString())
    const dateString = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    if(!storedData) {
        const toSave = { score: { score: results.score, date: dateString }, maxStreak: { maxStreak: results.maxStreak, date: dateString }, correctCount: { correctCount: results.correctCount, date: dateString }, maxScore: { maxScore: results.maxScore, date: dateString } };
        localStorage.setItem(`unit_circle_${results.gameMode}`,JSON.stringify(toSave));
    } else {
        if(results.score > storedData.score.score) {
            storedData.score.score = results.score;
            storedData.score.date = dateString;
        }
        if(results.maxStreak > storedData.maxStreak.maxStreak) {
            storedData.maxStreak.maxStreak = results.maxStreak;
            storedData.maxStreak.date = dateString;
        }
        if(results.correctCount > storedData.correctCount.correctCount) {
            storedData.correctCount.correctCount = results.correctCount;
            storedData.correctCount.date = dateString;
        }
        if(results.maxScore > storedData.maxScore.maxScore) {
            storedData.maxScore.maxScore = results.maxScore;
            storedData.maxScore.date = dateString;
        }
        localStorage.setItem(`unit_circle_${results.gameMode}`,JSON.stringify(storedData));
    }
}

export function getResults(gameMode) {
    return JSON.parse(localStorage.getItem(`unit_circle_${gameMode}`)) || null;
}