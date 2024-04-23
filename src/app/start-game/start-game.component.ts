import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './start-game.component.html',
  styleUrl: './start-game.component.scss'
})
export class StartGameComponent implements OnInit {

  @Output()
  isGameStarted = new EventEmitter<boolean>(false);

  languages$ = of(['EN', 'RO', 'BG'])

  form = this.fb.group({
    selectLn: new FormControl('EN', [Validators.required])
  })

  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {

  }

  onSubmit() {
    if(this.form.invalid) {
      return
    }
    this.isGameStarted.emit(true);
    this.form.reset({
      selectLn: 'EN'
    })
  }

}
