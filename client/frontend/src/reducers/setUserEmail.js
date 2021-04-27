const setUserEmailReducer = (state={email:null}, action) => {
    switch (action.type) {
      case 'SET_USER_EMAIL':
        return {
          email: action.payload
        };
      default:
        return state;
    }
  };

  module.exports=setUserEmailReducer;