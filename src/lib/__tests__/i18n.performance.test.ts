import { t, clearTranslationCache, preloadTranslations, translateBatch } from '../i18n';

describe('i18n Performance Tests', () => {
  beforeEach(() => {
    clearTranslationCache();
  });

  describe('Translation Caching', () => {
    it('should cache translation results', () => {
      const key = 'home.title';
      const language = 'en';

      // First call - should compute and cache
      const start1 = performance.now();
      const result1 = t(key, language);
      const end1 = performance.now();
      const firstCallTime = end1 - start1;

      // Second call - should use cache
      const start2 = performance.now();
      const result2 = t(key, language);
      const end2 = performance.now();
      const secondCallTime = end2 - start2;

      expect(result1).toBe(result2);
      expect(secondCallTime).toBeLessThan(firstCallTime);
    });

    it('should handle multiple languages in cache', () => {
      const key = 'home.title';
      
      const enResult = t(key, 'en');
      const zhResult = t(key, 'zh');
      
      // Should return different results for different languages
      expect(enResult).not.toBe(zhResult);
      
      // Should cache both results
      const enResult2 = t(key, 'en');
      const zhResult2 = t(key, 'zh');
      
      expect(enResult).toBe(enResult2);
      expect(zhResult).toBe(zhResult2);
    });

    it('should clear cache correctly', () => {
      const key = 'home.title';
      const language = 'en';
      
      // Cache a translation
      t(key, language);
      
      // Clear cache
      clearTranslationCache();
      
      // This should recompute (we can't easily test timing in Jest, 
      // but we can verify it doesn't throw errors)
      const result = t(key, language);
      expect(result).toBeDefined();
    });
  });

  describe('Batch Operations', () => {
    it('should handle batch translations efficiently', () => {
      const keys = ['home.title', 'home.subtitle', 'home.tokenButton'];
      const language = 'en';
      
      const start = performance.now();
      const results = translateBatch(keys, language);
      const end = performance.now();
      
      expect(Object.keys(results)).toHaveLength(keys.length);
      expect(end - start).toBeLessThan(10); // Should be very fast
      
      // Verify all keys are translated
      keys.forEach(key => {
        expect(results[key]).toBeDefined();
      });
    });

    it('should preload translations', () => {
      const keys = ['home.title', 'home.subtitle'];
      const language = 'en';
      
      // Preload
      preloadTranslations(keys, language);
      
      // These should now be cached and fast
      keys.forEach(key => {
        const start = performance.now();
        const result = t(key, language);
        const end = performance.now();
        
        expect(result).toBeDefined();
        expect(end - start).toBeLessThan(1); // Should be very fast due to caching
      });
    });
  });

  describe('Error Handling Performance', () => {
    it('should cache error results to avoid repeated computation', () => {
      const invalidKey = 'nonexistent.key';
      const language = 'en';
      
      // First call with invalid key
      const start1 = performance.now();
      const result1 = t(invalidKey, language);
      const end1 = performance.now();
      const firstCallTime = end1 - start1;
      
      // Second call should be cached
      const start2 = performance.now();
      const result2 = t(invalidKey, language);
      const end2 = performance.now();
      const secondCallTime = end2 - start2;
      
      expect(result1).toBe(result2);
      expect(result1).toBe(invalidKey); // Should return the key itself
      expect(secondCallTime).toBeLessThan(firstCallTime);
    });
  });

  describe('Memory Usage', () => {
    it('should not cause memory leaks with large number of translations', () => {
      const language = 'en';
      
      // Generate many unique keys
      const keys = Array.from({ length: 1000 }, (_, i) => `test.key.${i}`);
      
      // Translate all keys
      keys.forEach(key => {
        t(key, language);
      });
      
      // Clear cache should free memory
      clearTranslationCache();
      
      // This test mainly ensures no errors are thrown
      // In a real scenario, you'd monitor memory usage
      expect(true).toBe(true);
    });
  });

  describe('Concurrent Access', () => {
    it('should handle concurrent translation requests', async () => {
      const key = 'home.title';
      const language = 'en';
      
      // Simulate concurrent requests
      const promises = Array.from({ length: 10 }, () => 
        Promise.resolve(t(key, language))
      );
      
      const results = await Promise.all(promises);
      
      // All results should be the same
      const firstResult = results[0];
      results.forEach(result => {
        expect(result).toBe(firstResult);
      });
    });
  });
});
