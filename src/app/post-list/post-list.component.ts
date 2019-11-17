import { Component,  OnInit, OnDestroy } from '@angular/core';
import { PostService} from '../services/post.service';
import { Subscription } from '../../../node_modules/rxjs';
@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  postList: any[];
  postSubscription: Subscription;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postSubscription = this.postService.postsSubject.subscribe(
      (postItems: any[]) => {
        this.postList = postItems;
      }
    );
    this.postService.emitPostsSubject();
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
