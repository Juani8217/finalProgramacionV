import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when login fails', () => {
    authService.login.and.returnValue(false);
    component.onSubmit();
    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate when login succeeds', () => {
    authService.login.and.returnValue(true);
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/personajes']);
    expect(component.errorMessage).toBe('');
  });

  it('should handle loading state', () => {
    authService.login.and.returnValue(true);
    component.onSubmit();
    expect(component.isLoading).toBeFalse();
  });
});