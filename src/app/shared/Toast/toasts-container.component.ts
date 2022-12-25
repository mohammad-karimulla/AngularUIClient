import { Component, TemplateRef } from '@angular/core';

import { ToastAction } from 'src/app/shared/Toast/toast-action.service';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-toasts',
	standalone: true,
	imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
	template: `
<ngb-toast
			*ngFor="let toast of toastActionService.toasts"
			[class]="toast.classname"
			[autohide]="true"
			[delay]="toast.delay || 5000"
			[style]="{ 'background-color': toast.color }"
			(hidden)="toastActionService.remove(toast)">

			<div style="display: flex;">

				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bell-fill" viewBox="-3 -1 18 18">
					<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
				</svg>

				<span style="flex: .1;"></span>

				<ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
					<ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
				</ng-template>

				<ng-template #text>
					{{ toast.textOrTpl }}
				</ng-template>

			</div>


		</ngb-toast>

		<style>
			.sucess {
			color: #81c784;
			}

			.error {
			color: #e57373;
			}
		</style>
	`,
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
	constructor(public toastActionService: ToastAction) {}

	isTemplate(toast : any) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}
