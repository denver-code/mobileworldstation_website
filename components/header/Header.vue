<template>

  <header class=" justify-between sticky inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
      <h1 class="title w-40 h-16"></h1>
    </nuxt-link>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Store</a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Contact</a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Services</a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">About Us</a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Кар'єра
        </a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <div class="flex items-center">
          <div class="mx-2">
            <div class="cursor-pointer" @click="showCheckoutModal">
              <span :class="[numProductsAdded > 0 ? 'p-2 bg-blue text-white' : '']">{{ numProductsAdded }}</span>
              <span class="icon">
                <i class="fa fa-shopping-cart"></i>
              </span>
            </div>
          </div>

          <div class="mx-2">
            <button v-if="!isUserLoggedIn" @click="onShowDropdown">
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
            </button>
            <button class="cursor-pointer" v-if="isUserLoggedIn" @click="onShowDropdown">
              Welcome {{ getUserName }}
            </button>
            <div v-if="showDropdown && isUserLoggedIn" class="dropdown w-52 h-28">
              <nuxt-link :to="{ name: 'user-wishlist' }" class="button text-center">
                <span class="text-lg">{{ wishlistLabel }}</span>
              </nuxt-link>
              <button @click="logout" class="button">
                <span class="text-lg">{{ logoutLabel }}</span>
              </button>
            </div>
            <div v-if="showDropdown && !isUserLoggedIn" class="dropdown">
              <button v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
                <span class="text-lg">{{ loginLabel }}</span>
                <i class="fa fa-sign-in"></i>
              </button>
              <button v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
                <span class="text-lg">{{ signupLabel }}</span>
                <i class="fa fa-user-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="lg:hidden" role="dialog" aria-modal="true">
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0 z-50"></div>
      <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>

              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>

              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>

              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log ins</a>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'VmHeader',

    data () {
      return {
        isCheckoutActive: false,
        showDropdown: false,
        logoutLabel: 'Log out',
			  loginLabel: 'Log in',
			  signupLabel: 'Sign up',
        wishlistLabel: 'Wishlist',
      }
    },

    computed: {
      numProductsAdded () {
        return this.$store.getters.productsAdded.length;
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
      getUserName () {
        let name = this.$store.getters.getUserName;

        if (name === '') {
          return 'user';
        } else {
          return name;
        }
      }
    },

    mounted() {
      window.addEventListener("blur", this.closeDropdown, true);
    },
    destroyed() {
      window.removeEventListener("blur", this.closeDropdown);
    },

    methods: {
      closeDropdown() {
        setTimeout(() => {
          this.showDropdown = false;
        }, 100);
      },
      showCheckoutModal () {
        this.$store.commit('showCheckoutModal', true);
      },
      showLoginModal () {
        this.$store.commit('showLoginModal', true);
      },
      showSignupModal () {
        this.$store.commit('showSignupModal', true);
      },
      onShowDropdown () {
        this.showDropdown = !this.showDropdown
      },
      logout () {
        this.$store.commit('isUserLoggedIn', false);
        this.$store.commit('isUserSignedUp', false);
        this.$store.commit('removeProductsFromFavourite');

        // redirect to homepage
        this.$router.push({ name: 'index' });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    background: url('../../static/logo.png') no-repeat;
    background-position: 50% 50%;
    background-size: 145px;
  }
  .dropdown {
    @apply absolute;
    @apply p-3;
    @apply bg-white;
    @apply right-0;
    @apply shadow-lg;
    @apply flex;
    @apply flex-col;
    @apply border-2;
    @apply border-grey_light;
  }

  .button {
    @apply w-full;
    @apply hover:bg-grey_light;
    @apply p-2;
  }
</style>

