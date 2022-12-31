import actionConstants from './actionConstants';

const update = (state, action) => {
  const { next, data, id } = action;
  const newList = state.map(f => {
    if (f.id === id) {
      if (data) {
        return { ...f, show: false, data };
      }
    }

    return { ...f, show: false };
  });

  let newArr = [];

  if (newList.length > 0) {
    newArr = newList.map(item => {
      if (item.id === next) {
        return { ...item, show: true };
      }

      return { ...item };
    });
  }

  return newArr;
};

const updateFname = (state, action) => {
  const { id, fname } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, fname } };
    }

    return { ...item };
  });
};

const updateLname = (state, action) => {
  const { id, lname } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, lname } };
    }

    return { ...item };
  });
};

const updateAddress = (state, action) => {
  const { id, address } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, address } };
    }

    return { ...item };
  });
};

const updateEmail = (state, action) => {
  const { id, email } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, email } };
    }

    return { ...item };
  });
};

const updatePassword = (state, action) => {
  const { id, password } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, password } };
    }

    return { ...item };
  });
};

const updateCountryCode = (state, action) => {
  const { id, countryCode } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, countryCode } };
    }

    return { ...item };
  });
};

const updatePhoneNumber = (state, action) => {
  const { id, phoneNumber } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, phoneNumber } };
    }

    return { ...item };
  });
};

const updateTc = (state, action) => {
  const { id, tc } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, tc } };
    }

    return { ...item };
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionConstants.COMPLETE:
      return update(state, action);
    case actionConstants.UPDATE_FNAME:
      return updateFname(state, action);
    case actionConstants.UPDATE_LNAME:
      return updateLname(state, action);
    case actionConstants.UPDATE_ADDRESS:
      return updateAddress(state, action);
    case actionConstants.UPDATE_EMAIL:
      return updateEmail(state, action);
    case actionConstants.UPDATE_PASSWORD:
      return updatePassword(state, action);
    case actionConstants.UPDATE_COUNTRY_CODE:
      return updateCountryCode(state, action);
    case actionConstants.UPDATE_PHONE_NUMBER:
      return updatePhoneNumber(state, action);
    case actionConstants.UPDATE_TC:
      return updateTc(state, action);
    default:
      return state;
  }
};

export default reducer;
