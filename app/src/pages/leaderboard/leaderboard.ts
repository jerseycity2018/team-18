import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { InnerSchoolLeaderboardPage } from "../inner-school-leaderboard/inner-school-leaderboard";
import { Connector } from '../../providers/connector/connector' 

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-leaderboard',
    templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

    title: any;
    yourSchool: any;
    colleges: any[];
    initialColleges: any[] = [];
    showSpinner = true;
    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private connector: Connector) {
        this.title = "Leaderboard";
        this.yourSchool = "Columbia University";
        this.connector.getLeaderboard().subscribe(
            data => {
                setTimeout(() => {
                    for(const key of Object.keys(data)) {
                        data[key]["rank"] = Number(key) + 1;
                        this.initialColleges.push(data[key]);
                    }
                    this.colleges = this.initialColleges.slice(0);
                    this.showSpinner = false;
                }, 1000);
            }
        );
    }

    openCollege(college) {
        const modal = this.modalCtrl.create(InnerSchoolLeaderboardPage, {"students": [{"rank": 1, "name": "John Smith", "score": "200"}, {"rank": 2, "name": "John Doe", "score": "150"}], "school": college});
        modal.present();
    }
    openYourCollege() {
        this.openCollege(this.yourSchool);
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad LeaderboardPage');
    }

    filterLeaderboard(event) {
        let substring = event.target.value;
        // console.log("Filter for:", substring);
        if(substring != "" && substring) {
            this.colleges = this.initialColleges.filter((item) => {
                return (item["name"].toLowerCase().indexOf(substring.toLowerCase()) > -1);
            })
        } else {
            this.colleges = this.initialColleges.slice(0);
        }
    }
}
