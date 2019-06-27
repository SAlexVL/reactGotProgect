import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomPage from '../pages/randomPage';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/booksPage';
import HousePage from '../pages/housePage';
import gotService from '../../services/gotService';

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
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <RandomPage/>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BookPage/>
                    <HousePage/>
                </Container>
            </>
        );
    }

};