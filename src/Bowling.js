function Bowling() {
  this.total = 0;
}

Bowling.prototype.basicScoreCalculation = function(array) {
  let simpleScore = 0;
  array.map( function(frame) {
    frame.forEach( function(roll) {
      simpleScore += roll
    })
  })
  this.total += simpleScore
}

Bowling.prototype.extraScoreCalculation = function(array) {
  var extraPoints = 0
  array.map( function(frame, index) {
    if (frame.length == 2 && frame[0] + frame[1] == 10) {
      var rollPlusOne = array[index + 1][0]
      extraPoints += rollPlusOne
    } else if (frame.length == 1) {
      let rollPlusOne = array[index + 1][0]

      if (array[index + 1].length == 1) {
        var rollPlusTwo = array[index + 2][0]
      } else {
        var rollPlusTwo = array[index + 1][1]
      }

      extraPoints += rollPlusOne
      extraPoints += rollPlusTwo
    }
  })
  this.total += extraPoints
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
