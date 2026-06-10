# merge-sorted

TypeScript implementation of:

```ts
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

Returns a **sorted ascending** array given:
- `collection_1` — pre-sorted **ascending**
- `collection_2` — pre-sorted **descending**
- `collection_3` — pre-sorted **ascending**

> ⚠️ No `Array.prototype.sort` (or any built-in sort) is used anywhere.

---

## Three Approaches

| # | Name | Core Idea | Time | Space |
|---|------|-----------|------|-------|
| 1 | **Two-pointer k-way merge** | Reverse c2, then use 3 cursors — always advance the smallest head | O(n) | O(n) |
---

## Setup

**Prerequisites:** Node.js ≥ 18

```bash
git clone <repo-url>
cd merge-sorted
npm install
```

---

## Run

```bash
# Compile TypeScript → dist/
npm run build

# Run all unit tests
npm test

# Run tests with coverage report
npm run test:coverage

# Watch mode (re-runs on file change)
npm run test:watch
```

---

## Project Structure

```
merge-sorted/
├── src/
│   ├── merge.ts                   # All three implementations + helpers
│   └── __tests__/
│       └── merge.test.ts          # Unit tests (shared suite × 3 approaches)
├── jest.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Test Cases

The same test suite runs against all three approaches:

- Basic happy-path merges (non-overlapping, overlapping, all-duplicate)
- Edge cases: all empty, one/two arrays empty, single elements
- Negative numbers
- Large arrays (1 000 elements each) — verifies O(n) correctness
- Asymmetric sizes
- Property check: result is always non-decreasing
