export default Vue.component("food-list", {
  props: {
    horrorTheme: false,
  },
  data: function() {
    return {
      foodList: [
        { id: 0, name: "Dolina smieci", url:"https://www.dolina-noteci.pl" },
        { id: 1, name: "Jajko", url: null },
        { id: 2, name: "Ranczos", url: null },
      ],
      EXTRA_FOOD_ID_: "extra-food",
      text_: {
        ASK_FOR_EXTRA_FOOD: "Co tam wiecej je Julik?",
      },
    }
  },
  methods: {
    addFood: function() {
      const extraFoodName = prompt(this.text_.ASK_FOR_EXTRA_FOOD);
      if (!extraFoodName) {
        return;
      }

      this.foodList.push({ id: this.foodList.length, name: extraFoodName, url: null });
      this.addFoodToLocalStorage_(extraFoodName);
    },

    reseetFoodList: function() {
      localStorage.removeItem(this.EXTRA_FOOD_ID_);
    },

    addFoodToLocalStorage_: function(foodName) {
      const foodList = JSON.parse(localStorage.getItem(this.EXTRA_FOOD_ID_));
      foodList.push(foodName);
      localStorage.setItem(this.EXTRA_FOOD_ID_, JSON.stringify(foodList));
    },
  },
  created: function() {
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
});
