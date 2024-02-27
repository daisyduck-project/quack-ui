import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

// Mock the Router with a spy
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{provide: Router, useValue: mockRouter}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /login on "Sign In" button click', () => {
    const signInButton = fixture.debugElement.query(By.css('.home-button button:last-child'));
    signInButton.triggerEventHandler('click', null);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /join on "Join Now" button click', () => {
    const joinNowButton = fixture.debugElement.query(By.css('.home-button button:first-child'));
    joinNowButton.triggerEventHandler('click', null);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/join']);
  });
});
