/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: entry.
 */

interface IPerson {
    firstName: string;
    lastName: string;
}

export function test(person: IPerson) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
