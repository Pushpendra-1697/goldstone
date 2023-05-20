import axios from "axios";
import { backend_url } from "../../BackendUrl";
import { ADD_USER, REMOVE_USER, UPDATE_USER, USER_ERROR, USER_LOADING, USER_SUCCESS } from "./user.type";

export const getUsers = (page = 1, gender = "") => async (dispatch) => {
    dispatch({ type: USER_LOADING });
    try {
        let res = await axios.get(`${backend_url}/posts/get?page=${page}&limit=10&gender=${gender}`);
        dispatch({ type: USER_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: USER_ERROR, payload: e.message });
    }
};

export const addUser = (message) => async (dispatch) => {
    dispatch({ type: USER_LOADING });
    try {
        let res = await axios.post(`${backend_url}/posts/post`, message);
        dispatch({ type: ADD_USER, payload: res.data.post });
    } catch (e) {
        dispatch({ type: USER_ERROR, payload: e.message });
    }
};


// Note: In post and patch requests always gives object after url of json-server or api url; here message and changes both are objects which comes different-2 files;
export const updateUser = (id, changes) => async (dispatch) => {
    dispatch({ type: USER_LOADING });
    try {
        let res = await axios.put(`${backend_url}/posts/put/${id}`, {
            ...changes
        });
        dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (e) {
        dispatch({ type: USER_ERROR, payload: e.message });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: USER_LOADING });
    try {
        let res = await axios.delete(`${backend_url}/posts/delete/${id}`);
        dispatch({ type: REMOVE_USER, payload: res.data._id });
    } catch (e) {
        dispatch({ type: USER_ERROR, payload: e.message });
    }
};