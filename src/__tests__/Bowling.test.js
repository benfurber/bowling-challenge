import Bowling from '../Bowling';

let bowling;

beforeEach(() => {
  bowling = new Bowling;
});

describe('Adding a roll', () => {
  test('Adds roll for frame one, roll one to the scoreCard', () => {
    var theRoll = 4;

    bowling.addRoll(theRoll);

    expect(bowling._scoreCard).toContainEqual([theRoll])
  });

  test('Adds two rolls to the first frame', () => {
    var rollOne = 4;
    var rollTwo = 5;

    bowling.addRoll(rollOne);
    bowling.addRoll(rollTwo);

    expect(bowling._scoreCard).toContainEqual([rollOne, rollTwo])
  });

  test('Adds two rolls to the first frame, then one to the second', () => {
    var rollOne = 4;
    var rollTwo = 5;
    var rollThree = 1;

    bowling.addRoll(rollOne);
    bowling.addRoll(rollTwo);
    bowling.addRoll(rollThree);

    expect(bowling._scoreCard).toContainEqual([rollOne, rollTwo], [rollThree])
  });

  test('Adds a strike to the first frame, than a second roll to the second frame', () => {
    var rollOne = 10;
    var rollTwo = 8;

    bowling.addRoll(rollOne);
    bowling.addRoll(rollTwo);

    expect(bowling._scoreCard).toContainEqual([rollOne], [rollTwo])
  });

  test('Adds second strike correctly to final frame', () => {
    bowling._scoreCard = [[10], [7, 3], [2, 7], [10], [9, 1], [9, 0], [1, 9], [10], [10], [10]];
    bowling._progress = { 'frame': 9, 'roll': 1 }
    var rollOne = 10;

    bowling.addRoll(rollOne);

    expect(bowling._scoreCard).toContainEqual([10, rollOne])
  });

  test('Adds third strike correctly to final frame', () => {
    bowling._scoreCard = [[10], [7, 3], [2, 7], [10], [9, 1], [9, 0], [1, 9], [10], [10], [10, 10]];
    bowling._progress = { 'frame': 9, 'roll': 2 }
    var rollOne = 10;

    bowling.addRoll(rollOne);

    expect(bowling._scoreCard).toContainEqual([10, 10, rollOne])
  })
});

describe('Calculating the final score', () => {

  test("Throws an error if the finalScore array doesn't have a length of 10", () => {
    const incompleteScore = [[1, 2], [7, 1], [2, 2], [2, 3], [1, 0]];
    bowling._scoreCard = incompleteScore

    expect(function() {
      bowling.finalScore()
    }).toThrowError("Incomplete score provided")
  });

  test('Adds up a simple low score', () => {
    const simpleLowScore = [[1, 2], [5, 2], [0, 4], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
    const simpleLowScoreTotal = 46
    bowling._scoreCard = simpleLowScore

    expect(bowling.finalScore()).toBe(simpleLowScoreTotal)
  });

  test('Adds the points for a single spare', () => {
    const singleSpareScore = [[1, 9], [5, 2], [0, 4], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
    const singleSpareScoreTotal = 58
    bowling._scoreCard = singleSpareScore

    expect(bowling.finalScore()).toBe(singleSpareScoreTotal)
  });

  test('Adds the points for lots of spares', () => {
    const lotsOfSparesScore = [[1, 9], [5, 2], [0, 10], [1, 2], [5, 5], [0, 4], [9, 1], [2, 2], [2, 3], [1, 0]]
    const lotsOfSparesScoreTotal = 72
    bowling._scoreCard = lotsOfSparesScore

    expect(bowling.finalScore()).toBe(lotsOfSparesScoreTotal)
  });

  test('Add the points for a single strike', () => {
    const singleStrikeScore = [[1, 2], [5, 2], [10], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
    const singleStrikeScoreTotal = 55
    bowling._scoreCard = singleStrikeScore

    expect(bowling.finalScore()).toBe(singleStrikeScoreTotal)
  });

  test('Adds the points for lots of strikes', () => {
    const lotsOfStrikesScore = [[10], [5, 3], [10], [10], [10], [6, 2], [7, 1], [10], [7, 1], [8, 1]]
    const lotsOfStrikesScoreTotal = 151
    bowling._scoreCard = lotsOfStrikesScore

    expect(bowling.finalScore()).toBe(lotsOfStrikesScoreTotal)
  });

  test('Add all the points for a perfect game', () => {
    const perfectGameScore = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]]
    const perfectGameScoreTotal = 300
    bowling._scoreCard = perfectGameScore;

    expect(bowling.finalScore()).toBe(perfectGameScoreTotal)
  })

  test('Add all the points for a near perfect game', () => {
    const nearPerfectGameScore = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 9, 1]]
    const nearPerfectGameScoreTotal = 289
    bowling._scoreCard = nearPerfectGameScore;

    expect(bowling.finalScore()).toBe(nearPerfectGameScoreTotal)
  })
});
