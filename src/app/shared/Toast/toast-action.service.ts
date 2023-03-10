import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ToastAction {
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toastx : any) {
		this.toasts = this.toasts.filter((t) => t !== toastx);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}