
<template>
    
          <div
            class="sm:w-4/5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            v-if="filteredLessons.length > 0"
          >
            <div
              class="p-4 space-y-2 flex flex-col justify-between border-2 border-black rounded-xl"
              v-for="(lesson, index) in filteredLessons"
              :key="index"
            >
              <div class="flex justify-between space-x-6">
                <div class="space-y-1">
                  <p><strong>Subject:</strong> {{ lesson.subject }}</p>
                  <p><strong>Location:</strong> {{ lesson.location }}</p>
                  <p><strong>Price:</strong> £{{ lesson.price }}</p>
                  <p><strong>Spaces:</strong> {{ lesson.spaces }}</p>
                </div>

                <img
                  :src="`https://cartvuebackend.eu-north-1.elasticbeanstalk.com/${lesson.image}`"
                  :alt="lesson.subject"
                  class="w-10 h-10"
                />
              </div>

              <div class="flex justify-end">
                <button
                  class="!mt-2 text-sm bg-primary p-1.5 rounded text-white transition duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                  :disabled="lesson.spaces <= 0"
                  v-on:click.prevent="$emit('add', lesson._id)"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

</template>


<script>
export default {
  props: ['filteredLessons', 'addToCart'],
}
</script>