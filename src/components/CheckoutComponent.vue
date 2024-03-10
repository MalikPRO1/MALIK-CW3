<!-- eslint-disable -->
<template>
    <div id="cart" class="responsive-container">
          <h2 class="font-semibold text-xl uppercase tracking-wide block">
            Shopping Cart
          </h2>

          <div
            class="flex sm:flex-row sm:justify-between sm:space-x-8 sm:space-y-0 flex-col space-y-8 mt-4"
          >
            <div
              class="w-full md:w-1/2 lg:w-3/4 grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
              v-if="!!this.cart.length"
            >
              <div
                class="p-4 space-y-2 flex flex-col justify-between border-2 border-black rounded-xl"
                v-for="(item, index) in cart"
                :key="index"
              >
                <div class="flex justify-between space-x-6">
                  <div class="space-y-1">
                    <p><strong>Subject:</strong> {{ item.subject }}</p>
                    <p><strong>Location:</strong> {{ item.location }}</p>
                    <p><strong>Price:</strong> £{{ item.price }}</p>
                    <p><strong>Spaces:</strong> {{ item.spaces }}</p>
                  </div>

                  <img
                    :src="`https://cartvuebackend.eu-north-1.elasticbeanstalk.com/${item.image}`"
                    :alt="item.subject"
                    class="w-10 h-10"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    class="!mt-2 text-sm bg-primary p-1.5 rounded text-white transition duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    @click.prevent="$emit('remove', item._id)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div
              class="w-full md:w-1/2 lg:w-3/4 flex items-center justify-center"
              v-else
            >
              <div class="flex flex-col items-center justify-center space-y-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>

                <h6 class="font-semibold text-xl">No lessons in cart</h6>
              </div>
            </div>

            <div class="w-full md:w-1/2 lg:w-1/4">
              <form @submit.prevent="checkout" class="space-y-4">
                <div class="w-full">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="checkoutForm.name.value"
                    class="mt-1 block w-full p-2 rounded border-2 transition duration-200 focus:ring-offset-2 focus:ring-2 focus:outline-none"
                    :class="[!checkoutForm.name.error ? 'border-gray-500 focus:ring-primary' : 'border-red-500 focus:ring-red-500' ]"
                  />
                  <p
                    v-if="checkoutForm.name.error"
                    class="text-red-500 text-sm"
                  >
                    {{ checkoutForm.name.error }}
                  </p>
                </div>

                <div class="w-full">
                  <label for="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="checkoutForm.phone.value"
                    class="mt-1 block w-full p-2 rounded border-2 transition duration-200 focus:ring-offset-2 focus:ring-2 focus:outline-none"
                    :class="[!checkoutForm.phone.error ? 'border-gray-500 focus:ring-primary' : 'border-red-500 focus:ring-red-500' ]"
                  />
                  <p
                    v-if="checkoutForm.phone.error"
                    class="text-red-500 text-sm"
                  >
                    {{ checkoutForm.phone.error }}
                  </p>
                </div>

                <button
                  class="block w-full bg-primary p-2 rounded text-white font-semibold"
                  :class="{'opacity-50': !isCheckoutFormValid}"
                  :disabled="!isCheckoutFormValid"
                >
                  <div v-if="loading" class="flex h-5 w-5 m-auto relative">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                    ></span>
                    <span
                      class="inline-flex rounded-full h-5 w-5 bg-primary-dark"
                    ></span>
                  </div>

                  <span v-else>Checkout</span>
                </button>
              </form>
            </div>
          </div>
    </div>
</template>


<script>
export default {
  props: ['cart', 'checkoutForm', 'isCheckoutFormValid', 'loading', 'removeFromCart', 'checkout'],
}
</script>