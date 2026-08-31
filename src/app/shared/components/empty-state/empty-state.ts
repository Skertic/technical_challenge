import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-state',
  imports: [ButtonModule],
  templateUrl: './empty-state.html',
  styles: `
    .state {
      display: grid;
      justify-items: center;
      padding: 4rem 1rem;
      text-align: center;
    }
    .symbol {
      display: grid;
      width: 3.5rem;
      height: 3.5rem;
      margin-bottom: 1rem;
      place-items: center;
      border-radius: 50%;
      background: var(--surface-soft);
      color: var(--ink-muted);
      font-size: 2rem;
    }
    h2 {
      margin: 0;
      color: var(--ink-strong);
    }
    p {
      margin: 0.5rem 0 1.25rem;
      color: var(--ink-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  readonly title = input('Nothing here yet');
  readonly message = input('There is no content to display.');
  readonly showAction = input(false);
  readonly actionLabel = input('Reset');
  readonly action = output<void>();
}
