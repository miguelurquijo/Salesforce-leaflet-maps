import { LightningElement } from 'lwc';

export default class Map extends LightningElement {
    greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}