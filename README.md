# Closure

## 1. Show Title + Objectives - Figjam - *2 mins*
Remind students to let me know if they can't see and also to use the zoom in feature of zoom to also increase the size
Also remind them to either use the chat or to raise hand then they can unmute to speak

### Closure in Practice

Objectives:
- Understand the practical benefits of closures as in real-world applications
- Apply TDD principles to write comprehensive test cases for closure-related functions
- Identify and develop strategies to avoid common mistakes made when working with closures

## 2. Show diagram of closure examples - Figjam - *2 mins*

### Why do we need closure?

A real life example to help understand the _why_ so it's easier to understand the _how_
There are many reasons why we might want to do this but one example is in order to restrict a function that we only want to be invoked a certain number of times. For example: 

- A password reset function - you might want to allow a user to reset their password only a limited number of times within a certain time period, for security reasons. 
- An 'apply discount function' - we dont want a discount to be applied multiple times to the same item 
- Rate limits on requests to an API - you might want to restrict how many times a request will be sent to the server within a certain period of time to avoid exceeding the rate limit

Any questions at all?

## 3. Mistakes and how to resolve them - *6 mins*
Mentioned this section first so that we can refer back to common mistakes when implementing strategies to help avoid them

### Common mistakes students make with closure (3 mins)

- They find it difficult to track which parameters are getting passed in where
- Using the same variable names in both inner and outer functions can lead to confusion. Students might not be aware of how variable shadowing can impact the behavior of closures.
- Misunderstanding the COVE means they expect the wrong return value from specific invocations

### Tips to make closure easier (3 mins)

1. Consecutive brackets is a following invocation on the return value of the previous invocation - show example of this
2. Name the functions and params in the test/in the code with names that denote their meanings - show example of this e.g dont just call it outer func and inner func, but name them according to what they are actually doing
3. Pseudo code to break down the solution's logic step-by-step and then it's easier to translate this into code
4. Practice, practice, practice! The more you attempt it, the more your understanding will grow

## 4. Move to VS code - *10 mins*

Set the instructions for the task
Pseudo-code:

```
// should return a function
// function should invoke the callbackfn
// have a counter and increase it every time the function is invoked
// as the counter value needs to persist every time the function is invoked, but shouldn't be reset when the function is invoked, we need it to exist in the 'COVE'
// increase the counter every invocation
// after it is called maxCalls times, then don't invoke it again
// instead return a message
```

Then go through code example - build function with TDD to show how it works, ask questions after each test

closure.js

```
function restrictThisFunction(funcToRestrict, maxCalls) {
    let callCounter = 0;

  function restricter() {
    if (callCounter < maxCalls) {
      funcToRestrict();
    } else {
      return "Maximum calls reached."
    }
    callCounter++;
  }

  return restricter;
}

module.exports = restrictThisFunction
```

closure.test.js

```
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

    // bonus test, ask why this might be an important test - need to know htat its our function that's restricting it, adn therefore that it works, rather than this already being a restricted function
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

```


## Post-seminar potential follow up questions: - 10 mins

1. Why did you start testing from here?

- Wanted to show the build up of the function using TDD and my methodology for coming up with a solution that involves closure (by pseudo coding my way through it), so this seemed like the logical, simplest place to start. Tried to cover all aspects of the happy path of this function.

2. What additional tests could you have done here?

- Sad path tests: e.g. what happens when you dont pass in the second parameter
- A more complicated callbackfn being passed in such as one that takes one or more arguments
- Function that returns a function which returns a function - more nesting

3. If I had more time:
- Would have written the tests as I went along
- Would have psuedo coded as I went along


## Motivations to become a seminar lead:
- Teaching is still a passion - this is the better environment I am looking for to teach in. It's about something that I am passionate about and I enjoy and the SL role gives me more opportunity to do this. It would also enable me to move away from tutoring 
- I want to be more involved in the NC community, giving input into the curriculum and the organisation and delivery of the content
- Develop leadership skills - ready for my next challenge; it's the part of my role in teaching that I really enjoyed and thrived in, hence my accelerated movement through the ranks to MAC and acting deputy head of sixth form

## Ideas for the seminar community
- Bring back weekly/daily round downs - can be a chat amongst the group - imposter syndrome, best tips, what they've learnt, how to get down time, or could play games - really gives the community feel in the seminar group and takes the loneliness of being in this journey away, was the most enjoyable part of the bootcamp for me.
- Holding inter-seminar coding or just fun competitions, to boost morale and bring in more opportunities for communication between different seminar groups as well as seminar staff
- Start a #kudos-style thing for the cohort to really highlight some good work - doesn't have to be the best code we've seen but also who we've seen help others or who's solved something in the most interesting way etc; staff and students can give kudos to the students
- Have mini seminar sessions when we can see a commmon theme of struggle amongst the students on a particular area or sprint
E.g. I did the same mini promises seminar/lecture about 5 different times with individuals and pairs - this would be a good opportunity to handle this all together and reduce the amount of time spent re-explaining things students struggle with. Could put out a vote once a week and see which ones  most people need help understanding. This could also provide a good opportunity for mentors to deliver content in smaller groups, more advanced than drop ins but also a safer environment than a whole seminar.

These will hopefully bring the seminar team closer together and also help to improve pairing experiences by showing them that they are all in the same boat as well as help to develop our mentors and ready them for the SL role if that's what they'd like to do.

## Questions from me
