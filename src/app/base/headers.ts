import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Cache-Control', 'no-cache');
contentHeaders.append('Content-Type', 'application/json');
