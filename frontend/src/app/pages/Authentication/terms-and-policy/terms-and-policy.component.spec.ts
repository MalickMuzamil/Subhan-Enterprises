import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndPolicyComponent } from './terms-and-policy.component';

describe('TermsAndPolicyComponent', () => {
  let component: TermsAndPolicyComponent;
  let fixture: ComponentFixture<TermsAndPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsAndPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
