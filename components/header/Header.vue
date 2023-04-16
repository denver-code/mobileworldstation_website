<template>

  <header class=" justify-between sticky inset-x-0 top-0 z-50 bg-white">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
      <h1 class="title w-40 h-10"></h1>
    </nuxt-link>
      </div>

      <div class="lg:flex lg:gap-x-12 sm:gap-x-12 sm:flex">
        <a href="/store" class="text-sm font-semibold leading-6 text-gray-900">Store</a>
        <a href="/contact" class="text-sm font-semibold leading-6 text-gray-900">Contact</a>
        <a href="/about" class="text-sm font-semibold leading-6 text-gray-900">About Us</a>
      </div>
      <div class=" lg:flex lg:flex-1 lg:justify-end">
        <div class="flex items-center">
          <div class="mx-2">
            <NuxtLink to="/cart">
              <span :class="[numProductsAdded > 0 ? 'p-2 bg-blue text-white' : '']">{{ numProductsAdded }}</span>
              <span class="icon">
                <i class="fa fa-shopping-cart"></i>
              </span>
            </NuxtLink>
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

