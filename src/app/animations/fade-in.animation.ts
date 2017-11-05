﻿// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

// export const fadeInAnimation =
//     // trigger name for attaching this animation to an element using the [@triggerName] syntax
//     trigger('fadeInAnimation', [

//         // route 'enter' transition
//         transition(':enter', [

//             // css styles at start of transition
//             style({ opacity: 0 }),

//             // animation and styles at end of transition
//             animate('.3s', style({ opacity: 1 }))
//         ]),
//     ]);
export const routerTransition =
    trigger('routerTransition', [
        state('void', style({ position: 'fixed', width: '100%' })),
        state('*', style({ position: 'fixed', width: '100%' })),
        transition(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);

// export function routerTransition() {
//     return slideToLeft();
// }

// function slideToLeft() {
//     return trigger('routerTransition', [
//       state('void', style({position:'fixed', width:'100%'}) ),
//       state('*', style({position:'fixed', width:'100%'}) ),
//       transition(':enter', [
//         style({transform: 'translateX(100%)'}),
//         animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
//       ]),
//       transition(':leave', [
//         style({transform: 'translateX(0%)'}),
//         animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
//       ])
//     ]);
//   }