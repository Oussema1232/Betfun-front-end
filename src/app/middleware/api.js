import http from "../../services/httpService";
import * as actions from "../../features/actions/api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    onSuccess,
    onStart,
    onError,
    data,
    onServerFail,
  } = action.payload;

  if (onStart) dispatch({ type: onStart, payload: data });
  next(action); //we call next(action) to make the next dispatch appear in dev tools

  try {
    const response = await http.request({
      url,
      method,
      data,
    });

    dispatch(actions.apiCallSuccess(response.data));

    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (err) {
    dispatch(actions.apiCallFailed(err.message));
    if (onError && err.response && err.response.status == 400)
      dispatch({ type: onError, payload: err.response.data });
    if (
      err.message == "Network Error" ||
      (err.response && err.response.status == 500 && onServerFail)
    )
      dispatch({ type: onServerFail });
  }
};

export default api;
