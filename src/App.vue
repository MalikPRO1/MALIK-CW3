<template>
  <div id="app">
      <header>
        <nav
          class="bg-white border-gray-200 dark:bg-gray-800 responsive-container"
        >
          <div
            class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
          >
            <a href="javascript:void(0)" class="flex items-center">
              <img
                src="https://ik.imagekit.io/fmxqscuev/icons8-lessons-64_pdvEMVgCW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666292631783"
                class="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span
                class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                >Coursework</span
              >
            </a>

            <button
              class="relative transition duration-200"
              :class="[cartLength <= 0 ? 'text-gray-500' : 'text-white']"
              :disabled="cartLength <= 0"
              @click.prevent="toggleCartDisplay"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span
                class="absolute -top-2 -right-2 w-4 h-4 flex justify-center items-center bg-primary text-white text-xs rounded-full"
                >{{ cartLength }}</span
              >
            </button>
          </div>
        </nav>
      </header>

      <main class="mt-4">
    <div
          v-if="!isCartDisplaying"
          id="lessons"
          class="responsive-container flex sm:flex-row sm:justify-between sm:space-x-8 sm:space-y-0 flex-col space-y-8"
        >
          <div class="sm:w-1/5 space-y-6">
            <div class="w-full">
              <input
                type="text"
                id="search"
                placeholder="Search lessons..."
                v-model="searchText"
                class="mt-1 block w-full p-2 rounded border-2 border-gray-500 focus:ring-primary transition duration-200 focus:ring-offset-2 focus:ring-2 focus:outline-none placeholder:font-semibold"
              />
            </div>

            <div class="space-y-4">
              <p class="text-base font-semibold tracking-wide">Filter by:</p>

              <div class="space-y-2">
                <div
                  v-for="(sortOption, index) in sortOptions"
                  :key="index"
                  class="flex items-center"
                >
                  <div>
                    <input
                      type="radio"
                      name="filter"
                      v-model="sortBy"
                      :value="sortOption"
                      :id="sortOption"
                      class="w-4 h-4 mr-3 checkbox appearance-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full focus:outline-none border border-gray-400 checked:border-4 checked:border-primary cursor-pointer"
                    />
                  </div>
                  <label
                    :for="sortOption"
                    class="capitalize cursor-pointer"
                    :class="{'text-primary': sortBy === sortOption}"
                    >{{ sortOption }}</label
                  >
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <p class="text-base font-semibold tracking-wide">Order by:</p>

              <div class="space-y-2">
                <div
                  v-for="(order, index) in orders"
                  :key="index"
                  class="flex items-center"
                >
                  <div>
                    <input
                      type="radio"
                      name="order"
                      v-model="orderBy"
                      :value="order.value"
                      :id="order.value"
                      class="w-4 h-4 mr-3 checkbox appearance-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full focus:outline-none border border-gray-400 checked:border-4 checked:border-primary cursor-pointer"
                    />
                  </div>
                  <label
                    :for="order.value"
                    class="capitalize cursor-pointer"
                    :class="{'text-primary': orderBy === order.value}"
                    >{{ order.text }}</label
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="w-full flex justify-center" v-if="loading">
            <iframe
              class="w-1/2"
              src="https://embed.lottiefiles.com/animation/99297"
              title="loading"
            ></iframe>
          </div>

          <div class="w-full flex justify-center" v-else-if="error">
            <iframe
              class="w-1/2"
              src="https://embed.lottiefiles.com/animation/95614"
              title="error"
            ></iframe>
          </div>

          <LessonsComponent :filteredLessons="filteredLessons" @add="addToCart" />

          <div class="w-full flex flex-col justify-center items-center" v-if="!loading && !error && !filteredLessons.length > 0">
            <iframe
              class="w-1/2"
              src="https://embed.lottiefiles.com/animation/93134"
              title="empty"
            ></iframe>
            <p class="text-lg">No lessons to show</p>
          </div>
        </div>
      <CheckoutComponent 
        v-else 
        :cart="cart"
        :checkoutForm="checkoutForm"
        :isCheckoutFormValid="isCheckoutFormValid"
        :loading="loading"
        @remove="removeFromCart"
        @checkout="checkout"
      />
      </main>

      <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="-translate-y-2"
        enter-to-class="translate-y-0"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from-class="translate-y-0"
        leave-to-class="-translate-y-2"
      >
        <div
          v-if="checkedOut"
          id="toast-success"
          class="flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-2 right-4"
          role="alert"
        >
          <div
            class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-primary bg-primary-100 rounded-lg dark:bg-primary-800 dark:text-primary-200"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ml-3 text-sm font-normal">Checked out successfully.</div>
          <button
            @click.prevent="checkedOut = false"
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </transition>
  </div>
</template>

<script>
import LessonsComponent from './components/LessonsComponent.vue'
import CheckoutComponent from './components/CheckoutComponent.vue'


export default {
  name: 'App',
  components: {
        LessonsComponent,
        CheckoutComponent
    },
   data() {
    return  {
    loading: false,
    error: null,
    url: "https://cartvuebackend.eu-north-1.elasticbeanstalk.com",
    searchText: "",
    sortBy: "subject",
    orderBy: "asc",
    sortOptions: ["subject", "location", "price", "availability"],
    orders: [
      {
        text: "Ascending",
        value: "asc",
      },
      {
        text: "Descending",
        value: "desc",
      },
    ],
    cart: [],
    isCartDisplaying: false,
    checkedOut: false,
    checkoutForm: {
      name: {
        value: "",
        error: "",
      },
      phone: {
        value: "",
        error: "",
      },
    },
    lessons: [],
  }
  },

  methods: {
    async getLessons() {
      try {
        this.loading = true;

        const url = `${this.url}/lessons/?search=${this.searchText}`;

        const response = await fetch(url);

        this.lessons = await response.json();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createNewOrder(order) {
      try {
        this.loading = true;

        const url = `${this.url}/orders`;

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        return await response.json(); 
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateLesson({ lesson_id, spaces }) {
      try {
        this.loading = true;

        const url = `${this.url}/lessons/${lesson_id}`;

        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            spaces: spaces,
          }),
        });
        return await response.json();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    updateLessonSpaces(type, _id) {
      switch (type) {
        case "decrease":
          this.lessons = this.lessons.map((item) => {
            if (item._id === _id && item.spaces > 0)
              return { ...item, spaces: --item.spaces };

            return item;
          });
          break;

        case "reset":
          this.lessons = this.lessons.map((item) => {
            if (item._id === _id) return { ...item, spaces: 5 };

            return item;
          });
          break;

        default:
          break;
      }
    },
    isItemInCart(_id) {
      return !!this.cart.find((item) => item._id === _id);
    },
    addToCart(_id) {
      const lesson = this.lessons.find((lesson) => lesson._id === _id);

      if (!this.isItemInCart(lesson._id)) {
        this.cart.push({
          ...lesson,
          spaces: 1,
        });
      } else {
        if (lesson.spaces > 0) {
          this.cart = this.cart.map((item) => {
            if (item._id === _id)
              return { ...item, spaces: ++item.spaces };
            return item;
          });
        }
      }

      this.updateLessonSpaces("decrease", lesson._id);
    },
    removeFromCart(_id) {
      // get index of cart item
      const index = this.cart.findIndex((item) => item._id === _id);

      // remove item from cart
      this.cart.splice(index, 1);

      // update lesson spaces
      this.updateLessonSpaces("reset", _id);

      // toggle cart display if no item is in cart
      if (!this.cart.length) this.toggleCartDisplay();
    },
    toggleCartDisplay() {
      this.isCartDisplaying = !this.isCartDisplaying;
    },
    checkout() {
      this.cart.forEach(async (item) => {
        await this.createNewOrder({
          name: this.checkoutForm.name.value,
          phone: this.checkoutForm.phone.value,
          lesson_id: item._id,
          spaces: item.spaces,
        });

        await this.updateLesson({
          lesson_id: item._id,
          spaces: item.spaces,
        });
      });

      this.checkedOut = true;

      this.toggleCartDisplay();

      this.cart = [];

      Object.keys(this.checkoutForm).every(
        (key) => (this.checkoutForm[key].value = "")
      );

      setTimeout(() => {
        this.checkedOut = false;
      }, 3000);
    },
  },

  computed: {
    cartLength() {
      if (this.cart.length > 0)
        return this.cart.reduce((total, item) => total + item.spaces, 0);
      return 0;
    },
    filteredLessons() {
      if (this.lessons.length <= 0) return [];

      const lessons = this.lessons;

      if (this.orderBy === "asc") {
        // ascending
        switch (this.sortBy) {
          case "subject":
            return lessons.sort((a, b) => {
              if (a.subject.toLowerCase() > b.subject.toLowerCase())
                return 1;
              if (a.subject.toLowerCase() < b.subject.toLowerCase())
                return -1;
              return 0;
            });
          case "location":
            return lessons.sort((a, b) => {
              if (a.location.toLowerCase() > b.location.toLowerCase())
                return 1;
              if (a.location.toLowerCase() < b.location.toLowerCase())
                return -1;
              return 0;
            });
          case "price":
            return lessons.sort((a, b) => {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
              return 0;
            });
          case "availability":
            return lessons.sort((a, b) => {
              if (a.spaces > b.spaces) return 1;
              if (a.spaces < b.spaces) return -1;
              return 0;
            });
        }
      } else if (this.orderBy === "desc") {
        // descending
        switch (this.sortBy) {
          case "subject":
            return lessons.sort((a, b) => {
              if (a.subject.toLowerCase() > b.subject.toLowerCase())
                return -1;
              if (a.subject.toLowerCase() < b.subject.toLowerCase())
                return 1;
              return 0;
            });
          case "location":
            return lessons.sort((a, b) => {
              if (a.location.toLowerCase() > b.location.toLowerCase())
                return -1;
              if (a.location.toLowerCase() < b.location.toLowerCase())
                return 1;
              return 0;
            });
          case "price":
            return lessons.sort((a, b) => {
              if (a.price > b.price) return -1;
              if (a.price < b.price) return 1;
              return 0;
            });
          case "availability":
            return lessons.sort((a, b) => {
              if (a.spaces > b.spaces) return -1;
              if (a.spaces < b.spaces) return 1;
              return 0;
            });
        }
      }
    return lessons;
    },
    isCheckoutFormValid() {
      return Object.keys(this.checkoutForm).every(
        (key) =>
          this.checkoutForm[key].value && !this.checkoutForm[key].error
      );
    },
  },

  created() {
    this.getLessons();
    if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("service-worker.js");
        }
  },

  watch: {
    searchText: {
      handler() {
        this.getLessons();
      },
    },
    "checkoutForm.name": {
      handler(val) {
        const validationRegex = /^[A-Za-z\s]*$/;

        if (!val.value) val.error = "Please enter your name";
        else if (!validationRegex.test(val.value))
          val.error = "Your name must only contain letters";
        else val.error = "";
      },
      deep: true,
    },

    "checkoutForm.phone": {
      handler(val) {
        const validationRegex = /^((\+44)|(0)) ?\d{4} ?\d{6}$/;

        if (!val.value) val.error = "Please enter your phone number";
        else if (!validationRegex.test(val.value))
          val.error = "Please enter a valid UK phone number";
        else val.error = "";
      },
      deep: true,
    },
  },
}
</script>

