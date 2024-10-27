import { UserProfileComponent } from './user-profile.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GithubApiService } from '../../core/services/github-api.service';
import { of } from 'rxjs';

describe('UserProfileComponent - Basic Functions Only', () => {
  let component: UserProfileComponent;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<UserProfileComponent>>;
  let mockGithubApiService: jasmine.SpyObj<GithubApiService>;

  const mockUser = { login: 'mockUser' }; 

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockGithubApiService = jasmine.createSpyObj('GithubApiService', ['setUsername']);
    component = new UserProfileComponent(
      mockUser,             
      mockDialogRef,       
      mockGithubApiService 
    );
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set a random gradient and set the username in GithubApiService', () => {
      spyOn(component, 'setRandomGradient');
      component.ngOnInit();

      expect(component.setRandomGradient).toHaveBeenCalled();
      expect(mockGithubApiService.setUsername).toHaveBeenCalledWith('mockUser');
    });
  });

  describe('#setRandomGradient', () => {
    it('should set gradientStyle to a random gradient from the gradients list', () => {
      spyOn(Math, 'random').and.returnValue(0);
      component.setRandomGradient();
      expect(component.gradientStyle).toBe('linear-gradient(135deg, #4e54c8, #8f94fb)');
    });
  });

  describe('#openUserProfile', () => {
    it('should open user profile in a new tab', () => {
      spyOn(window, 'open');
      component.openUserProfile('https://github.com/mockUser');
      expect(window.open).toHaveBeenCalledWith('https://github.com/mockUser', '_blank');
    });
  });

  describe('#closeDialog', () => {
    it('should close the dialog', () => {
      component.closeDialog();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });
});
