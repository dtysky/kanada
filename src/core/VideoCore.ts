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
        this._video = null;
    }

    public fromVideo(video: HTMLVideoElement) {
        this._video = video;
        this._video.addEventListener('timeupdate', this.handleUpdate);
    }

    public reset() {
        this._video.removeEventListener('timeupdate', this.handleUpdate);
        this._video = null;
    }

    private handleUpdate = () => {
        this._imageCore.fromElement(this._video);
        this._imageCore.exec();
        this._imageCore.pushDataBackToContext();
        
    }

    public add(operate: TOperate) {
        this._imageCore.pipe(operate);
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
