import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  players: Player[] = [];
 
  constructor(private playerService: PlayerService) { }
 
  ngOnInit() {
    this.getPlayers();
  }
 
  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => this.players = players.slice(0, 4));
  }
}
