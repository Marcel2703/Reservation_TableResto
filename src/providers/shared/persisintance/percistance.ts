import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable()
export class Persistance {
    ISCONNECTED : any;
    
    constructor(
      public persistenceService:PersistenceService

    ) {
        
    }

    setCurrentuser(usr){
        this.persistenceService.set('_user', usr, {type: StorageType.LOCAL});
        this.persistenceService.set(this.ISCONNECTED, true, {type: StorageType.LOCAL});
      }
  
      getCurrentUser(){
        return this.persistenceService.get('_user', StorageType.LOCAL);
      }
  
      isConnected()
      {
        return this.persistenceService.get(this.ISCONNECTED, StorageType.LOCAL);
      }
  
      // Logout
      remCurrentuser(){
        this.persistenceService.set(this.ISCONNECTED, false, {type: StorageType.LOCAL});
        return this.persistenceService.remove('_user', StorageType.LOCAL);
      }
  
}