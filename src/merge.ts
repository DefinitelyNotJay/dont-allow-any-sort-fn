export function mergeNoSort(
    collection_1: number[],
    collection_2: number[],
    collection_3: number[],
): number[] {
    // reverse array (desc -> asc)
    const c2asc = collection_2.slice();
    let left = 0, right = c2asc.length - 1;
    while (left < right) {
        const tmp = c2asc[left];
        c2asc[left] = c2asc[right];
        c2asc[right] = tmp;
        left++;
        right--;
    }

    const result: number[] = [];
    let i = 0, j = 0, k = 0;
    // Infinity type give the array (that out of length) a max value
    while (i < collection_1.length || j < c2asc.length || k < collection_3.length) {
        const v1 = i < collection_1.length ? collection_1[i] : Infinity;
        const v2 = j < c2asc.length ? c2asc[j] : Infinity;
        const v3 = k < collection_3.length ? collection_3[k] : Infinity;

        if (v1 <= v2 && v1 <= v3) {
            result.push(v1); i++;
        } else if (v2 <= v1 && v2 <= v3) {
            result.push(v2); j++;
        } else {
            result.push(v3); k++;
        }
    }

    return result;
}