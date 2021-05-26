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
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  get(keyName : string) {
    return this._storage?.get('name');
  }


}

