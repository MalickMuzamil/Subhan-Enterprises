import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-terms-and-policy',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './terms-and-policy.component.html',
  styleUrl: './terms-and-policy.component.css'
})
export class TermsAndPolicyComponent {
  termsPolicyForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.termsPolicyForm = this.fb.group({
      privacyPolicy: [false, Validators.requiredTrue],
      termsConditions: [false, Validators.requiredTrue],
    })
  }


  onSubmit() {
    if (this.termsPolicyForm.valid) {
      console.log('Form Submitted with Check Boxes', this.termsPolicyForm.value)
    }

    else {
      console.log('Form Not Submitted')
    }
  }

}
