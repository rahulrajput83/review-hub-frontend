/* Delete Local Storage */

export const DeleteLS = () => {
    localStorage.removeItem('accessToken');
    let action = {
        type: 'Logout'
      }
    return action;
}