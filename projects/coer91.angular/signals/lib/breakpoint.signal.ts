import { signal } from '@angular/core'; 
import { Screen } from 'coer91.tools';

export const breakpointSIGNAL = signal<'mv' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(Screen.BREAKPOINT); 