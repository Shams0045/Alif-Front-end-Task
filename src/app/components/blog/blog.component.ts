import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../_services';
import {Blogs, Photos} from '../../_models/blog';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService,
              public modal: MatDialog) {
  }

  blogs: Blogs[] = [];
  pageSlice: Blogs[] = [];
  photos: Photos[] = [];
  photo: Photos | undefined;
  thumbnail = 1;
  body = 'test';
  blogId: Blogs | undefined;
  term = '';

  ngOnInit(): void {
    this.getAllBlogs();
  }
 
  onBlogChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.blogs.length) {
      endIndex = this.blogs.length;
    }
    this.pageSlice = this.blogs.slice(startIndex, endIndex);
  }

  getAllBlogs(): void {
    this.blogService.getBlogs()
      .subscribe(data => {
        this.blogs = data;
        this.getPhotos();
      });
  }

  getPhotos(): void {
    this.blogService.getPhotos()
      .subscribe(data => {
        this.photos = data;
        this.photo = this.photos.find((x: { id: number; }) => x.id === this.thumbnail);
        this.pageSlice = this.blogs.slice(0, 10);
      });
  }

  openModal(id: number): void {
    this.blogService.getBlogById(id)
      .subscribe(data => {
        this.blogId = data;
        this.modal.open(ModalComponent, {
          width: '400px',
          data: {name: this.blogId.body},
        });
      });
  }

}















