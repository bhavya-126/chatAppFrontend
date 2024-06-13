import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  fb: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    members: this.fb.array([])
  })
}
