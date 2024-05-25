const InititalState = {
  name: 'data',
  isLoggedIn: false,
};
export const Auth_Action_Type = {
  LOGIN_REQUEST: 'login request',
  LOGIN_REQUEST_SUCCESS: 'login request success',
  LOGIN_REQUEST_FAILED: 'login request failed',
  UPDATE_USER: 'update user',
  LOGOUT: 'logout',
};
export const AuthReducerr = (state = InititalState, action) => {
  switch (action.type) {
    case Auth_Action_Type.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      };
    case Auth_Action_Type.UPDATE_USER:
    case Auth_Action_Type.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case Auth_Action_Type.LOGIN_REQUEST_FAILED:
      return {
        ...InititalState,
      };
    case Auth_Action_Type.LOGOUT:
      return {
        ...InititalState,
      };
    default: {
      return state;
    }
  }
};
