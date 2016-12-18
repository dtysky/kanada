/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description:
 */

import {test} from '../src/test';

describe('test', () => {
    it('should say "Hello world!"', () => {
        const user = {firstName: 'Dai', lastName: 'Tianyu'};
        console.log(test(user));
        expect(test(user)).toEqual('Hello, Dai Tianyu');
    });
});
