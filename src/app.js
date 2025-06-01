const { createApp } = Vue;

createApp({
  data() {
    return {
      lessons: [],
      cart: [],
      showCart: false,
      sortKey: 'subject',
      sortOrder: 'asc',
      name: '',
      phone: '',
      orderSubmitted: false
    };
  },
  computed: {
    sortedLessons() {
      return this.lessons.slice().sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        if (this.sortOrder === 'asc') return valA > valB ? 1 : -1;
        else return valA < valB ? 1 : -1;
      });
    },
    validName() {
      return /^[a-zA-Z\s]+$/.test(this.name);
    },
    validPhone() {
      return /^[0-9]+$/.test(this.phone);
    }
  },
  methods: {
    fetchLessons() {
      fetch('lessons.json')
        .then(res => res.json())
        .then(data => {
          this.lessons = data;
        });
    },
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        lesson.spaces--;
        this.cart.push({ ...lesson });
      }
    },
    removeFromCart(index) {
      const item = this.cart.splice(index, 1)[0];
      const original = this.lessons.find(l => l.id === item.id);
      original.spaces++;
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    checkout() {
      if (this.validName && this.validPhone) {
        this.orderSubmitted = true;
        this.cart = [];
        this.name = '';
        this.phone = '';
      }
    }
  },
  mounted() {
    this.fetchLessons();
  }
}).mount('#app');
