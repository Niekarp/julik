import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class FoodList extends Vue {
  @Prop()
  horrorTheme = false;

  foodList = [
    { id: 0, name: "Dolina smieci", url:"https://www.dolina-noteci.pl" },
    { id: 1, name: "Jajko", url: null },
    { id: 2, name: "Ranczos", url: null },
  ];

  EXTRA_FOOD_ID_ = "extra-food";

  text_ = {
    ASK_FOR_EXTRA_FOOD: "Co tam wiecej je Julik?",
  };
   
  created() {
    // TODO: pritify it
    const savedFood = localStorage.getItem(this.EXTRA_FOOD_ID_);

    if (!savedFood) {
      localStorage.setItem(this.EXTRA_FOOD_ID_, JSON.stringify(new Array()));
    } else {
      for(const food of JSON.parse(savedFood)) {
        this.foodList.push({ id: this.foodList.length, name: food, url: null });
      }
    }
  }

  addFood() {
    const extraFoodName = prompt(this.text_.ASK_FOR_EXTRA_FOOD);
    if (!extraFoodName) {
      return;
    }

    if (extraFoodName === "mew") {
      this.$emit("mew");
      return;
    }

    this.foodList.push({ id: this.foodList.length, name: extraFoodName, url: null });
    this.addFoodToLocalStorage_(extraFoodName);
  }

  reseetFoodList() {
    localStorage.removeItem(this.EXTRA_FOOD_ID_);
  }

  addFoodToLocalStorage_(foodName: string) {
    const foodList = JSON.parse(localStorage.getItem(this.EXTRA_FOOD_ID_) as any);
    foodList.push(foodName);
    localStorage.setItem(this.EXTRA_FOOD_ID_, JSON.stringify(foodList));
  }
}
