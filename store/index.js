export const state = () => ({
  // List with all products of the website
  // If future when website will start becoming large you can link fetching from external backend to decrease load on server
  products: [
    {
      id: 1, 
      // ID of a product 
      title: "Samsung Galaxy S23 Ultra - 256GB SpaceBlack", 
      // Title of a product 
      description: "Get the ultimate Galaxy experience with the S23 Ultra. The latest generation of mobile processing power",
      // Description of a product, on store page cart will be displayed only small part.
      price: 1250, 
      // price of a product 
      ratings: 4.6,
      // Rating of a product
      reviews: 2412,
      // Rewiews of a produt
      isAddedToCart: false,
      // Each user have own cart and field which going to make sure that user have this item in a cart
      isAddedBtn: false,
      // If item in a cart - we have another field to controll state of our Add/Remove cart button
      isFavourite: false,
      // User can add product to wishlist by making item favoutire
      quantity: 1,
      // Quantity of a product in user cart
      pictureURL: "https://images.samsung.com/uk/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-highlights-design-end-s.jpg"
      // Picture of a product

    },
    {
      id: 2,
      title: "iPhone 14 Pro Max - 1TB GreyScale",
      description: "iPhone 14 Pro and iPhone 14 Pro Max feature a beautiful surgical-grade stainless steel and textured...",
      price: 1100,
      ratings: 5,
      reviews: 2404,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1,
      pictureURL: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.xlarge_2x.jpg"
    },
    {
      id: 3,
      title: "Xiaomi Mi 12 PRO - 256GB",
      description: "Xiaomi 12 Pro comes with a pro-grade 50MP triple camera array, WQHD+ dynamic 120Hz display...",
      price: 450,
      ratings: 5,
      reviews: 450,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1,
      pictureURL: "https://cdn.dxomark.com/wp-content/uploads/medias/post-145957/Xiaomi-Redmi-Note-12-Pro-5G-Plain_featured-image-packshot-review-1024x691.jpg"
    },
  ],
  // Local session user information
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: "",
    productTitleSearched: ""
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false
  }
})

// List of functions which used for getting all parameters of each product
export const getters = {
  // Get current state of product are added to cart
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  // Get current state of product are favourite
  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  // Return product by productID
  getProductById: state => id => {
    return state.products.find(product => product.id == id);
  },
  // Get current user authorisation status
  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  // Get user registration status
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  // Get user name
  getUserName: state => {
    return state.userInfo.name;
  },
  // Modal Authorisation screen state
  isLoginModalOpen: state => {
    return state.systemInfo.openLoginModal;
  },
  // Modal Registration screen state
  isSignupModalOpen: state => {
    return state.systemInfo.openSignupModal;
  },
  // Legacy
  isCheckoutModalOpen: state => {
    return state.systemInfo.openCheckoutModal;
  },
  // Quantity of selected product
  quantity: state => {
    return state.products.quantity;
  }
}

// List of functions which used to changing state data about products and users
export const mutations = {
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show;
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  SET_USER(state, authUser) {
    state.authUser = authUser
  }
}
