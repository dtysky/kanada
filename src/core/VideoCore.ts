/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2 Jan 2018
 * Description:
 */
import ImageCore, {TOperate} from './ImageCore';

export default class VideoCore {
    private _imageCore: ImageCore;
    private _video: HTMLVideoElement;

    constructor() {
        this._imageCore = new ImageCore();
    }

    public fromURL(url: string) {

    }

    public fromVideo(video: HTMLVideoElement) {

    }

    public add(operate: TOperate) {
        this._imageCore.add(operate);
    }

    public remove(operate: TOperate) {
        this._imageCore.remove(operate);
    }

    public clear() {
        this._imageCore.clear();
    }

    // public exec() {
    //     this._imageCore.exec();
    // }
}
