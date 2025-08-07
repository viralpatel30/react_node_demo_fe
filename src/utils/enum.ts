export enum REQUIRED_ERROR {
  NAME = "Name is Required Field",
  EMAIL = "Email is Required Field",
  PASSWORD = "Password is Required Field",
  PRODUCT_NAME = "Product name is required",
  VARIANT_NAME = "Variant name is required",
  AMOUNT_NUMBER = "Amount is required",
  AMOUNT_NUMBER_TYPE = "Amount must be a number",
  AT_LEAST_ONE_VARIANT = "At least one variant is required",
}

export enum TOASTER_SUCCESS_MSG {
  IS_LOGIN = "Logged In Successfuly",
  IS_REGISTER = "Registered Successfuly",
  PRODUCT_CREATION_SUCCESS = "Product created successfully!",
}

export enum TOASTER_ERROR_MSG {
  INVALID_CRED = "Invalid Credentials",
  USER_NOT_EXIST = "User does not exist !!",
  IS_LOGIN_FAILED = "Login failed. Please try again.",
  IS_REGISTER_FAILED = "Registration failed. Please try again.",
}
export enum NETWORK_ERROR {
  BAD_REQUEST = "ERR_BAD_REQUEST",
}

export enum LOCAL_STORAGE {
  ACCESS_TOKEN = "access_token",
}
