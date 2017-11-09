import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';

import * as layout from '../actions/layout';
import * as rootReducer from '../../reducers';


const PRINT_MOBILE = 'print and (max-width: 600px)';
@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit, OnDestroy {
  private menus: any;
  private mode: string;
  private watcher: Subscription;
  private activeMediaQuery: string;

  private showSidenav: Observable<boolean>;
  private loggedIn: Observable<boolean>;

  constructor(private media: ObservableMedia, private store: Store<rootReducer.State>) { }

  ngOnInit() {
    // windows observer event
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.mode = 'over';
      } else {
        this.mode = 'side';
      }
    });

    const is_mobile = this.media.isActive('xs') || this.media.isActive('sm');
    if (is_mobile && !this.media.isActive(PRINT_MOBILE)) {
      this.mode = 'push';
    } else {
      this.mode = 'side';
    }

    this.menus = [
      { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
      { label: 'Customers', icon: 'people', link: '/customers' },
      { label: 'Segments', icon: 'label', link: '/segments' },
      { label: 'Orders', icon: 'receipt', link: '/orders' },
      { label: 'Categories', icon: 'bookmark', link: '/categories' },
    ];

    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav = this.store.select(rootReducer.getShowSidenav);
    // this.loggedIn = this.store.select(fromAuth.getLoggedIn);
  }
  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  toggleSidenav() {
    this.store.dispatch(new layout.ToggleSidenav());
  }
  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }
}
