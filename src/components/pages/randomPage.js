import React, {Component} from 'react';
import RandomItem from "../randomItem";
import Field from "../field";
import gotService from '../../services/gotService';
import {Button} from 'reactstrap';

export default class RandomPage extends Component {

  gotService = new gotService();

  state = {
    showRandom: true
  }

  hiddenRandom = () => {
    this.setState(({showRandom}) => {
      return {
        showRandom: !showRandom
      }
    })
  }

  render() {
    const {showRandom} = this.state;

    const randomItem = showRandom ? (
      <RandomItem
        getData={this.gotService.getCharacter}
        title="Character">
        <Field field="gender" label="Gender"/>
        <Field field="born" label="Born"/>
        <Field field="died" label="Died"/>
        <Field field="culture" label="Culture"/>
      </RandomItem>
    ) : null;

    return (
      <>
        {randomItem}
        <Button 
            color="primary" 
            size="lg"
            onClick={this.hiddenRandom}
            >Toggle block
        </Button>
      </>
    );
  }

} 