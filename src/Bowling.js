function Bowling() {
  this._scoreCard = [];
  this.total = 0;
};

Bowling.prototype._basicScoreCalculation = function(array) {
  array.map( (frame) => {
    frame.map( (roll) => {
      this.total += roll
    })
  })
};

Bowling.prototype._extraScoreCalculation = function(array) {
  var extraPoints = 0

  array.map( (frame, index) => {
    // Calculate what the next roll is
    var rollPlusOne = () => {
      return array[index + 1][0];
    }

    // Calculate what the next roll after that is
    var rollPlusTwo = () => {
      if (array[index + 1].length == 1) {
        return array[index + 2][0]
      } else {
        return array[index + 1][1]
      }
    }

    // For a spare, add the next roll
    if (frame[0] + frame[1] == 10) {
      extraPoints += rollPlusOne()
    }

    // For a strike, add the next two rolls
    if (frame.length == 1) {
      extraPoints += rollPlusOne()
      extraPoints += rollPlusTwo()
    }
  })
  
  this.total += extraPoints
};

Bowling.prototype.finalScore = function() {
  var array = this._scoreCard;

  if (array.length != 10) {
    throw new Error("Incomplete score provided")
  };

  this._basicScoreCalculation(array);
  this._extraScoreCalculation(array);

  return this.total;
};

module.exports = Bowling;
