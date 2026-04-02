export const BACKENDURL = "https://backend-r0hc.onrender.com/dbcrud";

export function callApi(reqMethod, url, data, responseHandler)
{
    let options = {
        method: reqMethod
    };

    // ✅ For POST / PUT (JSON body)
    if (reqMethod === "POST" || reqMethod === "PUT")
    {
        options.headers = {
            "Content-Type": "application/json"
        };
        options.body = JSON.stringify(data);
    }

    // ✅ For PATCH (no body, uses query params)
    // Example: /updatename/1?sname=John

    fetch(`${BACKENDURL}${url}`, options)
        .then((response) => {
            if (!response.ok)
            {
                throw new Error(response.status + " " + response.statusText);
            }

            // ✅ Handle both JSON and text responses
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json"))
            {
                return response.json();
            }
            else
            {
                return response.text();
            }
        })
        .then((data) => responseHandler(data))
        .catch((err) => {
            console.error(err);
            alert(err);
        });
}