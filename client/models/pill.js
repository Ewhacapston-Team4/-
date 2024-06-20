class Pill {
  constructor(
    id, //ATC코드
    //categoryIds,
    name,
    summary,
    //affordability,
    //complexity,
    imageUrl,
    //duration,
    //ingredients,
    //steps
    //isGlutenFree,
    //isVegan,
    //isVegetarian,
    //isLactoseFree
    morning,
    lunch,
    evening
  ) {
    this.id = id;
    //this.categoryIds = categoryIds;
    this.name = name;
    this.summary = summary;
    this.imageUrl = imageUrl;
    this.morning = morning;
    this.lunch = lunch;
    this.evening = evening;
    //this.ingredients = ingredients;
    //this.steps = steps;
    //this.duration = duration;
    //this.complexity = complexity;
    //this.affordability = affordability;
    //this.isGlutenFree = isGlutenFree;
    //this.isVegan = isVegan;
    //this.isVegetarian = isVegetarian;
    //this.isLactoseFree = isLactoseFree;
  }
}

export default Pill;
