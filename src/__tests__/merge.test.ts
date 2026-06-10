import { mergeNoSort } from '../merge';

const implementation = [
  { name: 'Two-pointer k-way merge', fn: mergeNoSort },
];

type MergeFn = (c1: number[], c2: number[], c3: number[]) => number[];

function runSuite(name: string, merge: MergeFn) {
  describe(name, () => {

    // ------------------------------------------------------------------
    // Basic happy-path
    // ------------------------------------------------------------------
    test('merges three non-overlapping arrays', () => {
      const c1 = [1, 4, 7];          // asc
      const c2 = [9, 6, 3];          // desc
      const c3 = [2, 5, 8];          // asc
      expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('merges three overlapping arrays', () => {
      const c1 = [1, 3, 5];
      const c2 = [6, 4, 2];
      const c3 = [1, 3, 5];
      expect(merge(c1, c2, c3)).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 6]);
    });

    test('handles duplicate values across all three arrays', () => {
      const c1 = [2, 2, 2];
      const c2 = [2, 2, 2];
      const c3 = [2, 2, 2];
      expect(merge(c1, c2, c3)).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2]);
    });

    // ------------------------------------------------------------------
    // Edge cases — empty arrays
    // ------------------------------------------------------------------
    test('all three arrays empty → returns []', () => {
      expect(merge([], [], [])).toEqual([]);
    });

    test('c1 empty, c2 & c3 non-empty', () => {
      expect(merge([], [5, 3, 1], [2, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test('c2 empty, c1 & c3 non-empty', () => {
      expect(merge([1, 3], [], [2, 4])).toEqual([1, 2, 3, 4]);
    });

    test('c3 empty, c1 & c2 non-empty', () => {
      expect(merge([1, 3], [4, 2], [])).toEqual([1, 2, 3, 4]);
    });

    test('only one array has elements', () => {
      expect(merge([10, 20, 30], [], [])).toEqual([10, 20, 30]);
      expect(merge([], [30, 20, 10], [])).toEqual([10, 20, 30]);
      expect(merge([], [], [10, 20, 30])).toEqual([10, 20, 30]);
    });

    // ------------------------------------------------------------------
    // Single-element arrays
    // ------------------------------------------------------------------
    test('single element in each array', () => {
      expect(merge([5], [3], [7])).toEqual([3, 5, 7]);
    });

    test('single element equal in each array', () => {
      expect(merge([1], [1], [1])).toEqual([1, 1, 1]);
    });

    // ------------------------------------------------------------------
    // Negative numbers
    // ------------------------------------------------------------------
    test('handles negative numbers', () => {
      const c1 = [-5, -2, 1];
      const c2 = [3, 0, -3];
      const c3 = [-4, -1, 2];
      expect(merge(c1, c2, c3)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3]);
    });

    test('all negative numbers', () => {
      const c1 = [-9, -6, -3];
      const c2 = [-1, -4, -7];
      const c3 = [-8, -5, -2];
      expect(merge(c1, c2, c3)).toEqual([-9, -8, -7, -6, -5, -4, -3, -2, -1]);
    });

    // ------------------------------------------------------------------
    // Large arrays — stress test correctness
    // ------------------------------------------------------------------
    test('large arrays (1 000 elements each)', () => {
      const N = 1_000;
      // c1: 0, 3, 6 … (asc)
      const c1 = Array.from({ length: N }, (_, i) => i * 3);
      // c2: (N-1)*3+1, (N-2)*3+1 … (desc)
      const c2 = Array.from({ length: N }, (_, i) => (N - 1 - i) * 3 + 1);
      // c3: 2, 5, 8 … (asc)
      const c3 = Array.from({ length: N }, (_, i) => i * 3 + 2);

      const result = merge(c1, c2, c3);

      expect(result).toHaveLength(3 * N);
      // Verify ascending order without using sort
      for (let i = 1; i < result.length; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
      }
    });

    // ------------------------------------------------------------------
    // Asymmetric sizes
    // ------------------------------------------------------------------
    test('arrays of very different sizes', () => {
      const c1 = [1];
      const c2 = [100, 50, 20, 10, 5];
      const c3 = [2, 3];
      expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 5, 10, 20, 50, 100]);
    });

    // ------------------------------------------------------------------
    // Output must be sorted ascending (property-based spot check)
    // ------------------------------------------------------------------
    test('result is always non-decreasing', () => {
      const cases: [number[], number[], number[]][] = [
        [[0, 10, 20], [15, 5], [3, 8, 12]],
        [[-100, 0, 100], [50, 25, 0], [-50, 0, 50]],
        [[1, 1, 2], [3, 2, 1], [1, 2, 3]],
      ];
      for (const [c1, c2, c3] of cases) {
        const result = merge(c1, c2, c3);
        for (let i = 1; i < result.length; i++) {
          expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
        }
      }
    });
  });
}

for (const { name, fn } of implementation) {
  runSuite(name, fn);
}
