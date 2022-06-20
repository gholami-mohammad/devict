import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { Word } from 'src/app/models/word';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ReviewService } from 'src/app/services/review.service';
import { Pagination } from '../pagination/pagination-model';

@Component({
  selector: 'app-review-index',
  templateUrl: './review-index.component.html',
  styleUrls: ['./review-index.component.scss']
})
export class ReviewIndexComponent implements OnInit {

  loading = true;
  pagination: Pagination<Word> = new Pagination();
  page = 1;
  showTranslations = false;
  lastIndex = 0;
  reviewingIndex = 0;

  get reviewing(): Word|undefined {
    if (!this.pagination.data || this.pagination.data.length == 0) {
      return new Word();
    }

    return this.pagination.data[this.reviewingIndex];
  }

  constructor(private reviewService: ReviewService, private errService: ErrorHandlerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.index(this.page);
  }

  index(page: number) {
    this.loading = true;
    return this.reviewService.index(page, 50).subscribe({
      next: res => {
        this.pagination = res;
        if (res.data.length > 0) {
          this.lastIndex = res.data.length - 1;
          this.reviewingIndex = 0;
        }
        this.loading = false;
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      },
    });
  }

  setReviewStatus(remembered: boolean) {
    if (!this.reviewing || !this.reviewing.id) {
      return;
    }

    this.loading = true;
    this.reviewService.save(this.reviewing.id, remembered).subscribe({
      next: res => {
        this.loading = false;
        this.showTranslations = false;
        this.next();
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      },
    });
  }

  next() {
    if (this.reviewingIndex == this.lastIndex) {
      // get a fresh index
      this.index(this.page);
      return;
    }

    this.reviewingIndex ++;
  }
}
