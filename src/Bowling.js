function Bowling() {
  this.total = 0;
}

Bowling.prototype.basicScoreCalculation = function(array) {
  let simpleScore = 0
  array.forEach( function(frame) {
    frame.forEach( function(roll) {
      simpleScore = simpleScore + roll
    })
  })
  this.total = this.total + simpleScore
}

Bowling.prototype.extraScoreCalculation = function(array) {
  var extraPoints = 0
  array.forEach( function(frame) {
    if (frame.length == 2) {
      if (frame[0] + frame[1] == 10) {
        extraPoints = extraPoints + array[+1][0]
      }
    }
  })
  this.total = this.total + extraPoints
}

Bowling.prototype.finalScore = function(array) {
  if (array.length != 10) {
    throw new Error("Incomplete score provided")
  };

  this.basicScoreCalculation(array);
  this.extraScoreCalculation(array);

  return this.total;
};

module.exports = Bowling;
