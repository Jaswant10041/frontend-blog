// Local caching service for storing posts to handle backend cold starts
const CACHE_KEY = 'blogPosts_cache';
const CACHE_METADATA_KEY = 'blogPosts_cacheMeta';
const MAX_CACHED_POSTS = 5;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const cacheService = {
  // Save posts to localStorage
  savePosts: (posts) => {
    try {
      if (!Array.isArray(posts) || posts.length === 0) return;
      
      // Store only the first 5 posts
      const postsToCache = posts.slice(0, MAX_CACHED_POSTS);
      const metadata = {
        cachedAt: Date.now(),
        postCount: postsToCache.length
      };
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(postsToCache));
      localStorage.setItem(CACHE_METADATA_KEY, JSON.stringify(metadata));
      console.log('Posts cached:', postsToCache.length);
    } catch (error) {
      console.error('Error saving posts to cache:', error);
    }
  },

  // Get posts from localStorage
  getCachedPosts: () => {
    try {
      const cachedPosts = localStorage.getItem(CACHE_KEY);
      const metadata = localStorage.getItem(CACHE_METADATA_KEY);
      
      if (!cachedPosts || !metadata) {
        return null;
      }

      const parsedMetadata = JSON.parse(metadata);
      const now = Date.now();
      
      // Check if cache is still valid (within 24 hours)
      if (now - parsedMetadata.cachedAt > CACHE_DURATION) {
        cacheService.clearCache();
        return null;
      }

      return JSON.parse(cachedPosts);
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  },

  // Clear the cache
  clearCache: () => {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_METADATA_KEY);
      console.log('Cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },

  // Check if cache exists and is valid
  isCacheValid: () => {
    try {
      const metadata = localStorage.getItem(CACHE_METADATA_KEY);
      if (!metadata) return false;

      const parsedMetadata = JSON.parse(metadata);
      const now = Date.now();
      
      return now - parsedMetadata.cachedAt <= CACHE_DURATION;
    } catch (error) {
      console.error('Error validating cache:', error);
      return false;
    }
  }
};
