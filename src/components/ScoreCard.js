import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

// bowling._scoreCard.map( function(array, arrayindex) {
//   array.map( function(item, index) {
//     let cellid = `roll-${arrayindex + 1}-${index + 1}`)
//     getElementById(cellid).text(item)
//   })
// })

class ScoreCard extends Component {
  render() {
    console.log(this.props);

    const theRolls = this.props.rolls.map((number, i) =>
      <Table.Cell colSpan='2' id='roll-{i}'>{number[0]} | {number[1]}</Table.Cell>
    );
    return (
      <div>

      <Table celled color='red'>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell colSpan='2'>1</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>2</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>3</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>4</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>5</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>6</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>7</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>8</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>9</Table.HeaderCell>
            <Table.HeaderCell colSpan='3'>10</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan='1' id='roll-1-1'>{this.props.rolls[0][0]}</Table.Cell>
            <Table.Cell colSpan='1' id='roll-1-2'>{this.props.rolls[0][1]}</Table.Cell>
            <Table.Cell colSpan='1' id='roll-2-1'>{this.props.rolls[1][0]}</Table.Cell>
            <Table.Cell colSpan='1' id='roll-2-2'>{this.props.rolls[1][1]}</Table.Cell>
            <Table.Cell colSpan='1' id='roll-3-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-3-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-4-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-4-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-5-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-5-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-6-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-6-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-7-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-7-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-8-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-8-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-9-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-9-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-10-1'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-10-2'></Table.Cell>
            <Table.Cell colSpan='1' id='roll-10-3'></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan='2' id='score-1'><strong></strong></Table.Cell>
            <Table.Cell colSpan='2' id='score-2'> </Table.Cell>
            <Table.Cell colSpan='2' id='score-3'> </Table.Cell>
            <Table.Cell colSpan='2' id='score-4'> </Table.Cell>
            <Table.Cell colSpan='2' id='score-5'> </Table.Cell>
            <Table.Cell colSpan='2' id='score-6'> </Table.Cell>
            <Table.Cell colSpan='2' id='score-7'> </Table.Cell>
            <Table.Cell colSpan='2' id='score-8'> </Table.Cell>
            <Table.Cell colSpan='2' id='score-9'> </Table.Cell>
            <Table.Cell colSpan='3' id='score-10'> </Table.Cell>
          </Table.Row>
          <Table.Row>{theRolls}</Table.Row>

        </Table.Body>
      </Table>
      </div>
    );
  }
}

export default ScoreCard;
