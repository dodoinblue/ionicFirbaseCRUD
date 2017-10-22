import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private database: AngularFireDatabase,
              private actionSheetCtrl: ActionSheetController) {
    this.shoppingListRef$ = this.database.list('shopping-list');
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push('AddShoppingPage');
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    console.log("clicked");
    console.log(shoppingItem);

    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    }).present();
  }

}
