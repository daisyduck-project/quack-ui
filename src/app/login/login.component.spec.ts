import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

const mockRouter = { navigate: jasmine.createSpy('navigate') };

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        provideAnimationsAsync(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home on back button click', () => {
    const button = fixture.debugElement.query(
      By.css('button[aria-label="Back Button"]')
    );
    button.triggerEventHandler('click', null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should render Join title', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.login-header p')?.textContent).toContain(
      'Sign In to your QUACK! account'
    );
  });

  it('should validate form fields', () => {
    const form = component.loginForm;
    expect(form.invalid).toBeTrue();

    form.get('email')!.setValue('test@example.com');
    expect(form.get('email')!.valid).toBeTrue();

    form.get('password')!.setValue('password');
    expect(form.valid).toBeTrue();

    form.get('password')!.setValue('short');
    expect(form.get('password')!.errors).toBeTruthy();
  });
});
