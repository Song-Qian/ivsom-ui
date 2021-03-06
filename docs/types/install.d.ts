import '~/styles';
declare const _default: {
    length: number;
    toString(): string;
    toLocaleString(): string;
    pop(): any;
    push(...items: any[]): number;
    concat(...items: ConcatArray<any>[]): any[];
    concat(...items: any[]): any[];
    join(separator?: string | undefined): string;
    reverse(): any[];
    shift(): any;
    slice(start?: number | undefined, end?: number | undefined): any[];
    sort(compareFn?: ((a: any, b: any) => number) | undefined): any[];
    splice(start: number, deleteCount?: number | undefined): any[];
    splice(start: number, deleteCount: number, ...items: any[]): any[];
    unshift(...items: any[]): number;
    indexOf(searchElement: any, fromIndex?: number | undefined): number;
    lastIndexOf(searchElement: any, fromIndex?: number | undefined): number;
    every(callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
    some(callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
    forEach(callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any): U[];
    filter<S extends any>(callbackfn: (value: any, index: number, array: any[]) => value is S, thisArg?: any): S[];
    filter(callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any): any[];
    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
    reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: any, currentIndex: number, array: any[]) => U_1, initialValue: U_1): U_1;
    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
    reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: any, currentIndex: number, array: any[]) => U_2, initialValue: U_2): U_2;
    find<S_1 extends any>(predicate: (this: void, value: any, index: number, obj: any[]) => value is S_1, thisArg?: any): S_1 | undefined;
    find(predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): any;
    findIndex(predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): number;
    fill(value: any, start?: number | undefined, end?: number | undefined): any[];
    copyWithin(target: number, start: number, end?: number | undefined): any[];
    [Symbol.iterator](): IterableIterator<any>;
    entries(): IterableIterator<[number, any]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<any>;
    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
    includes(searchElement: any, fromIndex?: number | undefined): boolean;
    flatMap<U_3, This = undefined>(callback: (this: This, value: any, index: number, array: any[]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
    flat<U_4>(this: U_4[][][][][][][][], depth: 7): U_4[];
    flat<U_5>(this: U_5[][][][][][][], depth: 6): U_5[];
    flat<U_6>(this: U_6[][][][][][], depth: 5): U_6[];
    flat<U_7>(this: U_7[][][][][], depth: 4): U_7[];
    flat<U_8>(this: U_8[][][][], depth: 3): U_8[];
    flat<U_9>(this: U_9[][][], depth: 2): U_9[];
    flat<U_10>(this: U_10[][], depth?: 1 | undefined): U_10[];
    flat<U_11>(this: U_11[], depth: 0): U_11[];
    flat<U_12>(depth?: number | undefined): any[];
    version: string;
    install: (Vue: any) => void;
};
export default _default;
