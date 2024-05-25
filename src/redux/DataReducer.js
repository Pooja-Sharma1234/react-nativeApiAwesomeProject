const InititalState = {
  data: [],
  error: null,
};
const DataReducer = (state = InititalState, action) => {
  switch (action.type) {
    case 'PRODUCT':
      return {
        ...state,
      };
    case 'PRODUCT_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'PRODUCT_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DataReducer;
