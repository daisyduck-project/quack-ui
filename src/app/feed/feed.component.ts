import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MomentsService } from '../common/moments.service';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [MaterialModule, DatePipe],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  isError = signal(false);
  errorMessage = signal("Testing Error");
  posts: any[] = [];

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
    this.momentService.retriveNextMoment(0,10).subscribe(posts => {
      this.posts = posts;
    });
  }
}
