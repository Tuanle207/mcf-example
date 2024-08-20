import { TestBed } from '@angular/core/testing';
import { MapViewComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapViewComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MapViewComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'map-viewer-app' title`, () => {
    const fixture = TestBed.createComponent(MapViewComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('map-viewer-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MapViewComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, map-viewer-app');
  });
});
