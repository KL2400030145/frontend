export const BACKENDURL = "https://backend-r0hc.onrender.com/dbcrud";

export function callApi(reqMethod, url, data, responseHandler)
{
    let options = {
        method: reqMethod
    };

    // POST & PUT → send JSON
    if (reqMethod === "POST" || reqMethod === "PUT")
    {
        options.headers = {
            "Content-Type": "application/json"
        };
        options.body = JSON.stringify(data);
    }

    fetch(`${BACKENDURL}${url}`, options)
        .then((response) => {
            if (!response.ok)
                throw new Error(response.status + " " + response.statusText);

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then((data) => responseHandler(data))
        .catch((err) => {
            console.error(err);
            alert(err);
        });
}