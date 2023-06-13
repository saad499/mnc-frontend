import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptserviceService {
  private _vps: ViewportScroller;

  constructor() { }
  scrollFn(anchor: string): void{
  	this._vps.scrollToAnchor("Partenaires-internationaux")
}
}
