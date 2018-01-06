import { TMatrix } from '../constants';
export declare class ConvolutionKernel {
    private _size;
    private _matrix;
    constructor(matrix: TMatrix);
    readonly size: number;
    readonly matrix: TMatrix;
    apply(window: TMatrix): number;
}
