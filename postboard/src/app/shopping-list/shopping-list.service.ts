import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndpoint } from '../shared/data.service';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[];

  constructor(private http: HttpClient) { }

  getIngredients(): Promise<Ingredient[]> {
    return this.http.get(apiEndpoint + '/shopping-list').toPromise().then(response => {
      this.ingredients = response as Ingredient[];
      return this.ingredients;
    });
    // return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);

    this.http.post(apiEndpoint + '/shopping-list', ingredient).subscribe();

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    console.log(ingredients);
    this.ingredients.push(...ingredients);

    console.log(ingredients);

    this.http.post(apiEndpoint + '/shopping-list', ingredients).subscribe();

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    const old = this.ingredients[index];

    delete newIngredient._id;

    this.ingredients[index] = newIngredient;

    this.http.put(apiEndpoint + '/shopping-list/' + old._id, newIngredient).subscribe();

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    const old = this.ingredients[index];
    this.ingredients.splice(index, 1);

    this.http.delete(apiEndpoint + '/shopping-list/' + old._id).subscribe();

    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
