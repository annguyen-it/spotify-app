import { Component, OnInit } from '@angular/core';
import { PersonalizedRecommendationsService } from '@services/personalized-recommendations.service';

@Component({
  selector: 'spotify-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private personalizedRecommendationsService: PersonalizedRecommendationsService
  ) { }

  ngOnInit(): void {
    // this.personalizedRecommendationsService.getRecommendations()
    //   .subscribe(e => {
    //     console.log(e);
    //   });
  }
}
