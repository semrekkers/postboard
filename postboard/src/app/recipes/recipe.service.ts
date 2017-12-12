import {ChangeDetectorRef, Injectable, Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {HttpClient} from '@angular/common/http';
import { apiEndpoint } from '../shared/data.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  public recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: HttpClient) {}

  getRecipes(): Promise<Recipe[]> {
    return this.http.get(apiEndpoint + '/recipes').toPromise().then(response => {
      this.recipes = response as Recipe[];
      return this.recipes;
    });
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    recipe.favorite = false;

    this.http.post(apiEndpoint + '/recipes', recipe).subscribe(data => {
      this.recipes.push(<Recipe>data);
      this.recipesChanged.next(this.recipes.slice());
    });
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    const old = this.recipes[index];

    this.recipes[index] = newRecipe;
    this.http.put(apiEndpoint + '/recipes/' + old._id, newRecipe).subscribe();

    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    const old = this.recipes[index];
    this.recipes.splice(index, 1);

    this.http.delete(apiEndpoint + '/recipes/' + old._id).subscribe();

    this.recipesChanged.next(this.recipes.slice());
  }

  addToFavorite(index: number) {
    const updatedItem = this.recipes[index];
    updatedItem.favorite = true;

    this.recipes[index] = updatedItem;

    this.http.put(apiEndpoint + '/recipes/' + updatedItem._id + '/favorite', {}).subscribe();
    this.recipesChanged.next(this.recipes.slice());
  }

  removeFromFavorite(index: number) {
    const old = this.recipes[index];
    old.favorite = false;

    this.recipes[index] = old;

    this.http.delete(apiEndpoint + '/recipes/' + old._id + '/favorite').subscribe()

    this.recipesChanged.next(this.recipes.slice());
  }

}
