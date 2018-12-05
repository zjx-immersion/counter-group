const initialState = {
  counterSum: 0,
  counterItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "COUNTERSUM":
      return {
        ...state,
        counterSum: state.counterSum + action.payload
      };
    case "GENERATE_COUNTERS":
      // console.log(action.payload);
      return {
        counterSum: 0,
        counterItems: new Array(parseInt(action.payload))
          .fill(0)
          .map(() => ({ count: 0, id: generateID() }))
      };
    case "INCREASE_ONE_COUNTER":
      const counterItems = state.counterItems.map(counterItem => {
        if (counterItem.id === action.payload.id) {
          return {
            id: counterItem.id,
            count: counterItem.count + action.payload.changedNum
          };
        } else {
          return counterItem;
        }
      });
      return { ...state, counterItems };

    case "DECREASE_ONE_COUNTER":
      return {
        ...state,
        counterItems: state.counterItems.map(counterItem => {
          if (counterItem.id === action.payload.id) {
            return {
              id: counterItem.id,
              count: counterItem.count + action.payload.changedNum
            };
          } else {
            return counterItem;
          }
        })
      };
    default:
      return state;
  }
};

const generateID = () => {
  return new Date().getTime() + Math.random();
};
