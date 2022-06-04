import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DatabaseBackupIndexComponent } from './components/database-backup-index/database-backup-index.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReviewIndexComponent } from './components/review-index/review-index.component';
import { WordIndexComponent } from './components/word-index/word-index.component';
import { GaurdService } from './services/gaurd.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivateChild: [GaurdService],
    children: [
      { path: 'home', component: HomeComponent },
      {path: 'words', component: WordIndexComponent},
      {path: 'review', component: ReviewIndexComponent},
      {path: 'database-backups', component: DatabaseBackupIndexComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
