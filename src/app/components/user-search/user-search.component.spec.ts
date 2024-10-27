import { UserSearchComponent } from './user-search.component';
import { GithubApiService } from '../../core/services/github-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

describe('UserSearchComponent - Basic Functions Only', () => {
  let component: UserSearchComponent;
  let mockGithubApiService: jasmine.SpyObj<GithubApiService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockGithubApiService = jasmine.createSpyObj('GithubApiService', ['getUser']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    component = new UserSearchComponent(
      {} as any, 
      mockGithubApiService,
      mockSnackBar,
      mockDialog
    );
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('#validateInput', () => {
    it('should show error message if username is empty', () => {
      component.username = ' ';
      component.validateInput();
      expect(component.showErrorMessage).toBeTrue();
      expect(component.errorMessage).toBe('Username cannot be empty');
    });

    it('should not show error message if username is valid', () => {
      component.username = 'validUsername';
      component.validateInput();
      expect(component.showErrorMessage).toBeFalse();
    });
  });

  describe('#onSearch', () => {
    it('should show snackbar message if username is empty', () => {
      component.username = '';
      component.onSearch();
      expect(mockSnackBar.open).toHaveBeenCalledWith('Please enter a GitHub username to search.', 'Close', {
        duration: 3000,
      });
    });

    it('should call fetchData if username is valid', () => {
      spyOn(component, 'fetchData');
      component.username = 'validUsername';
      component.onSearch();
      expect(component.fetchData).toHaveBeenCalled();
    });
  });

  describe('#fetchData', () => {
    it('should set searchResults and hide loader on success', () => {
      const mockUserData = { name: 'John Doe', id: 123 };
      mockGithubApiService.getUser.and.returnValue(of(mockUserData));
      component.username = 'validUsername';

      component.fetchData();

      expect(component.showLoader).toBeFalse();
      expect(component.searchResults).toEqual([mockUserData]);
    });

    it('should show error snackbar and hide loader on error', () => {
      mockGithubApiService.getUser.and.returnValue(throwError(() => new Error('User not found')));
      component.username = 'invalidUsername';

      component.fetchData();

      expect(component.showLoader).toBeFalse();
      expect(mockSnackBar.open).toHaveBeenCalledWith('User not found or an error occurred', 'Close', {
        duration: 3000,
      });
    });
  });

  describe('#clearInput', () => {
    it('should clear username and search results', () => {
      component.username = 'testUser';
      component.searchResults = [{ name: 'John Doe', id: 123 }];
      component.clearInput();
      expect(component.username).toBe('');
      expect(component.searchResults).toEqual([]);
    });
  });
});
