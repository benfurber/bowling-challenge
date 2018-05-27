import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class ScoreCard extends Component {
  render() {

    const theRolls = this.props.theRolls.map((frame) => {
      return frame.map((roll, index) => {
        let key = 'roll-' + frame.id + '-' + (index + 1)
        return <Table.Cell colSpan='1' key={key} id={key}>{roll}</Table.Cell>
      })
    });

    const theScores = this.props.theScores.map((score, index) => {
      let key = 'score-' + (index + 1)
      return <Table.Cell colSpan='2' key={key} id={key}><strong>{score}</strong></Table.Cell>
    });

    const scoreHeaders = [];
    for (var i = 1; i < 11; i++) {
      let key = 'scoreHeader-' + i
      scoreHeaders.push(
        <Table.HeaderCell colSpan={i.toString().length + 1} key={key} id={key}>{i}</Table.HeaderCell>
      )
    };

    return (
      <div>

      <Table celled unstackable color='red'>
        <Table.Header>
          <Table.Row textAlign='center'>{scoreHeaders}</Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>{theRolls}</Table.Row>
          <Table.Row>{theScores}</Table.Row>
        </Table.Body>
      </Table>
      </div>
    );
  }
}

export default ScoreCard;
