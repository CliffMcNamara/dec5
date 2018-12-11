import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Player } from './player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const players = [
      { id: 0, name: 'Cliff', ba: 0.350, obp: 0.450, h: 22 },
      { id: 1, name: 'Joel', ba: 0.310, obp: 0.425, h: 20 },
      { id: 2, name: 'Matt', ba: 0.333, obp: 0.475, h: 21 },
      { id: 3, name: 'Trey', ba: 0.175, obp: 0.225, h: 13 }
    ];
    return {players};
  }

  genId(players: Player[]): number {
    return players.length > 0 ? Math.max(...players.map(player => player.id)) + 1 : 11;
  }

}
