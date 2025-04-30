import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholder = input('Buscar');
  debounceTime = input<number>(300);
  initialValue = input<string>('');

  value = output<string>();

  // Para señal que debe ser inicializada se usa linkedSignal
  inputValue = linkedSignal<string>(() => this.initialValue());

  dbounceEffect = effect( (onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });

  });
}
