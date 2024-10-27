import { RepoListComponent } from './repo-list.component';
import { GithubApiService } from '../../core/services/github-api.service';
import { of, throwError, Subscription } from 'rxjs';

fdescribe('RepoListComponent - Basic Functions and API Calls Only', () => {
  let component: RepoListComponent;
  let mockGithubApiService: jasmine.SpyObj<GithubApiService>;

  beforeEach(() => {
    mockGithubApiService = jasmine.createSpyObj('GithubApiService', ['getUserRepos']);
    mockGithubApiService.username$ = of('mockUser');
    component = new RepoListComponent(mockGithubApiService);
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set username and call fetchRepos with the username', () => {
      spyOn(component, 'fetchRepos');
      component.ngOnInit();

      expect(component.username).toBe('mockUser');
      expect(component.fetchRepos).toHaveBeenCalledWith('mockUser');
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe from username$ to prevent memory leaks', () => {
      const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('#fetchRepos', () => {
    it('should set dataSource if repositories are fetched successfully', () => {
      const mockRepos = [
        { name: 'Repo1', description: 'Test Repo', forks: 2, watchers: 3, updated_at: '2023-10-20', url: 'https://github.com/Repo1' },
      ];
      mockGithubApiService.getUserRepos.and.returnValue(of(mockRepos));

      component.fetchRepos('mockUser');

      expect(component.dataSource).toEqual(mockRepos);
      expect(component.errorMessage).toBeNull();
    });

    it('should set errorMessage if no repositories are found', () => {
      mockGithubApiService.getUserRepos.and.returnValue(of([]));
      component.fetchRepos('mockUser');
      expect(component.dataSource).toEqual([]);
      expect(component.errorMessage).toBe('No repositories available');
    });

    it('should handle API error and set errorMessage', () => {
      mockGithubApiService.getUserRepos.and.returnValue(throwError(() => new Error('API error')));
      component.fetchRepos('mockUser');
      expect(component.dataSource).toEqual([]);
      expect(component.errorMessage).toBe('Failed to fetch repository data');
    });
  });
});
