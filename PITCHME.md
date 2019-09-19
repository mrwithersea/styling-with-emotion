# Styling with _Emotion_

[Logo](assets/image/logo.png)

---

> “duplication is far cheaper than the wrong abstraction”
>
> -- <cite>Sandi Metz</cite>

## Why did we choose Redux?

- Abstraction of our state from our UI |
- Predictable behaviour |
- Immutability |
- Functional purity |

Note:
- Pushing state to the edges of our system
- Why not MV[?] - view updates model, which updates another model, which updates a view
- State is not changing unintentionally
- Pure functions - better reasoning about code, avoiding non-obvious dependencies

---

## Redux is not a black box

A gist from Redux creator Dan Abramov

---?gist=gaearon/64e2c4adce2b4918c96c3db2b44d8f68&lang=javascript&title=Counter.js

@[22,26](Actions)
@[3-12](Reducer)

---

# Actions

---

## The heart of redux

```javascript
// Every action is just a plain old javascript object
{ type: 'something happened', value: 123456 }
```

---

### Start with the simplest thing that could possibly work

---?code=sample/actions/simplest-thing/component.js&lang=python

@[6-8](Directly reference dispatch from your onClick handler)
@[20](Connect your component to make dispatch available on props)

---

### To avoid action type errors in our reducer code we could export a const

---?code=sample/actions/consts/component.js&lang=javascript

@[4,8-10]

---

### To share actions between components we could use an action creator

---?code=sample/actions/action-creators/actions.js&lang=javascript&title=actions.js

---?code=sample/actions/action-creators/component.js&lang=python&title=component.js

---

## What do Action Creators give us?

- Abstraction |
- Encapsulation |
- Separation of Concerns |
- Testability |

Note:
- components don’t need to know about the low-level details of the action
- all the details of an action are expressed in one place
- components remain dumb and are unaware of the framework in place to handle state
- the component can be tested with a mock, the action creator can be tested with simple i/o tests

---

## Next steps? Flux Standard Actions

```

// Basic flux standard action
{
  type: SIMPLE_ACTION,
  payload: {
    value: 123456,
  }
}

// Error action
{
  type: SIMPLE_ACTION,
  payload: new Error('Error in simple action'),
  error: true,
}

```
---

# Reducers

---

### Start with the simplest thing that could possibly work

---?code=sample/reducers/simplest-thing/reducer.js&lang=javascript

---

### Simple doesn't stay simple for long

---

```
switch (action.type) {
	case 'VERIFY_USER_REQUEST': {
		return { ...state, isLoading: true };
	}
	case 'CLEAR_ERRORS': {
		return { ...state, error: null };
	}
	case 'ACTIVATE_USER_REQUEST': {
		return { ...state, isLoading: true };
	}
	case 'ACTIVATION_CODE_IN_URL': {
		return { ...state, code: action.code };
	}
	case 'ACTIVATION_FIELD_CHANGE': {
		return { ...state, [action.fieldName]: action.fieldValue };
	}
	case 'VERIFY_USER_SUCCESS': {
		const { code, email_address, first_name, date_of_birth } = action.result;
		return {
			...state,
			isLoading: false,
			code,
			email: email_address,
			name: first_name,
			dateOfBirth: date_of_birth,
			isVerified: true,
			error: null,
		};
	}
	case 'RESET_ACTIVATION_FORM': {
		return {
			...state,
			isLoading: false,
			code: '',
			email: '',
			name: '',
			dateOfBirth: '',
			dob: {
				day: '',
				month: '',
				year: '',
			},
			isVerified: false,
			error: null,
		};
	}
	case 'VERIFY_USER_FAILURE': {
		return {
			...state,
			isLoading: false,
			error: findErrorMappingEntry(action),
		};
	}
	case 'ACTIVATE_USER_FAILURE': {
		return { ...state, isLoading: false, error: findErrorMappingEntry(action) };
	}
	default:
		return state;
}
```

@[18-28]

---

### Simplify action lookup with object mapping

---?code=sample/reducers/object-mapping/reducer.js&lang=javascript

@[3-6](Each reducer is self-contained a testable)

---

## Next steps? redux-create-reducer

```javascript

import { createReducer } from 'redux-create-reducer';

function simpleActionReducer = createReducer(state, {
  [SIMPLE_ACTION]: simpleAction,
  [ANOTHER_ACTION]: anotherAction
});

```
---

# Async Actions

---

### Start with the simplest thing that could possibly work

---?code=sample/async/simplest-thing/actions.js&lang=javascript&title=actions.js

@[8](We have to pass dispatch to the action creator to dispatch actions to the store)

---?code=sample/async/simplest-thing/component.js&lang=python&title=component.js

@[21-25](We've added awareness of the low-level details of the action and broken the contract)
@[27](We can't use object literal shorthand in our connect statement)

---

### Enter Thunks

---?code=sample/async/thunks/actions.js&lang=javascript&title=actions.js

@[8](Notice the order of our curried function has changed due to the thunk middleware)

---?code=sample/async/thunks/component.js&lang=javascript&title=component.js

@[27](We've gained back the object literal shorthand in our connect statement)

---

### Why not thunks?

- We've added side effects to our action creators |
- In complex scenarios thunks become inter-dependent |
- Testing is hard to do |

---

```javascript

const fakeDispatch = sandbox.stub();
fakeDispatch.onFirstCall().yields(fakeDispatch, () => fakeState).returns(Promise.resolve());
fakeDispatch.onThirdCall().yields(fakeDispatch, () => fakeState).returns(Promise.resolve());

setImmediate(() => {
  assert(fakeDispatch.calledWith({
    type: actionTypes.REQUEST_PRODUCTS
  }));
  assert(fakeDispatch.calledWith({
    type: actionTypes.ERROR_REQUESTING_PRODUCTS,
    error: testCase.error
  }));
  done();
});

```

@[3-5](An example of complex mocks needed to test a thunk)

---

### Sagas: A new hope

---?code=sample/async/sagas/saga.js&lang=javascript&title=saga.js

@[15](Listen for an action type)

---?code=sample/async/sagas/actions.js&lang=javascript&title=actions.js

---?code=sample/async/sagas/component.js&lang=python&title=component.js

---

### Testing is declarative and easy to reason about

---

```

const target = testSaga(delayedSimpleActionSaga)
  .takeLatest(DELAYED_SIMPLE_ACTION, delayedSimpleAction)
  .finish();

assert.true(target.isDone());

const target = testSaga(delayedSimpleAction)
  .next(fakeValue)
  .call(delay, 10000)
  .next()  
  .put(simpleAction(fakeValue))
  .finish();

assert.true(target.isDone());

```

---

## Next steps? redux-observable

```

// Basic signature of an epic
function (action$: Observable<Action>, store: Store): Observable<Action>;

```

```javascript

// Epics observe up-stream actions and output actions down-stream
const delayedSimpleActionEpic = action$ =>
  action$.ofType(DELAYED_SIMPLE_ACTION)
    .delay(10000)
    .mapTo(simpleAction(action$.value));

```
---

# Selectors

---

### Start with the simplest thing that could possibly work

---?code=sample/selectors/simplest-thing/component.js&lang=javascript

@[16](Our components now have knowledge of the shape of the store)

---

### Abstract knowledge of the shape of our store to re-usable selectors

---?code=sample/selectors/ramda/selectors.js&lang=javascript&title=selectors.js

---?code=sample/selectors/ramda/component.js&lang=python&title=component.js

---

## Next steps? reselect

```javascript

// Memoized selector only recalculates when the value of form.data
// or datastore.response changes
const simpleValueSelector = createSelector(
  R.pathOr(0, ['form', 'data', 'value']),
  R.pathOr(0, ['datastore', 'response', 'value']),
  R.sum
 )

```

---
