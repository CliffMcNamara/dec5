import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Player } from './player';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/jason' })
  };

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl = 'api/players';

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
         catchError(this.handleError('getPlayers', []))
      );
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      tap(_ => this.log(`fetched player id=${id}`)),
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  updatePlayer (player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>(`updatePlayer`))
    );
  }

  addPlayer (player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, httpOptions).pipe(
      tap((player: Player) => this.log(`added player w/ id=${player.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  deletePlayer (player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }

  searchPlayers(term: string): Observable<Player[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Player[]>(`${this.playersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found players matching "${term}"`)),
      catchError(this.handleError<Player[]>('searchPlayers', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);

    };
  }

}
