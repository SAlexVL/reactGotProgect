import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import Field from '../field';

export default class BookPage extends Component {

  gotService = new gotService();

  state = {
    selectedBook: null,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedBook: id
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
        getData={this.gotService.getAllBooks}
        renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}/>
    );

    const bookDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getData={this.gotService.getBook}
        >
        <Field field="numberOfPages" label="Pages"/>
        <Field field="publisher" label="Publisher"/>
        <Field field="released" label="Released"/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={bookDetails}/>
    );
  }
} 