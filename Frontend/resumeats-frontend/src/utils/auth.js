export const isAuthenticated = () => {
  return localStorage.getItem("access_token") !== null
}

export const getToken = () => {
  return localStorage.getItem("access_token")
}

export const setTokens = (accessToken, refreshToken, userEmail = null) => {
  localStorage.setItem("access_token", accessToken)
  localStorage.setItem("refresh_token", refreshToken)
  if (userEmail) {
    localStorage.setItem("user_email", userEmail)
  }
}

export const getUserEmail = () => {
  return localStorage.getItem("user_email")
}

export const logout = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("user_email")
}
