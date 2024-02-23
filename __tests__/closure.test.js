const restrictThisFunction = require("../closure");

describe('restrictThisFunc()', () => {
    test('should return a function on first invocation', () => {
        expect(typeof restrictThisFunction()).toBe('function')
    });
    
    test('should return a function that can be invoked a specified number of times', () => {
        const mockFn = jest.fn()
        const restrictedToThreeCalls = restrictThisFunction(mockFn, 3)
        
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        
        expect(mockFn).toHaveBeenCalledTimes(3)
    })
    
    test('should return a function that cannot be invoked more than a specified number of times', () => {
        const mockFn = jest.fn()
        const restrictedToThreeCalls = restrictThisFunction(mockFn, 3)
        
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        
        expect(mockFn).toHaveBeenCalledTimes(3)
    })
    
    test('should return a function that returns a string when invoked more than the specifed number of times', () => {
        const mockFn = jest.fn()
        const restrictedToThreeCalls = restrictThisFunction(mockFn, 3)
        
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        restrictedToThreeCalls()
        
        expect(restrictedToThreeCalls()).toBe( "Maximum calls reached.")
        
    });
    
    test("mockfn shouldn't already be restricted before being passed through restrictThisFunc()", () => {
        const mockFn1 = jest.fn()
        
        mockFn1()
        mockFn1()
        mockFn1()
        mockFn1()
        mockFn1()
        expect(mockFn1).toHaveBeenCalledTimes(5)
        
        const mockFn2 = jest.fn()
        const restrictedMockFn = restrictThisFunction(mockFn2, 3)
        
        restrictedMockFn()
        restrictedMockFn()
        restrictedMockFn()
        restrictedMockFn()
        restrictedMockFn()
        expect(mockFn2).toHaveBeenCalledTimes(3)
        

    });
});
