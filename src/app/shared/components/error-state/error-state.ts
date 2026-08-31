import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-error-state',
  imports: [ButtonModule, MessageModule],
  templateUrl: './error-state.html',
  styles: `
    .state {
      display: grid;
      justify-items: center;
      gap: 1rem;
      padding: 3rem 1rem;
      text-align: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorState {
  readonly message = input('Something went wrong. Please try again.');
  readonly showRetry = input(true);
  readonly retry = output<void>();
}
