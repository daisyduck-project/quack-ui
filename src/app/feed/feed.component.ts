import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MomentsService } from '../common/moments.service';
import { MaterialModule } from '../material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [MaterialModule, DatePipe, InfiniteScrollModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  isError = signal(false);
  errorMessage = signal("Testing Error");
  posts: any[] = [];
  currentPage = 0;
  pageSize = 10;
  isLoading = false; // Flag to indicate loading

  constructor(private router: Router, private momentService: MomentsService){}

  redirectToAddMoment() {
    this.router.navigate(['/moment']);
  }
  redirectToDetail() {
    this.router.navigate(['/momentDetail']);
  }

  likeThisMoment(momentId: string){
    console.log(momentId);
  }
  
  ngOnInit(): void {
    this.getPosts(this.currentPage, this.pageSize);
  }

  getPosts(pageNumber: number, pageSize: number): void {
    this.isLoading = true;
    this.momentService.retriveNextMoment(pageNumber, pageSize)
      .subscribe(posts => {
        this.posts = this.posts.concat(posts); // Append new posts
        this.currentPage++;
        this.isLoading = false;
      });
  }

  loadMorePosts() {
    this.getPosts(this.currentPage, this.pageSize);
  }

}
