/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: entry.
 */

interface IPerson {
    firstName: string;
    lastName: string;
}

function greeter(person: IPerson) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

var user = { firstName: 'Jane', lastName: 'User' };

console.log(greeter(user));
