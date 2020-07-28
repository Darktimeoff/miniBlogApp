class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async createPost(post)  {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
            const response = await fetch(request);
            return await response.json();
        } catch (error) {
            console.error(error)
        }
    }
}

export const apiService = new ApiService('https://js-mini-blog.firebaseio.com');