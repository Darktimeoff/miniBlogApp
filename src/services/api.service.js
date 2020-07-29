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
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    async getPost() {
        try {
            const request = new Request(this.url + '/posts.json');
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    async getPostById(id) {
        try {
            const request = new Request(this.url + `/posts/${id}.json`)
            return useRequest(request);
        } catch (error) {
            console.error(error)
        }
    }

}

export const apiService = new ApiService('https://js-mini-blog.firebaseio.com');

async function useRequest(request) {
    const response = await fetch(request)
    return await response.json()
}