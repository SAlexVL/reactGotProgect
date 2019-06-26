import React, {Component} from 'react';
import {Col, Row, Button, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/booksPage';
import HousePage from '../pages/housePage';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import gotService from '../../services/gotService';

import './app.css';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRadomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

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
                            {char}
                            <Button 
                                color="primary" 
                                size="lg"
                                onClick={this.toggleRadomChar}
                            >Toggle block
                            </Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    {/* <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={(id) => this.onItemSelected(id)}
                            getData={this.gotService.getAllBooks} 
                            renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <ItemDetails itemId={this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                    <BookPage/>
                    {/* <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={(id) => this.onItemSelected(id)} 
                            getData={this.gotService.getAllHouses}
                            renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <ItemDetails itemId={this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                    <HousePage/>
                </Container>
            </>
        );
    }

};