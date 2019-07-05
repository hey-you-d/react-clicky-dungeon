import React from 'react';

// get number of child nodes with given class
export const getTotalChildNodesHelper = classLabel => {
  return React.Children.toArray(this.props.children).filter(
    item => item.props.className === classLabel
  ).length;
};

// return 'OK' if all conditions are not satisfied (hence, the payload is valid)
// otherwise return -1 if payload is undefined or the index of the array members
// that returns true
export const checkReducerActionPayloadHelper = (actionPayload, conditions) => {
  if (actionPayload === undefined) {
    return -1;
  }

  for (let i = 0; i < conditions.length; i += 1) {
    if (conditions[i]) {
      return i;
    }
  }

  return 'OK';
};

export const assertReducerFnHelper = (tgtFn, actionPayload, currentState, expectedNextState) => {
  const receivedState = tgtFn(currentState, actionPayload);
  expect(receivedState).toEqual(expectedNextState);
};
