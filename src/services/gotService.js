export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + 
        `, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllCharacters() {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  }

  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  async getAllBooks() {
    const books = await this.getResource(`/books/`);
    return books.map(this._transformCharacter);
  }

  async getBook(id) {
    const book = await this.getResource(`/books/${id}`);
    return this._transformCharacter(book);
  }
  
  async getAllHouses() {
    const houses = await this.getResource(`/houses/`);
    return houses.map(this._transformCharacter);
  }

  async getHouse(id) {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformCharacter(house); 
  }

  _transformCharacter(char) {

    const nm = char.name === '' ? char.name = 'NO DATA!!!' : char.name;      
      
    const gnd = char.gender === '' ? char.gender = 'NO DATA!!!' : char.gender; 

    const brn = char.born === '' ? char.born = 'NO DATA!!!' : char.born;  

    const dd = char.died === '' ? char.died = 'NO DATA!!!' : char.died;
        
    const cult = char.culture === '' ? char.culture = 'NO DATA!!!' : char.culture;        

    return {
      name: nm,
      gender: gnd,
      born: brn,
      died: dd,
      culture: cult      
    }
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    }
  }

}