import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
  
export class StorageService {

  private _storage: Storage

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  // Create and expose methods that users of this service can
  // call, for example:
  set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async get(keyName: string) {
    if (!this._storage) {
      await this.init()
      return this._storage?.get(keyName);
    } else {
      return this._storage?.get(keyName);
    }
  }


}

