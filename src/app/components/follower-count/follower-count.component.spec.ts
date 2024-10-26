import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerCountComponent } from './follower-count.component';

describe('FollowerCountComponent', () => {
  let component: FollowerCountComponent;
  let fixture: ComponentFixture<FollowerCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowerCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
