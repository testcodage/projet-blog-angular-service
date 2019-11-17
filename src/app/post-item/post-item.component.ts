import {Component, Input, OnInit} from '@angular/core';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @ Input() title: string ;
  @ Input()content: string;
  @ Input()loveIts: number;
  @ Input() date: Date;
  @Input() index: number;
  constructor(private postService: PostService) {
    this.loveIts = 0;
  }

  ngOnInit() {
  }


  getColor() {
    this.loveIts = this.postService.getLoveIt(this.index);
    if ( this.loveIts > 0) {
      return 'green';
    } else if (this.loveIts < 0) {
      return 'red';
    } else {
      return 'black';
    }
  }

  onLoveIt() {
    this.postService.loveIt(this.index) ; }

  onDoNotLoveIt() {
    this.postService.dontLoveIt(this.index); }

  onSuppress() {
    this.postService.suppressPost(this.index);
  }

}
