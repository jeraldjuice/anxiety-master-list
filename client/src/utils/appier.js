const defaultError = error => console.error('Error:', error);

const appier = {
    post: ( url, data, onError = defaultError ) => {
        return fetch(`/api/${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .catch(onError);
    },
    get: ( url, onError = defaultError ) => {
        return fetch(`/api/${url}`)
            .then(function(response) {
                return response.json();
            })
            .catch(onError);
    }
}

export default appier;