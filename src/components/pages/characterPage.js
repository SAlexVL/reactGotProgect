import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import Field from '../field';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

  gotService = new gotService();

  state = {
    selectedChar: null,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
        selectedChar: id
    })
  }

  componentDidCatch() {
    this.setState({
        error: true
    })
  }

  render() {
    if(this.state.error) {
      return <ErrorMessage/>
    }

    const itemList = (
      <ItemList
        onItemSelected={(id) => this.onItemSelected(id)}
        getData={this.gotService.getAllCharacters} 
        renderItem={({name, gender}) => `${name} (${gender})`}
      />
    )

    const itemDetails = (
      <ItemDetails 
        itemId={this.state.selectedChar}
        getData={this.gotService.getCharacter}
        title="Please select a character"
      >
        <Field field='gender' label='Gender'/>
        <Field field='born' label='Born'/>
        <Field field='died' label='Died'/>
        <Field field='culture' label='Culture'/>
      </ItemDetails>
    )

    return(
      <RowBlock left={itemList} right={itemDetails} />
    )
  }
}