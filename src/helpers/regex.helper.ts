const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

let emailInvalid: any;

export const RegExHelper = {
  password,
  emailInvalid,
};
