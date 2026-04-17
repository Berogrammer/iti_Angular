import { DiscountPipe } from './discount.pipe';

describe('DiscountPipe', () => {
  let pipe: DiscountPipe;

  beforeEach(() => {
    pipe = new DiscountPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null for null input', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should return null for undefined input', () => {
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('should return null for non-number input', () => {
    expect(pipe.transform('100' as any)).toBeNull();
  });

  it('should handle NaN input', () => {
    expect(pipe.transform(NaN)).toBeNaN();
  });

  it('should apply default 10% discount and round', () => {
    expect(pipe.transform(100)).toBe(90);
    expect(pipe.transform(105)).toBe(95); // 105 * 0.9 = 94.5 → 95
    expect(pipe.transform(1000)).toBe(900);
  });

  it('should apply custom discount percent and round', () => {
    expect(pipe.transform(100, 20)).toBe(80);
    expect(pipe.transform(100, 50)).toBe(50);
    expect(pipe.transform(123, 33)).toBe(82);
  });
});

