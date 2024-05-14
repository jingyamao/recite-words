const TokenKey = "token";

export function getToken() {
    return localStorage.getItem(TokenKey);
}

export function getUserId() {
    return localStorage.getItem("userId");
}

export function setToken(token) {
    return localStorage.setItem(TokenKey, token);
}

export function setUserId(UserId) {
    return localStorage.setItem("userId", UserId);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}

export function removeUserId() {
    return localStorage.removeItem("userId");
}
