// バックエンド用のプログラム（例：Node.js + Express）
const express = require('express');
const app = express();
app.use(express.json()); // JSONデータを扱えるようにする

// うるう年判定（サーバーに隠されたロジック）
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// スマホからデータが送られてきたときの計算処理
app.post('/api/calculate', (req, res) => {
    const { budget, daysInMonth, mealsPerDay } = req.body;
    
    let leap = 0;
    const currentYear = new Date().getFullYear();

    if (daysInMonth === 28 && isLeapYear(currentYear)) {
        leap = 1;
    }

    const finalDays = daysInMonth + leap;
    const totalMeals = finalDays * mealsPerDay;
    const perMealBudget = Math.floor(budget / totalMeals);
    const dailyTotalBudget = perMealBudget * mealsPerDay;

    // 計算結果「だけ」をスマホに返却する（計算式はバレない）
    res.json({
        perMealBudget: perMealBudget,
        dailyTotalBudget: dailyTotalBudget
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
