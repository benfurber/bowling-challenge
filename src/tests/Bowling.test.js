import Bowling from '../Bowling';

const incompleteScore = [[1, 2], [7, 1], [2, 2], [2, 3], [1, 0]];

const simpleLowScore = [[1, 2], [5, 2], [0, 4], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
const simpleLowScoreTotal = 46

const singleSpareScore = [[1, 9], [5, 2], [0, 4], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
const singleSpareScoreTotal = 58

describe("finalScore function", () => {
  let bowling;

  beforeEach(() => {
    bowling = new Bowling;
  });

  test("Throws an error if the finalScore array doesn't have a length of 10", () => {
    expect(function() {
      bowling.finalScore(incompleteScore)
    }).toThrowError("Incomplete score provided")
  })

  test('Adds up a simple low score', () => {
    expect(bowling.finalScore(simpleLowScore)).toBe(simpleLowScoreTotal)
  });

  test('Adds the points for a single spare to the score correctly', () => {
    expect(bowling.finalScore(singleSpareScore)).toBe(singleSpareScoreTotal)
  })

});
