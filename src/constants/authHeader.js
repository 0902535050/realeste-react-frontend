export function authHeader() {
    // return authorization header with jwt token
    if (JSON.parse(localStorage.getItem('res'))) {
        let user = JSON.parse(localStorage.getItem('res'));
        // console.log(user.token);
        if (user.token) {
            return {
                "Access-Control-Allow-Origin": "*",
                'authorization': 'Bearer ' + user.token
            };
        } else {
            return null;
        }
    }
    else return null

}