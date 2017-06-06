'use strict';

function hello() {
	console.log('Hello!!!');
}

hello();


class Person {
	constructor(name){
		this.name = name;
	}

	hello(){
		return `Hello ${this.name}`
	}
}

let person = new Person('Mike!');
document.write(person.hello());