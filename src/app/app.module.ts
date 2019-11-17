import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostItemComponent } from './post-item/post-item.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import {RouterModule, Routes} from '@angular/router';
import {PostService} from './services/post.service';
import { HttpClientModule} from '@angular/common/http';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const postRoutes: Routes = [
  { path: 'new', component: NewPostComponent },
  { path: 'posts', component: PostListComponent},
  { path: '', component: PostListComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];
@NgModule({
  declarations: [
    AppComponent,
    PostItemComponent,
    PostListComponent,
    NewPostComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(postRoutes)
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
