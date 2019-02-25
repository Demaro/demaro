import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './core/auth.guard';

const appRoutes: Routes = [
   { path: '', component: HomeComponent},
   { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
   { path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuard] },



   // otherwise redirect to home
   { path: '**', redirectTo: '' },

];


@NgModule({
    // useHash supports github.io demo page, remove in your app
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
