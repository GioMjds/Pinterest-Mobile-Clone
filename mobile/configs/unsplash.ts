interface UnsplashImage {
    id: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    alt_description: string;
    description: string;
    width: number;
    height: number;
    color: string;
    user: {
        name: string;
        username: string;
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
    };
    likes: number;
}

interface PinImage {
    id: string;
    url: string;
    title: string;
    description?: string;
    width: number;
    height: number;
    dominant_color?: string;
    user?: {
        name: string;
        username: string;
        profile_image?: string;
    };
    likes: number;
}

class UnsplashService {
    private accessKey: string;
    private baseUrl = 'https://api.unsplash.com';

    constructor() {
        this.accessKey = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY || '';
        if (!this.accessKey) {
            console.warn('Unsplash Access Key not found in environment variables');
        }
    }

    private async makeRequest(endpoint: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Authorization': `Client-ID ${this.accessKey}`,
                    'Accept-Version': 'v1',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Unsplash API request failed:', error);
            throw error;
        }
    }

    async getRandomPhotos(count: number = 30): Promise<PinImage[]> {
        try {
            const data = await this.makeRequest(`/photos/random?count=${count}&orientation=portrait`);
            return this.transformUnsplashData(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error('Error fetching random photos:', error);
            return this.getFallbackImages(count);
        }
    }

    async searchPhotos(query: string, page: number = 1, perPage: number = 30): Promise<PinImage[]> {
        try {
            const data = await this.makeRequest(
                `/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=portrait`
            );
            return this.transformUnsplashData(data.results || []);
        } catch (error) {
            console.error('Error searching photos:', error);
            return this.getFallbackImages(perPage);
        }
    }

    async getPhotosByCategory(category: string, page: number = 1): Promise<PinImage[]> {
        return this.searchPhotos(category, page, 30);
    }

    async getFeedImages(page: number = 1): Promise<PinImage[]> {
        try {
            // Mix of random and curated content
            const [randomPhotos, trendingPhotos] = await Promise.all([
                this.getRandomPhotos(15),
                this.searchPhotos('trending', page, 15)
            ]);

            // Shuffle the results for a more Pinterest-like feed
            const allPhotos = [...randomPhotos, ...trendingPhotos];
            return this.shuffleArray(allPhotos);
        } catch (error) {
            console.error('Error fetching feed images:', error);
            return this.getFallbackImages(30);
        }
    }

    private transformUnsplashData(photos: UnsplashImage[]): PinImage[] {
        return photos.map(photo => ({
            id: photo.id,
            url: photo.urls.regular,
            title: photo.alt_description || photo.description || 'Beautiful image',
            description: photo.description,
            width: photo.width,
            height: photo.height,
            dominant_color: photo.color,
            user: {
                name: photo.user.name,
                username: photo.user.username,
                profile_image: photo.user.profile_image?.medium,
            },
            likes: photo.likes,
        }));
    }

    private shuffleArray(array: PinImage[]): PinImage[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    private getFallbackImages(count: number): PinImage[] {
        const categories = ['nature', 'architecture', 'food', 'travel', 'fashion', 'art', 'lifestyle'];
        
        return Array.from({ length: count }, (_, i) => ({
            id: `fallback_${i}`,
            url: `https://picsum.photos/400/600?random=${i + Date.now()}`,
            title: `Beautiful ${categories[i % categories.length]} inspiration`,
            width: 400,
            height: 600,
            dominant_color: '#' + Math.floor(Math.random()*16777215).toString(16),
            user: {
                name: `User ${i + 1}`,
                username: `user${i + 1}`,
                profile_image: `https://picsum.photos/100/100?random=${i + 100}`,
            },
            likes: Math.floor(Math.random() * 1000),
        }));
    }
}

export const imageService = new UnsplashService();
export type { PinImage };