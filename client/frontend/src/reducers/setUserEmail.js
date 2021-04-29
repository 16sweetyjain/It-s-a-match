const initialState = {
  email:''
}

const setUserEmailReducer = (state = initialState , action) => {
  //let newState = {...state, ...action.payload}
 // console.log(newState)
    switch (action.type) {
      case 'SET_USER_EMAIL':
        return {
          ...state, email:action.payload
        }
      default:
        return state;
    }
  };

  module.exports = setUserEmailReducer;