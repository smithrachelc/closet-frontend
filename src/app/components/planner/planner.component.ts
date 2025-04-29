import { Component } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {
  outfits = [
    {
      name: 'Date Night',
      clothingItems: [
        {
          name: 'Red Dress',
          imageUrl: 'https://res.cloudinary.com/dckb27159/image/upload/v1745949195/closet-clothing/hayss11bqfd07cvg4zfj.jpg',
          category: 'Dresses'
        },
        {
          name: 'Black Heels',
          imageUrl: 'https://res.cloudinary.com/dckb27159/image/upload/v1745950055/closet-clothing/mehttgemkcjxlkxbr1yw.webp',
          category: 'Shoes'
        }
      ]
    }
  ];
}
