export function authCompany() {
    // return authorization header with jwt token
    if (JSON.parse(localStorage.getItem('company'))) {
        let company = JSON.parse(localStorage.getItem('company'));
        console.log(company.token);
        if (company.token) {
            return {
                "Access-Control-Allow-Origin": "*",
                'authorization': 'Bearer ' + company.token
            };
        } else {
            return null;
        }
    }
    else return null

}