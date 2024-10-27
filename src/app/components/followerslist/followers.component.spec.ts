import { FollowerListComponent } from './followers.component';
import { GithubApiService } from '../../core/services/github-api.service';
import { of, throwError } from 'rxjs';

describe('FollowerListComponent - Basic Functions and API Calls Only', () => {
  let component: FollowerListComponent;
  let mockGithubApiService: jasmine.SpyObj<GithubApiService>;

  beforeEach(() => {
    mockGithubApiService = jasmine.createSpyObj('GithubApiService', [
      'username$',
      'getUserFollowers',
    ]);

    mockGithubApiService.username$ = of('mockUser'); 
    component = new FollowerListComponent(mockGithubApiService);
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should subscribe to username$ and call fetchFollowers with the username', () => {
      spyOn(component, 'fetchFollowers');
      component.ngOnInit();

      expect(component.fetchFollowers).toHaveBeenCalledWith('mockUser');
    });
  });

  describe('#fetchFollowers', () => {
    it('should populate followers if data is returned successfully', () => {
      const mockFollowers = [
        {
          avatar_url: 'url1',
          login: 'User1',
          html_url: 'https://github.com/User1',
        },
      ];
      mockGithubApiService.getUserFollowers.and.returnValue(of(mockFollowers));

      component.fetchFollowers('mockUser');

      expect(component.followers).toEqual([
        {
          profilePhoto: 'url1',
          name: 'User1',
          profileUrl: 'https://github.com/User1',
        },
      ]);
      expect(component.errorMessage).toBeNull();
    });

    it('should set errorMessage if no followers data is found', () => {
      mockGithubApiService.getUserFollowers.and.returnValue(of([]));

      component.fetchFollowers('mockUser');

      expect(component.followers).toEqual([]);
      expect(component.errorMessage).toBe('No data available');
    });

    it('should handle API error and set errorMessage', () => {
      mockGithubApiService.getUserFollowers.and.returnValue(throwError(() => new Error('API error')));

      component.fetchFollowers('mockUser');

      expect(component.followers).toEqual([]);
      expect(component.errorMessage).toBe('Failed to fetch followers data');
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe from username$ to prevent memory leaks', () => {
      const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
