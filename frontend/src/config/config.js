
// main switch - url / proxy.
export const apiUrl = ""

// tokenkey
export const tokenKey = "userInfo";

// for Auth requests.
export const headers = {
    'authorization': `Bearer ${JSON.parse(localStorage.getItem(tokenKey)) 
        && JSON.parse(localStorage.getItem(tokenKey)).token}`,
    'Content-Type': 'application/json',
};

