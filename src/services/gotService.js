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
    const res = await this.getResource(`/books/`);
    return res.map(this._transformCharacter);
  }

  async getBook(id) {
    const book = await this.getResource(`/books/${id}`);
    return this._transformCharacter(book);
  }
  
  async getAllHouses() {
    const res = await this.getResource(`/houses/`);
    return res.map(this._transformCharacter);
  }

  async getHouse(id) {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformCharacter(house); 
  }

  isSet(data) {
    if (data) {
      return data
    } else {
      return 'NO DATA!!!';
    }
  }

  _exId(item) {
    const idRegExpon = /\/([0-9]*)$/;
    return item.url.match(idRegExpon)[1];
  }

  _transformCharacter = (char) => {
    return {
      id: this._exId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture)
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