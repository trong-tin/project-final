const checkLogin = (status) => {
  return {
    type: "CHECK_LOGIN",
    status: status,
  };
};
export default checkLogin;