import { extend } from '../src/index';
import * as _ from 'lodash';

describe('extend', () => {
    it('will copy  props of the src object to the dest object', () => {
        interface targetObject {
            p0: string;
        }
        
        const t: targetObject = {
            p0: 'foo'
        };
        
        interface sourceObject {
            p1: number;
            p2: string;
            p3: boolean;
        };
        
        const s: sourceObject = {
            p1: 1,
            p2: 'string',
            p3: true,
        };
        
        type resultType = {
            p0: string;
            p1: number;
            p2: string;
            p3: boolean;
        }

        const result: resultType = extend(t, s);
        expect(result).toMatchObject({
            p0: 'foo',
            p1: 1,
            p2: 'string',
            p3: true,
        });
    });

    it('will copy props of src objects to dest object with saved order', () => {
        interface targetObject {
            p0: string;
        }
        
        const t: targetObject = {
            p0: 'foo'
        };
        
        interface sourceObject1 {
            p1: number;
            p2: string;
            p3: boolean;
        };
        
        const s1: sourceObject1 = {
            p1: 1,
            p2: 'string',
            p3: true,
        };
        
        interface sourceObject2 {
            p3: number;
        };
        
        const s2: sourceObject2 = {
            p3: 1,
        };

        type resultType = {
            p0: string;
            p1: number;
            p2: string;
            p3: number;
        }

        const result: resultType = extend(t, s1, s2);
        expect(result).toMatchObject({
            p0: 'foo',
            p1: 1,
            p2: 'string',
            p3: 1,
        });
    });

    it('will copy references when deep param is false', () => {
        const t = {
            p0: 'foo'
        };
        
        const s = {
            p3: {foo: 1},
        };

        type resultType = {
            p0: string;
            p3: {foo: number};
        }

        const result: resultType = extend(false, t, s);
        expect(result).toEqual({
            p0: 'foo',
            p3: {foo: 1},
        });
        expect(result.p3).toBe(s.p3);
    });

    it('will copy objects when deep param is true', () => {
        const t = {
            p0: 'foo'
        };
        
        const s = {
            p3: {foo: 1},
        };

        type resultType = {
            p0: string;
            p3: {foo: number};
        }

        const result: resultType = extend(true, t, s);
        expect(result).toEqual({
            p0: 'foo',
            p3: {foo: 1},
        });
        expect(result.p3).not.toBe(s.p3);
    });

    it('will returns itself', () => {
        const t = {
            p0: 'foo'
        };
        

        type resultType = {
            p0: string;
        }

        const result: resultType = extend(t);
        expect(result).toEqual({
            p0: 'foo',
        });
    });

    it('will copy the array', () => {
        const t = {
            p0: 'foo'
        };

        const s = {
            p1: [1, 2, 3]
        };
        

        type resultType = {
            p0: string;
            p1: number[];
        }

        const result: resultType = extend(t, s);
        expect(result).toEqual({
            p0: 'foo',
            p1: [1, 2, 3]
        });
    });

    it('will copy the array when deep is true', () => {
        const t = {
            p0: 'foo'
        };

        const s = {
            p1: [1, 2, 3]
        };
        

        type resultType = {
            p0: string;
            p1: number[];
        }

        const result: resultType = extend(true, t, s);
        expect(result).toEqual({
            p0: 'foo',
            p1: [1, 2, 3]
        });

        expect(result.p1).not.toBe(s.p1);
    });
});
