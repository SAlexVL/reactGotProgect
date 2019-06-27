import React, {Component} from 'react';
import ItemDetails from '../itemDetails';
import gotService from '../../services/gotService';
import Field from '../field';

export default class BooksItem extends Component {
  gotService = new gotService();

  render() {
    return (
      <ItemDetails
          itemId={this.props.bookId}
          getData={this.gotService.getBook}
          title="Please select a book"
          >
          <Field field="numberOfPages" label="Pages"/>
          <Field field="publisher" label="Publisher"/>
          <Field field="released" label="Released"/>
      </ItemDetails>
    ) 
  }
}