import { isBrowser } from 'src/utils/env';

describe('Browser Env Test', () => {
    it('Under browser env', () => {
        expect(isBrowser()).toBe(true);
    });
});