import Bowling from '../Bowling';

const incompleteScore = [[1, 2], [7, 1], [2, 2], [2, 3], [1, 0]];

const simpleLowScore = [[1, 2], [5, 2], [0, 4], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
const simpleLowScoreTotal = 46

const singleSpareScore = [[1, 9], [5, 2], [0, 4], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
const singleSpareScoreTotal = 58

const lotsOfSparesScore = [[1, 9], [5, 2], [0, 10], [1, 2], [5, 5], [0, 4], [9, 1], [2, 2], [2, 3], [1, 0]]
const lotsOfSparesScoreTotal = 72

const singleStrikeScore = [[1, 2], [5, 2], [10], [1, 2], [5, 2], [0, 4], [7, 1], [2, 2], [2, 3], [1, 0]]
const singleStrikeScoreTotal = 55

const lotsOfStrikesScore = [[10], [5, 3], [10], [10], [10], [6, 2], [7, 1], [10], [7, 1], [8, 1]]
const lotsOfStrikesScoreTotal = 151

const perfectGameScore = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]]
const perfectGameScoreTotal = 300

const nearPerfectGameScore = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 9, 1]]
const nearPerfectGameScoreTotal = 289

describe("finalScore function", () => {
  let bowling;

  beforeEach(() => {
    bowling = new Bowling;
  });

  test("Throws an error if the finalScore array doesn't have a length of 10", () => {
    expect(function() {
      bowling.finalScore(incompleteScore)
    }).toThrowError("Incomplete score provided")
  });

  test('Adds up a simple low score', () => {
    expect(bowling.finalScore(simpleLowScore)).toBe(simpleLowScoreTotal)
  });

  test('Adds the points for a single spare', () => {
    expect(bowling.finalScore(singleSpareScore)).toBe(singleSpareScoreTotal)
  });

  test('Adds the points for lots of spares', () => {
    expect(bowling.finalScore(lotsOfSparesScore)).toBe(lotsOfSparesScoreTotal)
  });

  test('Add the points for a single strike', () => {
    expect(bowling.finalScore(singleStrikeScore)).toBe(singleStrikeScoreTotal)
  });

  test('Adds the points for lots of strikes', () => {
    expect(bowling.finalScore(lotsOfStrikesScore)).toBe(lotsOfStrikesScoreTotal)
  });

  test('Add all the points for a perfect game', () => {
    expect(bowling.finalScore(perfectGameScore)).toBe(perfectGameScoreTotal)
  })

  test('Add all the points for a near perfect game', () => {
    expect(bowling.finalScore(nearPerfectGameScore)).toBe(nearPerfectGameScoreTotal)
  })
});
