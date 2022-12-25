import { Injectable, TemplateRef } from '@angular/core';
import { ToastAction } from '../shared/Toast/toast-action.service';

@Injectable({ providedIn: 'root' })

export class ToastService {
constructor(
    private _ToastActionService: ToastAction
) { }


    showSuccess(message: string) {
        this.playSuccessAudio();
        this._ToastActionService.show(message, { classname: 'text-light', delay: 6000, color: '#66bb6a' });
    }

    showError(dangerTpl: TemplateRef<any> | string) {
        this.playErrorAudio();
        this._ToastActionService.show(dangerTpl, { classname: 'text-light', delay: 6000, color: '#f44336' });
    }

    showWarning(warningTpl: TemplateRef<any> | string) {
        this.playErrorAudio();
        this._ToastActionService.show(warningTpl, { classname: 'text-light', delay: 6000, color: '#ffa726' });
    }

    showInfo(message: TemplateRef<any> | string) {
	    this._ToastActionService.show(message, { classname: 'text-light', delay: 6000, color: '#29b6f6' });
	}


    playSuccessAudio(){
        let audio = new Audio();
        audio.src = "assets/audio/noti.wav";
        audio.load();
        audio.play();
    }

    playErrorAudio(){
        let audio = new Audio();
        audio.src = "assets/audio/note.wav";
        audio.load();
        audio.play();
    }


}