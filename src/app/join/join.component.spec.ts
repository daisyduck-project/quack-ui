import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinComponent } from './join.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

const mockRouter = { navigate: jasmine.createSpy('navigate') };

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinComponent],
      providers: [{ provide: Router, useValue: mockRouter },provideAnimationsAsync(),provideHttpClient()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home on back button click', () => {
    const button = fixture.debugElement.query(By.css('button[aria-label="Back Button"]'));
    button.triggerEventHandler('click', null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should render Join title', () => {
    const fixture = TestBed.createComponent(JoinComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.join-header p')?.textContent).toContain('Join QUACK! today');
  });
  
  it('should validate form fields', () => {
    const form = component.registerForm;
    expect(form.invalid).toBeTrue();

    form.get('email')!.setValue('test@example.com');
    expect(form.get('email')!.valid).toBeTrue();

    form.get('username')!.setValue('testuser');
    expect(form.get('username')!.valid).toBeTrue();

    form.get('password')!.setValue('password');
    expect(form.valid).toBeTrue();

    form.get('password')!.setValue('short');
    expect(form.get('password')!.errors).toBeTruthy();
  });
});
