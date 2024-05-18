addEventListener("message", ({ data }) => {
    getRefresToken(data)
})

let temp

function getRefresToken(data) {
    fetch(`${data.url}/api/users/refresh-token`, {
        credentials: "include",
        headers: data.headers,
        method: "POST",
    }).then(res => res.json())
        .then((responseData) => {
            postMessage(JSON.parse(JSON.stringify(responseData)))
            temp = setTimeout(() => {
                clearTimeout(temp)
                getRefresToken(data)
            }, 60000)
        })
}