  const generateUUID = require('../../src/utils/generateUUID');
  
  describe('Generate UUID', () => {
    it('should generate a uuid with 36 characters', () => {
      const id = generateUUID();

      expect(id).toHaveLength(36);
    });
  });