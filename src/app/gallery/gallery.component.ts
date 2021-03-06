import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import {GalleryService} from './gallery.service';
import {GalleryItem} from './galleryitem';
import { HTTP_PROVIDERS } from '@angular/http';
import {CategoryPipe, OrderPipe} from './filter.pipe';
import {HomeService} from '../home/home.service';
import { Router } from '@angular/router';
import {CategoryItem} from '../category/categoryitem';


@Component({
  moduleId: module.id,
  selector: 'app-gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.css'],
  directives: [
    MD_CARD_DIRECTIVES, MD_PROGRESS_CIRCLE_DIRECTIVES
  ],
  providers: [GalleryService, HTTP_PROVIDERS],
  pipes: [CategoryPipe, OrderPipe]
})
export class GalleryComponent implements OnInit {
  @Input() galleryItem: GalleryItem[];
  @Input() selectedImage: GalleryItem;
  @Input() categoryId = 0;
  @Input() categoryName = "";
  @Output() imageSelect = new EventEmitter();
  @ViewChildren('filteredGallery') filteredItems;
  @Input() num_elements;
  loading = true;
  constructor(private router: Router, private galleryService: GalleryService, private homeService: HomeService) {
    this.homeService.getChangeEmitter().subscribe(item => this.onItemAdded(item));
    this.homeService.getCategoryEmitter().subscribe(item => this.onCategoryChanged(item));
  }
  ngAfterViewInit() {
    this.num_elements = this.filteredItems.toArray().length;
  }
  onItemAdded(item: GalleryItem) {
    this.galleryItem.push(item);
  }
  onCategoryChanged(item : CategoryItem){
    this.categoryId = item.id;
    this.categoryName = item.name;
  }
  showAll(){
    this.categoryId = 0;
    this.categoryName = "";
    this.homeService.deselect();
  }
  ngOnInit() {
    this.galleryService.getRecentImages().subscribe(
      data => this.onReceiveImages(data),
      err => {
        this.onError(err);
      }
    );
  }
  onError(data){
    // Log out a user if token has expired
    if(data.status == '401'){
        this.router.navigate(['']);
    }
  }
  onReceiveImages(images: any) {
    this.galleryItem = images;
    this.loading = false;
    this.homeService.addImages(images);
  }
  
  selectImage(image: GalleryItem) {
    this.selectedImage = image;
    this.homeService.triggerThumbnails(image);
    this.imageSelect.emit({
      value: image
    });
  }

}
