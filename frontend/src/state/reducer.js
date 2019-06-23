/**
 * Root reducer of the application.
 * Place any root state properties here e.g. logged in user name etc.
 */

export const initialState = {};

const reducer = (state = initialState, action) => ({
}[action.type] || state);

export default reducer;
