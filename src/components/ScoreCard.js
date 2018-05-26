import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class ScoreCard extends Component {
  render() {

    const scoreHeaders = [];

    for (var i = 1; i < 11; i++) {
      scoreHeaders.push(
        <Table.HeaderCell colSpan={i.toString().length + 1}>{i}</Table.HeaderCell>
      )
    };

    return (
      <div>

      <Table celled color='red'>
        <Table.Header>
          <Table.Row textAlign='center'>{scoreHeaders}</Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>{theRolls}</Table.Row>
          <Table.Row>
            <Table.Cell colSpan='2' id='score-1'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-2'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-3'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-4'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-5'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-6'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-7'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-8'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-9'><strong></strong></Table.Cell>
            <Table.Cell colSpan='3' id='score-10'><strong></strong></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      </div>
    );
  }
}

export default ScoreCard;
