import { Post } from '../models/post.model';
import { Subject } from '../../../node_modules/rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostService {
  postsSubject = new Subject<any[]>();

  private  posts = [];

  emitPostsSubject() {
    this.postsSubject.next(this.posts.slice());
  }

  addNewPost(post: Post) {
    this.posts.push(post);
    this.savePostsToServer();
    this.emitPostsSubject();
  }

  suppressPost(index: number) {
    this.posts.splice(index, 1);
    this.savePostsToServer();
    this.emitPostsSubject();
  }

  loveIt(index: number) {
    this.posts[index].loveIts++;
    console.log(this.posts[index].title);
    console.log(`loveNumber: ${ this.posts[index].loveIts }`);
    this.emitPostsSubject();
  }

  getLoveIt(index: number)
  {
    return this.posts[index].loveIts;
  }
  dontLoveIt(index: number) {
    this.posts[index].loveIts--;
    console.log(this.posts[index].title);
    console.log(`loveNumber: ${ this.posts[index].loveIts }`);
    this.emitPostsSubject();
  }

  constructor(private httpClient: HttpClient) {
    this.getPostsFromServer();

  }

  savePostsToServer() {
    this.httpClient
      .put('https://dbangularbackend.firebaseio.com/posts.json', this.posts)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getPostsFromServer() {
    this.httpClient
      .get<any[]>('https://dbangularbackend.firebaseio.com/posts.json')
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPostsSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }


}
