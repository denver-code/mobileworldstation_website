<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Contact Us</h1>
      <p class="mt-2 text-lg text-gray-600">We'd love to hear from you!</p>
    </div>
    <div class="flex mt-8">
      <div class="w-1/2 pr-8">
        <h2 class="text-2xl font-bold mb-4">Feedback Form</h2>
        <form url="/api/send_email" method="post">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your name"
            >
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your email"
            >
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="message">
              Message
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Your message"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue hover:bg-blue_light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div class="w-1/2 pl-8">
        <h2 class="text-2xl font-bold mb-4">Contact Information</h2>
        <ul class="list-disc pl-4">
          <li class="mb-2">
            <p class="font-bold">Address:</p>
            <p>123 Main Street</p>
            <p>Anytown, England BN12 5FG</p>
          </li>
          <li class="mb-2">
            <p class="font-bold">Phone:</p>
            <p>(555) 555-5555</p>
          </li>
          <li>
            <p class="font-bold">Email:</p>
            <p>contact@mobileworldstation.com</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUsPage'
}
</script>

<style>
/* Add any custom styles here */
</style>
