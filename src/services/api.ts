import { 
    User, 
    Post, 
    Comment, 
    UserQueryParams, 
    PostQueryParams, 
    CommentQueryParams 
} from './types';



const API_BASE = 'https://jsonplaceholder.typicode.com';



async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }))
        throw new Error((error as { message: string }).message || `HTTP ${response.status}`)
    }
    return response.json() as Promise<T>
}


export const postApi = {
    async addPost(postData: Omit<Post, 'id'>): Promise<Post> {
        const response = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(postData),
        })

        return handleResponse<Post>(response)
    },
    async getPost(params?: PostQueryParams): Promise<Post[]> {
        
        const queryParams = new URLSearchParams()
        if (params) {
            if (params.id) queryParams.append('id', params.id)
            if (params.userId) queryParams.append('userId', params.userId)
            if (params.start) queryParams.append('_start', params.start.toString())
            if (params.limit) queryParams.append('_limit', params.limit.toString())
        }
        
        const queryString = queryParams.toString()
        const url = queryString ? `${API_BASE}/posts?${queryString}` : `${API_BASE}/posts`
        
        const response = await fetch(url, {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        // console.log('API Response for getPost:', response.json(), 'with params:', queryString);
        return handleResponse<Post[]>(response)
    },

    async deletePost(id: string): Promise<void> {
        await fetch(`${API_BASE}/posts/${id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
    },
}

export const commentApi = {
    async addComment(commentData: Omit<Comment, 'id'>): Promise<Omit<Comment, 'postId'>> {
        const response = await fetch(`${API_BASE}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
        return handleResponse<Omit<Comment, 'postId'>>(response)
    },
    async getComment(params?: CommentQueryParams): Promise<Comment[]> {
        
        const queryParams = new URLSearchParams()
        if (params) {
            if (params.postId) queryParams.append('postId', params.postId)
        }
        
        const queryString = queryParams.toString()
        const url = queryString ? `${API_BASE}/comments?${queryString}` : `${API_BASE}/comments`
        
        const response = await fetch(url, {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        return handleResponse<Comment[]>(response)
    },

    async deleteComment(id: string): Promise<void> {
        await fetch(`${API_BASE}/comments/${id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
    },
}

export const userApi = {
    async getUser(params?: UserQueryParams): Promise<User[]> {
        
        const queryParams = new URLSearchParams()
        if (params) {
            if (params.id) queryParams.append('id', params.id)
        }
        
        const queryString = queryParams.toString()
        const url = queryString ? `${API_BASE}/users?${queryString}` : `${API_BASE}/users`
        
        const response = await fetch(url, {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        return handleResponse<User[]>(response)
    },
}
