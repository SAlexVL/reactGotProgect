import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomPage from '../pages/randomPage';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/booksPage';
import HousePage from '../pages/housePage';
import BooksItem from '../pages/booksItem';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

export default class App extends Component {

    gotService = new gotService();

    state = {
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <RandomPage/>
                            </Col>
                        </Row>
                                <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                                <Route path='/characters' component={CharacterPage}/>
                                <Route path='/houses' component={HousePage}/>
                                <Route path='/books' exact component={BookPage}/>
                                <Route path='/books/:id' render={
                                    ({match}) => {
                                        const {id} = match.params;

                                    return <BooksItem bookId={id}/>}
                                }/>
                    </Container>
                </div>                 
            </Router>
        );
    }

};