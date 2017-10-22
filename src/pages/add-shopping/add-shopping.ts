import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item.interface'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {
    this.shoppingItemRef$ = this.database.list('shopping-list');

    /* Shopping List
      shopping-list [
        {
          itemName: 'Pizza',
          itemNumber: 1
        },
        {
          itemName: 'CheeseCake',
          itemNumber: 2
        }
      ]
    */
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    this.shoppingItemRef$.push({
      itemName: shoppingItem.itemName,
      itemNumber: Number(shoppingItem.itemNumber)
    });

    this.shoppingItem = {} as ShoppingItem;

    this.navCtrl.pop();
  }

}
