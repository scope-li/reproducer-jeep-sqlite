import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {Capacitor} from "@capacitor/core";
import {CapacitorSQLite, SQLiteConnection} from "@capacitor-community/sqlite";
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';

const initializeApplication = () => bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

const initializeSqlite = (initializeApplication: () => void) => {
  window.addEventListener('DOMContentLoaded', async () => {
    const platform = Capacitor.getPlatform();
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    try {
      if (platform === 'web') {
        jeepSqlite(window);
        const jeepEl = document.createElement('jeep-sqlite');
        document.body.appendChild(jeepEl);
        jeepEl.autoSave = true;
        await customElements.whenDefined('jeep-sqlite');
        await sqlite.initWebStore();
      }
      await sqlite.checkConnectionsConsistency();

      initializeApplication();
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  });
};

initializeSqlite(initializeApplication);
