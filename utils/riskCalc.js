function riskCalc(popData, weatherData) {
    const { population, elderly_count, homeless_count, low_income_households } = popData;
    const heatIndex = weatherData.heat_index_F;
  
    const score = (heatIndex / 120 * 40) +
                  (elderly_count / population * 20) +
                  (homeless_count / population * 20) +
                  (low_income_households / population * 20);
  
    return Math.round(score);
  }
  
  module.exports = riskCalc;
  