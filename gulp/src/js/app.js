class Person {
	constructor(name){
		this.name = name;
	}
	hello(){
		if(typeof this.name === 'string') return `Hello from ${this.name}!`;
		else return `Hello!`
	}
}
let person = new Person('Simon Smith');
document.write(person.hello());
console.log('Add comment ot console for debugging');