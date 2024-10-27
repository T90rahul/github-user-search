import { FollowingListComponent } from './following-list.component';
import { GithubApiService } from '../../core/services/github-api.service';
import { of, throwError, Subscription } from 'rxjs';

describe('FollowingListComponent - Basic Functions and API Calls Only', () => {
  let component: FollowingListComponent;
  let mockGithubApiService: jasmine.SpyObj<GithubApiService>;

  beforeEach(() => {
    mockGithubApiService = jasmine.createSpyObj('GithubApiService', ['getUserFollowing']);
    mockGithubApiService.username$ = of('mockUser'); // Set up the username$ observable

    component = new FollowingListComponent(mockGithubApiService);
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set username and call fetchFollowing with the username', () => {
      spyOn(component, 'fetchFollowing');
      component.ngOnInit();

      expect(component.username).toBe('mockUser');
      expect(component.fetchFollowing).toHaveBeenCalledWith('mockUser');
    });

    it('should subscribe to username$', () => {
      component.ngOnInit();
      expect(mockGithubApiService.username$).toBeTruthy();
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe from username$ to prevent memory leaks', () => {
      const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('#fetchFollowing', () => {
    it('should set dataSource if following data is fetched successfully', () => {
      const mockFollowing = [
        { profilePhoto: 'url1', name: 'User1', profileLink: 'https://github.com/User1' },
      ];
      mockGithubApiService.getUserFollowing.and.returnValue(of(mockFollowing));

      component.fetchFollowing('mockUser');

      expect(component.dataSource).toEqual(mockFollowing);
      expect(component.errorMessage).toBeNull();
    });

    it('should set errorMessage if no following data is found', () => {
      mockGithubApiService.getUserFollowing.and.returnValue(of([]));

      component.fetchFollowing('mockUser');

      expect(component.dataSource).toEqual([]);
      expect(component.errorMessage).toBe('No data available');
    });

    it('should handle API error and set errorMessage', () => {
      mockGithubApiService.getUserFollowing.and.returnValue(throwError(() => new Error('API error')));

      component.fetchFollowing('mockUser');

      expect(component.dataSource).toEqual([]);
      expect(component.errorMessage).toBe('Failed to fetch following data');
    });
  });
});
