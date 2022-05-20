import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SubjectsService } from '@core/services/subjects.service';
import { StorageConstants } from '@core/constants/storage.constants';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentTheme: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private subjectsService: SubjectsService) {
  }

  ngOnInit(): void {
    this.subjectsService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: string) => {
        this.currentTheme = theme;
      });
  }

  public onThemeChange(e: MatSlideToggleChange): void {
    const body = document.querySelector('body');
    if (e.checked) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      this.currentTheme = 'dark-theme';
      localStorage.setItem(StorageConstants.theme, 'dark-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      this.currentTheme = 'light-theme';
      localStorage.setItem(StorageConstants.theme, 'light-theme');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
