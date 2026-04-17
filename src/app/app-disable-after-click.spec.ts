import { Component, ViewChild, DebugElement, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { AppDisableAfterClickDirective } from './app-disable-after-click.directive';

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [AppDisableAfterClickDirective],
  template: `
    <button appDisableAfterClick #testButton>Click Me</button>
    <div appDisableAfterClick #testDiv>Click Div</div>
  `
})
class TestHostComponent {}

describe('AppDisableAfterClickDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let elButton: HTMLButtonElement;
  let elDiv: HTMLDivElement;
  let buttonDebugElement: DebugElement;
  let directiveInstance: AppDisableAfterClickDirective;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDisableAfterClickDirective, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    ngZone = TestBed.inject(NgZone);
    fixture.detectChanges();

    buttonDebugElement = fixture.debugElement.query(By.css('button'));
    elButton = buttonDebugElement.nativeElement as HTMLButtonElement;
    elDiv = fixture.debugElement.query(By.css('div')).nativeElement as HTMLDivElement;
    directiveInstance = buttonDebugElement.injector.get(AppDisableAfterClickDirective);
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should disable button and change text to Processing... on button click', () => {
    ngZone.run(() => {
      directiveInstance.onClick(new MouseEvent('click'));
    });
    fixture.detectChanges();

    expect(elButton.disabled).toBe(true);
    expect(elButton.textContent?.trim()).toBe('Processing...');
  });

  it('should not affect non-button elements on click', () => {
    elDiv.click();
    fixture.detectChanges();

    expect(elDiv.hasAttribute('disabled')).toBe(false);
    expect(elDiv.textContent?.trim()).toBe('Click Div');
  });

  it('should call clearTimeout on destroy after click', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    ngZone.run(() => {
      directiveInstance.onClick(new MouseEvent('click'));
    });
    fixture.detectChanges();

    fixture.destroy();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
