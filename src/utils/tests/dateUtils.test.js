import { getNormalizedDateString } from '../dateUtils';

describe('dateUtils', () => {
  describe('getNormalizedDateString', () => {
    it('should return a correctly formatted date String ', () => {
      const originalDateString = '2012-02-23 00:00:00+00:00';
      expect(getNormalizedDateString(originalDateString)).toEqual('23.02.2012');
    });
  });
});
