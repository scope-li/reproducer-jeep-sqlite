import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  CapacitorSQLitePlugin,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable()
export class SQLiteService {
  private _databaseName: string = 'dbForCopy';
  private _sqliteConnection!: SQLiteConnection;
  private _platform!: string;
  private _sqlitePlugin!: CapacitorSQLitePlugin;
  private _db!: SQLiteDBConnection;

  constructor() {
    this._platform = Capacitor.getPlatform();
    this._sqlitePlugin = CapacitorSQLite;
  }

  public async initialize(): Promise<void> {
    try {
      this._sqliteConnection = new SQLiteConnection(this._sqlitePlugin);

      if (this._platform === 'web') {
        await this.initWebStore();
      }

      await this.openConnection();

      if (this._platform === 'web') {
        await this.saveToStore();
      }
    } catch (error) {
      throw this.getError(error);
    }
  }

  public async copyFromAssets(overwrite: boolean = false): Promise<void> {
    try {
      await this._sqlitePlugin.copyFromAssets({ overwrite: overwrite });
    } catch (error) {
      throw this.getError(error);
    }
  }

  public async openConnection(): Promise<void> {
    try {
      const connectionsConsistency = (await this._sqliteConnection.checkConnectionsConsistency()).result;
      const isConnection = (await this._sqliteConnection.isConnection(this._databaseName, false)).result;

      if (connectionsConsistency && isConnection) {
        this._db = await this._sqliteConnection.retrieveConnection(this._databaseName, false);
      } else {
        this._db = await this._sqliteConnection.createConnection(this._databaseName, false, 'no-encryption', 1, false);
      }

      await this._db.open();
    } catch (error) {
      throw this.getError(error);
    }
  }

  private initWebStore(): Promise<void> {
    try {
      return this._sqliteConnection.initWebStore();
    } catch (error) {
      throw this.getError(error);
    }
  }

  private saveToStore(): Promise<void> {
    try {
      return this._sqliteConnection.saveToStore(this._databaseName);
    } catch (error) {
      throw this.getError(error);
    }
  }

  private getError(error: unknown): Error {
    const msg = `[SQLiteService] ${error}`;
    console.error(msg);

    return new Error(msg);
  }
}
