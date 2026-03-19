/* ============================================
   IGötNag – JavaScript
   Not Another Greeting Card
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ================================================
  // HERO SLIDER
  // ================================================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startSlider() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }
  function resetSlider() {
    clearInterval(sliderInterval);
    startSlider();
  }

  document.getElementById('slider-next')?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSlider(); });
  document.getElementById('slider-prev')?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSlider(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetSlider(); }));

  startSlider();

  // ================================================
  // STICKY HEADER SCROLL EFFECT
  // ================================================
  const header = document.getElementById('site-header');
  const backToTop = document.getElementById('back-to-top');
  const quickShopBtn = document.getElementById('quick-shop-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
      backToTop?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      backToTop?.classList.remove('visible');
    }
    // Show quick shop button after scrolling past hero (~400px)
    if (window.scrollY > 400) {
      quickShopBtn?.classList.add('visible');
    } else {
      quickShopBtn?.classList.remove('visible');
    }
  }, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ================================================
  // MOBILE MENU
  // ================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  menuToggle?.addEventListener('click', () => mobileNav?.classList.toggle('open'));
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

  // ================================================
  // PREDICTIVE SEARCH
  // ================================================
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  const products = [
    { name: 'Personalised Birthday Mug', cat: 'Mugs', emoji: '☕', url: 'pages/shop.html?cat=mugs' },
    { name: 'Funny Birthday T-Shirt', cat: 'T-Shirts', emoji: '👕', url: 'pages/shop.html?cat=tshirts' },
    { name: 'Custom Photo Cushion', cat: 'Cushions', emoji: '🛋️', url: 'pages/shop.html?cat=cushions' },
    { name: 'Personalised Keyring', cat: 'Keyrings', emoji: '🔑', url: 'pages/shop.html?cat=keyrings' },
    { name: 'Anniversary Gifts', cat: 'Occasions', emoji: '💕', url: 'pages/shop.html?occasion=anniversary' },
    { name: 'Mother\'s Day Gifts', cat: 'Occasions', emoji: '💐', url: 'pages/shop.html?occasion=mothers-day' },
    { name: 'Father\'s Day Gifts', cat: 'Occasions', emoji: '👨', url: 'pages/shop.html?occasion=fathers-day' },
    { name: 'Valentine\'s Day Gifts', cat: 'Occasions', emoji: '❤️', url: 'pages/shop.html?occasion=valentines' },
    { name: 'Birthday Gifts', cat: 'Occasions', emoji: '🎂', url: 'pages/shop.html?occasion=birthday' },
    { name: 'Christmas Gifts', cat: 'Occasions', emoji: '🎄', url: 'pages/shop.html?occasion=christmas' },
    { name: 'Wedding Gifts', cat: 'Occasions', emoji: '💍', url: 'pages/shop.html?occasion=wedding' },
    { name: 'Graduation Gifts', cat: 'Occasions', emoji: '🎓', url: 'pages/shop.html?occasion=graduation' },
    { name: 'Personalised Sunglasses', cat: 'Accessories', emoji: '🕶️', url: 'pages/shop.html?cat=accessories' },
    { name: 'Custom Cap', cat: 'Caps', emoji: '🧢', url: 'pages/shop.html?cat=caps' },
    { name: 'Personalised Scarf', cat: 'Scarves', emoji: '🧣', url: 'pages/shop.html?cat=scarves' },
    { name: 'Balloon Bouquet', cat: 'Balloons', emoji: '🎈', url: 'pages/shop.html?cat=balloons' },
    { name: 'Dog Gifts', cat: 'Pets', emoji: '🐕', url: 'pages/shop.html?cat=pets' },
    { name: 'Cat Gifts', cat: 'Pets', emoji: '🐈', url: 'pages/shop.html?cat=pets' },
    { name: 'Pet Personalised Mugs', cat: 'Pets', emoji: '🐶', url: 'pages/shop.html?cat=pets' },
  ];

  function showSuggestions(query) {
    if (!query || query.length < 2) { searchSuggestions.classList.remove('show'); return; }
    const matches = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.cat.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    if (!matches.length) { searchSuggestions.classList.remove('show'); return; }
    searchSuggestions.innerHTML = matches.map(p =>
      `<a class="suggestion-item" href="${p.url}"><span>${p.emoji}</span><span><strong>${p.name}</strong> <small style="color:var(--text-muted)">${p.cat}</small></span></a>`
    ).join('');
    searchSuggestions.classList.add('show');
  }

  searchInput?.addEventListener('input', e => showSuggestions(e.target.value));
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) searchSuggestions?.classList.remove('show');
  });
  document.getElementById('search-btn')?.addEventListener('click', () => {
    const q = searchInput?.value;
    if (q) window.location.href = `pages/shop.html?search=${encodeURIComponent(q)}`;
  });
  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('search-btn').click();
  });

  // ================================================
  // OCCASION CAROUSEL
  // ================================================
  const carousel = document.getElementById('occasion-carousel');
  document.getElementById('occ-next')?.addEventListener('click', () => carousel.scrollBy({ left: 240, behavior: 'smooth' }));
  document.getElementById('occ-prev')?.addEventListener('click', () => carousel.scrollBy({ left: -240, behavior: 'smooth' }));

  // ================================================
  // CART
  // ================================================
  let cart = JSON.parse(localStorage.getItem('igotnag_cart') || '[]');
  const cartCount = document.getElementById('cart-count');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');

  function updateCartCount() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    if (cartCount) cartCount.textContent = total;
  }

  function openCart() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  document.getElementById('cart-btn')?.addEventListener('click', e => { e.preventDefault(); openCart(); });
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  updateCartCount();

  // ================================================
  // WISHLIST HEARTS
  // ================================================
  document.querySelectorAll('.btn-heart').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      this.textContent = this.classList.contains('active') ? '♥' : '♡';
    });
  });

  // ================================================
  // TODAY'S SPECIAL DAYS
  // ================================================
  const specialDays = {
    1: {
      1: { name: "New Year's Day 🥂", desc: "Kick off the year with a gift they'll love!", shop: "#occasions" },
      14: { name: "National Squirrel Appreciation Day 🐿️", desc: "Yes, it's a real thing! Go nuts with a fun gift." , shop: "#categories" },
    },
    2: {
      14: { name: "Valentine's Day ❤️", desc: "Show your love with a gift better than a card!", shop: "pages/shop.html?occasion=valentines" },
    },
    3: {
      1: { name: "Peanut Butter Day 🥜", desc: "For the nuttiest person you know!", shop: "#categories" },
      2: { name: "Read a Book Day 📚", desc: "Perfect for the bookworms!", shop: "#categories" },
      3: { name: "World Wildlife Day 🦁", desc: "Celebrate the wild! Gift something animal-themed.", shop: "#categories" },
      4: { name: "Grammar Day 📝", desc: "For those who know their 'your' from 'you're'.", shop: "#categories" },
      5: { name: "Cheese Doodle Day 🧀", desc: "Cheesy gifts for cheesy people!", shop: "#categories" },
      6: { name: "Oreo Day 🍪", desc: "Sweet treats and even sweeter gifts.", shop: "#categories" },
      7: { name: "Cereal Day 🥣", desc: "Start the day right with a fun gift.", shop: "#categories" },
      8: { name: "International Women's Day 👩", desc: "Celebrate the amazing women in your life!", shop: "#occasions" },
      9: { name: "Meatball Day 🍝", desc: "A tasty day for a tasty gift!", shop: "#categories" },
      10: { name: "Mario Day 🍄", desc: "It's a-me, Mario! Let's-a-go gift shopping!", shop: "#categories" },
      11: { name: "Worship Tools Day 🔨", desc: "For the handy people in your life.", shop: "#categories" },
      12: { name: "Plant a Flower Day 🌻", desc: "Gift something that grows with them.", shop: "#categories" },
      13: { name: "Jewel Day 💎", desc: "Sparkle more with a special gift.", shop: "#categories" },
      14: { name: "Pi Day 🥧", desc: "3.14 reasons why you need a gift today!", shop: "#categories" },
      15: { name: "Everything You Think is Wrong Day ❓", desc: "Everything is right when you give a gift!", shop: "#categories" },
      16: { name: "Panda Day 🐼", desc: "Cute, cuddly, and perfect for a gift.", shop: "#categories" },
      17: { name: "St. Patrick's Day 🍀", desc: "Lucky them! Find a fun Irish-themed gift.", shop: "#categories" },
      18: { name: "Biodiesel Day 🚜", desc: "Running on love and unique gifts!", shop: "#categories" },
      19: { name: "Poultry Day 🍗", desc: "Don't be a chicken – get that gift!", shop: "#categories" },
      20: { name: "World Happiness Day 😊", desc: "Make someone's day with a surprise gift!", shop: "#categories" },
      21: { name: "World Poetry Day ✍️", desc: "A gift is worth a thousand poems.", shop: "#categories" },
      22: { name: "World Water Day 💧", desc: "Celebrate life's essentials with a gift.", shop: "#categories" },
      23: { name: "National Puppy Day 🐶", desc: "Gifts for your best (furry) friend!", shop: "#categories" },
      24: { name: "Chocolate Covered Raisin Day 🍇", desc: "Sweet, classic, and giftable!", shop: "#categories" },
      25: { name: "Waffle Day 🧇", desc: "Crispy, sweet, and better with a gift.", shop: "#categories" },
      26: { name: "Spinach Day 🍃", desc: "Strong gifts for strong people!", shop: "#categories" },
      27: { name: "World Theatre Day 🎭", desc: "A gift that deserves a standing ovation.", shop: "#categories" },
      28: { name: "Weed Day 🌿", desc: "For the plant lovers and gardeners.", shop: "#categories" },
      29: { name: "Piano Day 🎹", desc: "Hit the right note with a perfect gift.", shop: "#categories" },
      30: { name: "Doctors' Day 👨‍⚕️", desc: "Celebrate those who care for us.", shop: "#categories" },
      31: { name: "World Backup Day 💾", desc: "Back up your love with a physical gift!", shop: "#categories" },
    },
    4: {
      1: { name: "April Fools' Day 😂", desc: "Gift them a prank or something funny!", shop: "pages/shop.html?occasion=funny-gifts" },
      22: { name: "Earth Day 🌍", desc: "Celebrate our planet with an eco-friendly gift.", shop: "#occasions" },
    },
    5: {
      1: { name: "May Day 🌸", desc: "Spring is here – celebrate with a beautiful gift!", shop: "#occasions" },
    },
    6: {
      21: { name: "World Music Day 🎵", desc: "Gift something special to the music lover in your life!", shop: "#categories" },
    },
    7: {
      4: { name: "Independence Day 🎆", desc: "Celebrate freedom with a unique gift!", shop: "#occasions" },
    },
    8: {
      26: { name: "National Dog Day 🐕", desc: "Don't forget the pupper! Gift something for your dog.", shop: "#categories" },
    },
    9: {
      29: { name: "World Heart Day ❤️‍🔥", desc: "Show love to someone special today!", shop: "pages/shop.html?occasion=anniversary" },
    },
    10: {
      31: { name: "Halloween 🎃", desc: "Spooky gifts? Yes please!", shop: "pages/shop.html?occasion=halloween" },
    },
    11: {
      5: { name: "Bonfire Night 🎇", desc: "Celebrate with a bang – and a brilliant gift!", shop: "#categories" },
      11: { name: "Remembrance Day 🌹", desc: "A day of reflection – share love with a thoughtful gift.", shop: "#occasions" },
    },
    12: {
      25: { name: "Christmas Day 🎄", desc: "The biggest gifting day of the year!", shop: "pages/shop.html?occasion=christmas" },
      31: { name: "New Year's Eve 🥂", desc: "End the year with a memorable gift!", shop: "#occasions" },
    },
  };

  const monthSpecialDays = {
    1: ["01: New Year's Day 🥂", "02: World Introvert Day 🔇", "03: Fruitcake Toss Day 🎂", "07: Bobblehead Day 🎭", "08: World Typing Day ⌨️", "09: Word Nerd Day 📚", "10: Houseplant Appreciation Day 🌿", "12: Pizza Day 🍕", "15: Martin Luther King Jr. Day ✊", "17: World Snow Day ❄️", "25: Burns Night 🏴󠁧󠁢󠁳󠁣󠁴󠁿"],
    2: ["02: Groundhog Day 🐹", "04: World Cancer Day 🎗️", "07: Rose Day 🌹", "11: Safer Internet Day 💻", "14: Valentine's Day ❤️", "17: Random Acts of Kindness Day 💝", "20: World Day of Social Justice ⚖️"],
    3: [
      "01: Peanut Butter Day 🥜", "02: Read Book Day 📚", "03: Wildlife Day 🦁", "04: Grammar Day 📝",
      "05: Cheese Doodle Day 🧀", "06: Oreo Day 🍪", "07: Cereal Day 🥣", "08: Womens Day 👩",
      "09: Meatball Day 🍝", "10: Mario Day 🍄", "11: Worship Tools Day 🔨", "12: Plant Flower Day 🌻",
      "13: Jewel Day 💎", "14: Pi Day 🥧", "15: Everything You Think is Wrong ❓", "16: Panda Day 🐼",
      "17: St Patrick's Day 🍀", "18: Biodiesel Day 🚜", "19: Poultry Day 🍗", "20: Happiness Day 😊",
      "21: Poetry Day ✍️", "22: Water Day 💧", "23: Puppy Day 🐶", "24: Chocolate Raisin Day 🍇",
      "25: Waffle Day 🧇", "26: Spinach Day 🍃", "27: Theatre Day 🎭", "28: Weed Day 🌿",
      "29: Piano Day 🎹", "30: Doctors Day 👨‍⚕️", "31: Backup Day 💾"
    ],
    4: ["01: April Fools' Day 😂", "07: World Health Day 💊", "22: Earth Day 🌍", "23: World Book Day 📖"],
    5: ["01: May Day 🌸", "04: Star Wars Day ⭐", "13: World Cocktail Day 🍸", "15: International Day of Families 👨‍👩‍👧", "18: Museum Day 🎨", "31: World No-Tobacco Day 🚭"],
    6: ["01: Global Day of Parents 👪", "04: National Cheese Day 🧀", "08: World Oceans Day 🌊", "15: Nature Photography Day 📸", "21: World Music Day 🎵"],
    7: ["01: International Joke Day 😂", "11: World Population Day 🌍", "17: World Emoji Day 😎", "30: International Friendship Day 👫"],
    8: ["06: Friendship Day 💛", "12: World Elephant Day 🐘", "19: World Photography Day 📷", "26: National Dog Day 🐕", "31: Eat Outside Day 🌳"],
    9: ["05: International Day of Charity 💰", "11: Patriot Day 🇺🇸", "21: World Alzheimer's Day 🧠", "29: World Heart Day ❤️"],
    10: ["01: World Vegetarian Day 🥦", "04: World Animal Day 🐾", "10: World Mental Health Day 🧠", "16: World Food Day 🍽️", "31: Halloween 🎃"],
    11: ["05: Bonfire Night 🎇", "11: Remembrance Day 🌹", "13: World Kindness Day💞", "19: International Men's Day 👨", "25: International Day for Elimination of Violence"],
    12: ["01: World AIDS Day 🎗️", "10: Human Rights Day ✊", "21: Winter Solstice ❄️", "25: Christmas Day 🎄", "26: Boxing Day 🎁", "31: New Year's Eve 🥂"],
  };

  const notableByMonth = {
    1: [["Elvis Presley", "8 Jan 1935"], ["JRR Tolkien", "3 Jan 1892"], ["Martin Luther King Jr.", "15 Jan 1929"], ["Virginia Woolf", "25 Jan 1882"]],
    2: [["Charles Darwin", "12 Feb 1809"], ["Galileo", "15 Feb 1564"], ["Rosa Parks", "4 Feb 1913"], ["Bob Marley", "6 Feb 1945"]],
    3: [["Albert Einstein", "14 Mar 1879"], ["Michelangelo", "6 Mar 1475"], ["Lady Gaga", "28 Mar 1986"], ["Justin Bieber", "1 Mar 1994"]],
    4: [["Leonardo da Vinci", "15 Apr 1452"], ["Shakespeare", "23 Apr 1564"], ["Queen Elizabeth II", "21 Apr 1926"], ["Emma Watson", "15 Apr 1990"]],
    5: [["Adele", "5 May 1988"], ["Cate Blanchett", "14 May 1969"], ["Bob Dylan", "24 May 1941"], ["Dwayne Johnson", "2 May 1972"]],
    6: [["Paul McCartney", "18 Jun 1942"], ["Marilyn Monroe", "1 Jun 1926"], ["Lionel Messi", "24 Jun 1987"], ["Anne Frank", "12 Jun 1929"]],
    7: [["Nelson Mandela", "18 Jul 1918"], ["Malala Yousafzai", "12 Jul 1997"], ["J.K. Rowling", "31 Jul 1965"], ["Ernest Hemingway", "21 Jul 1899"]],
    8: [["Michael Jackson", "29 Aug 1958"], ["Barack Obama", "4 Aug 1961"], ["Kylie Jenner", "10 Aug 1997"], ["Usain Bolt", "21 Aug 1986"]],
    9: [["Freddie Mercury", "5 Sep 1946"], ["Beyoncé", "4 Sep 1981"], ["Roald Dahl", "13 Sep 1916"], ["Michael Bublé", "9 Sep 1975"]],
    10: [["Gandhi", "2 Oct 1869"], ["John Lennon", "9 Oct 1940"], ["Kim Kardashian", "21 Oct 1980"], ["Pablo Picasso", "25 Oct 1881"]],
    11: [["Leonardo DiCaprio", "11 Nov 1974"], ["Demi Moore", "11 Nov 1962"], ["Marie Curie", "7 Nov 1867"], ["Ryan Gosling", "12 Nov 1980"]],
    12: [["Taylor Swift", "13 Dec 1989"], ["Beethoven", "17 Dec 1770"], ["Winston Churchill", "30 Nov 1874"], ["Jay-Z", "4 Dec 1969"]],
  };

  const today = new Date();
  const d = today.getDate(), m = today.toLocaleString('default', { month: 'long' }), mn = today.getMonth() + 1;
  const todayDisplay = document.getElementById('today-date-display');
  if (todayDisplay) todayDisplay.textContent = `${d} ${m}`;

  const sdCard = document.getElementById('special-day-name');
  const sdDesc = document.getElementById('special-day-desc');
  const sdShop = document.getElementById('special-day-shop');

  let foundSpecial = null;
  if (specialDays[mn] && specialDays[mn][d]) {
    foundSpecial = specialDays[mn][d];
  }
  if (sdCard && foundSpecial) {
    sdCard.textContent = foundSpecial.name;
    if (sdDesc) sdDesc.textContent = foundSpecial.desc;
    if (sdShop) sdShop.href = foundSpecial.shop;
  } else if (sdCard) {
    sdCard.textContent = `Special Gift Day — ${d} ${m} 🎁`;
    if (sdDesc) sdDesc.textContent = 'Every day is worth celebrating. Find a gift for someone you love!';
  }

  const bornList = document.getElementById('born-list');
  if (bornList && notableByMonth[mn]) {
    bornList.innerHTML = notableByMonth[mn].map(([name, date]) =>
      `<div class="born-item"><span class="born-emoji">⭐</span><span><strong>${name}</strong> — ${date}</span></div>`
    ).join('');
  }

  const historyList = document.getElementById('history-list');
  const historyFacts = {
    1: ["1st moon landing module tested, 1968", "First email sent, 1971", "Wikipedia launched, 2001"],
    2: ["Valentine's Day – first card sent, 1415", "Einstein born, 1879 (March)", "First iPhone announced, 2007"],
    3: ["World's first antibiotics discovered, 1928", "First Starbucks opened, 1971", "Instagram launched, 2010"],
    4: ["First Oxford English Dictionary published, 1884", "Wright Brothers' first powered flight, 1903"],
    5: ["World's first postage stamp issued, 1840 (UK!)", "Machu Picchu discovered, 1911"],
    6: ["First Glastonbury Festival, 1970", "World Cup – first held in 1930"],
    7: ["Harry Potter published, 1997", "First Moon Landing, 1969", "Color TV broadcast began, 1954"],
    8: ["First Olympics of modern era, 1896", "Penguin Books founded, 1935"],
    9: ["London's Great Fire, 1666", "First ATM opened in London, 1967"],
    10: ["Big Ben first rang, 1859", "First Halloween, Celtic origin ca. 600 BC"],
    11: ["First Armistice signed, 1918", "Gunpowder Plot foiled, 1605"],
    12: ["First Christmas card sent, 1843 (UK)", "Beethoven's 9th premiered, 1824"],
  };
  if (historyList && historyFacts[mn]) {
    historyList.innerHTML = historyFacts[mn].map(f => `<li>${f}</li>`).join('');
  }

  const daysScroll = document.getElementById('days-scroll');
  if (daysScroll && monthSpecialDays[mn]) {
    daysScroll.innerHTML = monthSpecialDays[mn].map(day => {
      const dayNum = parseInt(day.split(':')[0]);
      const isToday = dayNum === d;
      return `<button class="day-pill${isToday ? ' today' : ''}" onclick="document.getElementById('occasions').scrollIntoView({behavior:'smooth'})">${day}</button>`;
    }).join('');
  }

  // ================================================
  // BIRTHDAY FINDER
  // ================================================
  const bdayFamous = {
    "01-01": ["Paul Revere", "J. Edgar Hoover", "Mary J. Blige"],
    "01-08": ["Elvis Presley", "Stephen Hawking", "David Bowie"],
    "01-14": ["LL Cool J", "Dave Grohl"],
    "02-14": ["Frederick Douglass", "Jimmy Hoffa"],
    "03-14": ["Albert Einstein", "Billy Crystal", "Simone Biles"],
    "04-15": ["Leonardo da Vinci", "Emma Watson"],
    "05-05": ["Adele", "Karl Marx", "Brian Williams"],
    "06-18": ["Paul McCartney", "Isabella Rossellini"],
    "07-18": ["Nelson Mandela", "Vin Diesel"],
    "08-04": ["Barack Obama", "Louis Armstrong"],
    "09-05": ["Freddie Mercury", "Michael Keaton"],
    "10-09": ["John Lennon", "Guillermo del Toro"],
    "11-11": ["Leonardo DiCaprio", "Demi Moore", "Kurt Vonnegut"],
    "12-13": ["Taylor Swift", "Jamie Foxx", "Steve Buscemi"],
    "03-01": ["Justin Bieber", "Kesha", "Javier Bardem"],
    "03-05": ["Eva Mendes", "John Frusciante"],
    "03-08": ["Freddie Prinze Jr.", "James Van Der Beek"],
    "03-17": ["Kurt Russell", "Rob Lowe", "Hozier"],
    "03-25": ["Elton John", "Sarah Jessica Parker"],
    "03-28": ["Lady Gaga", "Vince Vaughn", "Reba McEntire"],
  };

  // Add more generic facts to the ticker
  const factCards = document.querySelectorAll('.fact-card');
  const additionalFacts = [
    "📅 More people are born in August than any other month",
    "🧁 The smallest birthday cake in the world was only 1 inch tall!",
    "🎂 The 'Golden Birthday' is when you turn the age of the day you were born",
    "🌍 Over 19 million people are celebrating their birthday today!",
    "🎁 The most common birthday gift in the UK is a mug or t-shirt",
    "🦄 Scotland's national animal is the Unicorn — magical like your gift!",
    "🎈 Balloons were invented in 1824, just before the first rubber ones",
  ];
  const factsTickerElem = document.getElementById('facts-ticker');
  if (factsTickerElem) {
    additionalFacts.forEach(fact => {
      const div = document.createElement('div');
      div.className = 'fact-card';
      div.innerHTML = fact;
      factsTickerElem.appendChild(div);
    });
  }

  document.getElementById('bday-search-btn-modern')?.addEventListener('click', () => {
    const val = document.getElementById('bday-input-date')?.value;
    const name = document.getElementById('bday-input-name')?.value || 'Friend';
    const result = document.getElementById('bday-result');
    if (!val || !result) return;
    const date = new Date(val);
    const key = `${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    const famous = bdayFamous[key];

    let html = `<div style="text-align:left;">
      <h4 style="color:var(--secondary);font-size:20px;margin-bottom:10px;">Happy early/belated Birthday, ${name}! 🎂</h4>
      <p style="font-size:16px;margin-bottom:15px;">You share your special day (${date.toLocaleDateString('en-GB', {day:'numeric',month:'long'})}) with:</p>`;

    if (famous) {
      html += `<ul style="list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:10px;">
        ${famous.map(n=>`<li style="background:var(--light-bg);padding:8px 15px;border-radius:50px;font-weight:600;font-size:14px;border:1px solid var(--border);">🌟 ${n}</li>`).join('')}
      </ul>`;
    } else {
      html += `<p style="font-style:italic;color:var(--text-muted);">Millions of amazing people around the globe 🌍</p>`;
    }

    html += `<div style="margin-top:20px;padding-top:15px;border-top:1px solid var(--border);">
      <p><strong>Did you know?</strong> On your birthday, approximately 17.8 million people are also celebrating! 🥳</p>
      <a href="#categories" style="display:inline-block;margin-top:15px;color:var(--primary);font-weight:800;text-decoration:underline;">Find the perfect gift for ${name} →</a>
    </div></div>`;

      result.innerHTML = html;
    result.classList.add('show');
  });

  // ================================================
  // BIRTHDAY SEARCH (new dashboard field)
  // ================================================
  document.getElementById('bday-search-btn-modern')?.addEventListener('click', () => {
    const dateInput = document.getElementById('bday-search-date') || document.getElementById('bday-input-date');
    const val = dateInput?.value;
    const name = document.getElementById('bday-input-name')?.value || 'Friend';
    const result = document.getElementById('bday-result');
    if (!val || !result) return;
    const date = new Date(val);
    const key = `${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    const famous = bdayFamous[key];

    let html = `<div style="padding:10px 0;">
      <p style="font-weight:800;font-size:15px;margin-bottom:10px;color:white;">🎂 ${name} shares ${date.toLocaleDateString('en-GB', {day:'numeric',month:'long'})} with:</p>`;
    if (famous) {
      html += `<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:6px;">
        ${famous.map(n=>`<li style="display:flex;align-items:center;gap:8px;font-size:14px;">⭐ <span style="font-weight:700;color:var(--gold);">${n}</span></li>`).join('')}
      </ul>`;
    } else {
      html += `<p style="font-size:14px;color:rgba(255,255,255,0.7);">🌍 Millions of amazing people around the globe share this day!</p>`;
    }
    html += `<a href="#categories" style="display:inline-block;margin-top:12px;padding:8px 18px;background:var(--primary);color:white;border-radius:50px;font-weight:800;font-size:13px;">Find a gift for ${name} →</a></div>`;
    result.innerHTML = html;
  });

  // ================================================
  // WHO BTN + DOB PREVIEW
  // ================================================
  document.querySelectorAll('.who-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.who-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('bday-input-date')?.addEventListener('change', (e) => {
    const val = e.target.value;
    const nameEl = document.getElementById('counter-person-name');
    const previewEl = document.getElementById('counter-next-bday');
    if (!val || !previewEl) return;
    const bday = new Date(val);
    const now = new Date();
    const thisYear = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
    const next = thisYear < now ? new Date(now.getFullYear() + 1, bday.getMonth(), bday.getDate()) : thisYear;
    const days = Math.ceil((next - now) / 86400000);
    const who = nameEl?.value || 'their';
    previewEl.textContent = `On ${next.toLocaleDateString('en-GB', {day:'numeric', month:'long'})}, ${who.trim() || 'they'} will be turning ${next.getFullYear() - bday.getFullYear()} 🎂 — ${days} days to go!`;
  });

  // ================================================
  // EMAIL/TEXT REMINDER FORM
  // ================================================
  document.getElementById('remind-submit-btn')?.addEventListener('click', () => {
    const email = document.getElementById('remind-email')?.value;
    const phone = document.getElementById('remind-phone')?.value;
    const msg = document.getElementById('remind-submit-msg');
    if (!email && !phone) {
      if (msg) msg.textContent = '⚠️ Please enter an email or phone number.';
      setTimeout(() => { if (msg) msg.textContent = ''; }, 3000);
      return;
    }
    if (msg) msg.textContent = '✅ Reminder requested! We\'ll notify you before the big day 🎁';
    if (document.getElementById('remind-email')) document.getElementById('remind-email').value = '';
    if (document.getElementById('remind-phone')) document.getElementById('remind-phone').value = '';
    setTimeout(() => { if (msg) msg.textContent = ''; }, 5000);
  });

  // ================================================
  // E-MESSAGE BUTTON
  // ================================================
  document.getElementById('btn-emessage')?.addEventListener('click', () => {
    const months = (parseInt(localStorage.getItem('emessage_count_month') || '0'));
    // Reset if new month
    const savedMonth = localStorage.getItem('emessage_month');
    const currMonth = new Date().getMonth();
    let count = savedMonth == currMonth ? months : 0;
    if (count < 3) {
      count++;
      localStorage.setItem('emessage_count_month', count);
      localStorage.setItem('emessage_month', currMonth);
      alert(`✉️ E-Message ${count}/3 this month!\n\nYou have ${3 - count} free message${3-count===1?'':'s'} remaining this month.\n\n(Full e-message composer coming soon!)`);
    } else {
      alert('💎 You\'ve used your 3 free messages this month.\n\nUpgrade to premium for unlimited e-messages!');
    }
  });

  // ================================================
  // GLOBAL HOLIDAYS LIST (items 3 + 4)
  // ================================================
  const globalHolidays = [
    // ── JANUARY ──
    { month: 'January',   date: 'Jan 1',  name: "New Year's Day",            country: '🌍 Global',              facts: "New Year's Day is celebrated in 195 countries. The first celebration dates back 4,000 years to ancient Babylon. Times Square's ball drop has run every year since 1907!" },

    // ── FEBRUARY ──
    { month: 'February',  date: 'Feb 14', name: "Valentine's Day",            country: '🌍 Global',              facts: "Over 1 billion Valentine's cards are sent each year — the 2nd largest card-sending holiday. The first recorded Valentine message was sent in 1415 by Charles, Duke of Orléans." },

    // ── MARCH ──
    { month: 'March',     date: 'Mar 17', name: "St. Patrick's Day",          country: '🇮🇪 Ireland',            facts: "A feast day since the 17th century. Chicago dyes its river green every year! About 70 countries celebrate it worldwide — making it one of the most global cultural festivals." },
    { month: 'March',     date: 'Mar 20', name: "Nowruz (Persian New Year)",  country: '🇮🇷 Iran / 🇦🇫 Afghanistan / Central Asia', facts: "Nowruz marks the spring equinox and has been celebrated for over 3,000 years. The word means 'New Day' in Persian. UNESCO lists it as an Intangible Cultural Heritage of Humanity." },
    { month: 'March',     date: 'Mar 25', name: "Greek Independence Day",     country: '🇬🇷 Greece',             facts: "Marks the start of the Greek War of Independence against the Ottoman Empire in 1821. Celebrated with military parades in Athens and across Greek communities worldwide." },
    { month: 'March',     date: 'Mar (varies)', name: "Holi",                 country: '🇮🇳 India / 🇳🇵 Nepal',  facts: "Holi, the 'Festival of Colours', celebrates the arrival of spring and the triumph of good over evil. It's based on the Hindu legend of Holika. Over a billion people celebrate it worldwide." },

    // ── APRIL ──
    { month: 'April',     date: 'Apr (varies)', name: "Good Friday",          country: '🇬🇧 UK / 🇦🇺 Australia / 🇿🇦 South Africa', facts: "Good Friday marks the crucifixion of Jesus Christ. It's a public holiday in 111 countries — one of the most widely observed religious days. Hot cross buns are a traditional Good Friday food in the UK." },
    { month: 'April',     date: 'Apr (varies)', name: "Easter Monday",        country: '🌍 UK, Germany, EU, Australia', facts: "Easter Monday follows Easter Sunday and is a public holiday in many Christian nations. In some countries it's celebrated with egg rolling, egg hunts and parades. The Easter egg tradition dates to medieval Europe." },
    { month: 'April',     date: 'Apr 25', name: "ANZAC Day",                  country: '🇦🇺 Australia / 🇳🇿 New Zealand', facts: "ANZAC Day commemorates Australian and New Zealand soldiers who served in World War I at Gallipoli (1915). Dawn services are held nationwide. The word ANZAC stands for Australian and New Zealand Army Corps." },
    { month: 'April',     date: 'Apr 27', name: "King's Day",                 country: '🇳🇱 Netherlands',       facts: "King's Day (Koningsdag) is one of the world's greatest street parties! Over 800,000 people flood Amsterdam's canals. Everyone wears orange to honour the Royal House of Orange-Nassau." },

    // ── MAY ──
    { month: 'May',       date: 'May 1',  name: "Labour Day / International Workers' Day", country: '🌍 80+ countries', facts: "International Workers' Day commemorates the 1886 Haymarket affair in Chicago. Over 80 countries make it a public holiday. The tradition of May Day dancing around a Maypole dates to 14th century Europe." },
    { month: 'May',       date: 'May 1',  name: "Golden Week – Showa Day",    country: '🇯🇵 Japan',              facts: "Showa Day opens Japan's 'Golden Week' — a cluster of four national holidays. It honours Emperor Hirohito (Showa era). Most Japanese businesses close for the full week; it is the country's biggest travel period." },
    { month: 'May',       date: 'May 5',  name: "Cinco de Mayo",              country: '🇲🇽 Mexico',             facts: "Cinco de Mayo marks Mexico's victory over France at the Battle of Puebla in 1862. Despite being a minor holiday in Mexico, it is hugely celebrated in the USA as a celebration of Mexican culture and heritage." },
    { month: 'May',       date: 'May 9',  name: "Europe Day",                 country: '🇱🇺 Luxembourg / 🇪🇺 EU', facts: "Europe Day marks the Schuman Declaration of 9 May 1950, which led to the creation of the European Union. It celebrates peace and unity across Europe. It is a public holiday in Luxembourg and EU institutions." },
    { month: 'May',       date: 'May (varies)', name: "Ascension Day",        country: '🇫🇷 France / 🇩🇪 Germany / 🇮🇩 Indonesia', facts: "Ascension Day marks the ascension of Jesus Christ into Heaven, 40 days after Easter. It is a public holiday in over 20 countries. In Germany, it is also celebrated as Father's Day (Vatertag)." },
    { month: 'May',       date: 'May (varies)', name: "Whit Monday / Pentecost Monday", country: '🇫🇷 France / 🇧🇪 Belgium / 🇦🇹 Austria', facts: "Whit Monday marks the descent of the Holy Spirit onto the apostles, 50 days after Easter. It is a public holiday across much of Europe. Many countries use the weekend for large outdoor festivals." },

    // ── JUNE ──
    { month: 'June',      date: 'Jun 21', name: "Summer Solstice",            country: '🌍 Global',              facts: "The longest day of the year! Stonehenge perfectly aligns with the sunrise. Ancient cultures built calendars around it. Thousands still gather at Stonehenge each year to celebrate." },

    // ── JULY ──
    { month: 'July',      date: 'Jul 4',  name: "US Independence Day",        country: '🇺🇸 USA',               facts: "The Declaration of Independence was signed on July 4, 1776. Over 14,000 fireworks displays light up the US. About 150 million hot dogs are eaten on this day alone!" },
    { month: 'July',      date: 'Jul 14', name: "Bastille Day",               country: '🇫🇷 France',            facts: "France's national day marks the storming of the Bastille prison in 1789 — a symbol of the French Revolution. The Champs-Élysées military parade is one of Europe's oldest and largest." },

    // ── AUGUST ──
    { month: 'August',    date: 'Aug 15', name: "Indian Independence Day",    country: '🇮🇳 India',             facts: "India gained independence from Britain in 1947. The Prime Minister hoists the flag at the Red Fort in Delhi. It is celebrated across Indian communities worldwide with cultural events and fireworks." },

    // ── OCTOBER ──
    { month: 'October',   date: 'Oct 31', name: "Halloween",                  country: '🇺🇸🇬🇧 USA / UK',       facts: "Halloween originates from the Celtic festival of Samhain. Americans spend over $10 billion annually. The word 'witch' comes from 'wicce' (Old English for wise woman). Jack-o-lanterns were first made from turnips!" },

    // ── NOVEMBER ──
    { month: 'November',  date: 'Nov 5',  name: "Bonfire Night",              country: '🇬🇧 UK',                facts: "Guy Fawkes Night commemorates the failed Gunpowder Plot of 1605. The effigy tradition began in 1606. Around 55 firework displays happen across the UK and it remains one of Britain's most beloved evenings." },
    { month: 'November',  date: 'Nov 11', name: "Remembrance Day",            country: '🇬🇧🌍 Commonwealth',    facts: "Remembrance Day marks the armistice that ended World War I at the 11th hour of the 11th day of the 11th month in 1918. The red poppy is the symbol of remembrance, inspired by Flanders Fields." },

    // ── DECEMBER ──
    { month: 'December',  date: 'Dec 25', name: "Christmas Day",              country: '🌍 Global',              facts: "Christmas is celebrated by over 2 billion people worldwide. Santa's origins trace to Saint Nicholas of 4th century Turkey. The world's tallest Christmas tree was 221 ft tall in Seattle (1950)." },
    { month: 'December',  date: 'Dec 26', name: "Boxing Day",                 country: '🇬🇧 Commonwealth',      facts: "Boxing Day originated when Victorian servants received 'Christmas boxes' from their employers. It's now a massive shopping day and major sports event day across the Commonwealth." },
    { month: 'December',  date: 'Dec 31', name: "New Year's Eve",             country: '🌍 Global',              facts: "Sydney's fireworks are seen by over 1 billion TV viewers each year. The earliest New Year celebration was in Mesopotamia around 2000 BC. 'Auld Lang Syne' was written by Robert Burns in 1788." },
  ];

  const holidaysList = document.getElementById('holidays-list');
  const holidayFactsPanel = document.getElementById('holiday-facts-panel');
  const holidayFactsTitle = document.getElementById('holiday-facts-title');
  const holidayFactsText = document.getElementById('holiday-facts-text');

  if (holidaysList) {
    let lastMonth = '';
    globalHolidays.forEach((h) => {
      // Insert a month header when month changes
      if (h.month && h.month !== lastMonth) {
        lastMonth = h.month;
        const header = document.createElement('div');
        header.className = 'holiday-month-header';
        header.textContent = `🗓️ ${h.month}`;
        holidaysList.appendChild(header);
      }
      const item = document.createElement('div');
      item.className = 'holiday-item';
      item.innerHTML = `<span class="holiday-date">${h.date}</span><span class="holiday-name">${h.name}</span><span class="holiday-country">${h.country}</span>`;
      item.addEventListener('click', () => {
        if (holidayFactsTitle) holidayFactsTitle.textContent = `${h.name} — ${h.date}`;
        if (holidayFactsText) holidayFactsText.textContent = h.facts;
        if (holidayFactsPanel) holidayFactsPanel.style.display = 'block';
        holidaysList.querySelectorAll('.holiday-item').forEach(el => el.style.background = '');
        item.style.background = 'rgba(245,200,66,0.12)';
      });
      holidaysList.appendChild(item);
    });
  }
  document.getElementById('holiday-close-btn')?.addEventListener('click', () => {
    if (holidayFactsPanel) holidayFactsPanel.style.display = 'none';
    holidaysList?.querySelectorAll('.holiday-item').forEach(el => el.style.background = '');
  });

  // ================================================
  // PEOPLE BORN TODAY LIST (item 9)
  // ================================================
  (function populateBornToday() {
    const now = new Date();
    const todayKey = `${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const bornList = document.getElementById('born-today-list');
    const bornSub = document.getElementById('born-today-sub');
    const todayFamous = bdayFamous[todayKey];
    if (bornList) {
      if (todayFamous && todayFamous.length) {
        todayFamous.forEach(name => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="born-name">🌟 ${name}</span>`;
          bornList.appendChild(li);
        });
        if (bornSub) bornSub.textContent = `${todayFamous.length} famous ${todayFamous.length === 1 ? 'person' : 'people'} share today's date.`;
      } else {
        const li = document.createElement('li');
        li.innerHTML = `<span class="born-name" style="color:rgba(255,255,255,0.6);">🌍 Millions of amazing people born today — you could be next!</span>`;
        bornList.appendChild(li);
        if (bornSub) bornSub.textContent = `Today is ${now.toLocaleDateString('en-GB', {day:'numeric', month:'long'})}.`;
      }
    }
  })();

  // ================================================
  // COUNTDOWN LOGIC — card-based multi-event
  // ================================================
  const daysEl   = document.getElementById('count-days');
  const hoursEl  = document.getElementById('count-hours');
  const minsEl   = document.getElementById('count-mins');
  const secsEl   = document.getElementById('count-secs');
  const activeName = document.getElementById('count-active-name');
  const eventCards = document.querySelectorAll('.count-event-card');

  let activeEvent = 'birthday';

  // Compute target for a given event key
  function getTarget(key) {
    const now = new Date();
    if (key === 'birthday') {
      const bdayInput = document.getElementById('bday-input-date')?.value;
      if (bdayInput) {
        const bday = new Date(bdayInput);
        const t = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
        if (t < now) t.setFullYear(now.getFullYear() + 1);
        return t;
      }
      // Default: Jan 1 next year
      return new Date(now.getFullYear() + 1, 0, 1);
    } else if (key === 'easter') {
      // Easter 2026: April 5
      const e = new Date('April 5, 2026 00:00:00');
      return e < now ? new Date('April 18, 2027 00:00:00') : e;
    } else if (key === 'christmas') {
      const xmas = new Date(now.getFullYear(), 11, 25);
      if (xmas < now) xmas.setFullYear(now.getFullYear() + 1);
      return xmas;
    }
    return new Date(now.getFullYear() + 1, 0, 1);
  }

  // Return a short "Xd Xh Xm" preview string
  function previewDiff(key) {
    const diff = getTarget(key) - new Date();
    if (diff <= 0) return 'Today! 🎉';
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${d}d ${h}h ${m}m`;
  }

  // Update the live main countdown
  function updateCountdown() {
    const now = new Date();
    const target = getTarget(activeEvent);
    const diff = target - now;

    if (diff <= 0) {
      ['count-days','count-hours','count-mins','count-secs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (daysEl)  daysEl.textContent  = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl)  minsEl.textContent  = String(m).padStart(2, '0');
    if (secsEl)  secsEl.textContent  = String(s).padStart(2, '0');

    // Update all preview cards
    ['birthday','easter','christmas'].forEach(key => {
      const el = document.getElementById(`preview-${key}`);
      if (el) el.textContent = previewDiff(key);
    });
  }

  // Switch active event
  function setActiveEvent(key) {
    activeEvent = key;
    eventCards.forEach(card => {
      card.classList.toggle('active', card.dataset.event === key);
    });
    const labels = { birthday: 'Your Birthday 🎂', easter: 'Easter 🐣', christmas: 'Christmas 🎄' };
    if (activeName) activeName.textContent = labels[key] || key;
    updateCountdown();
  }

  // Card click
  eventCards.forEach(card => {
    card.addEventListener('click', () => setActiveEvent(card.dataset.event));
  });

  // Scroll through cards on the countdown section with wheel
  const countWrap = document.getElementById('countdown-section');
  const eventKeys = ['birthday', 'easter', 'christmas'];
  if (countWrap) {
    countWrap.addEventListener('wheel', (e) => {
      e.preventDefault();
      const idx = eventKeys.indexOf(activeEvent);
      const next = e.deltaY > 0
        ? eventKeys[(idx + 1) % eventKeys.length]
        : eventKeys[(idx - 1 + eventKeys.length) % eventKeys.length];
      setActiveEvent(next);
    }, { passive: false });
  }

  // Reminder button
  document.getElementById('remind-btn')?.addEventListener('click', () => {
    const msg = document.getElementById('reminder-msg');
    const labels = { birthday: 'Birthday', easter: 'Easter', christmas: 'Christmas' };
    const target = getTarget(activeEvent);
    const days = Math.ceil((target - new Date()) / 86400000);

    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          new Notification(`⏰ IGötNag Reminder`, {
            body: `${labels[activeEvent]} is in ${days} days! Don't forget to get a gift 🎁`,
            icon: '/favicon.ico'
          });
          if (msg) { msg.textContent = `✅ Reminder set! ${labels[activeEvent]} is ${days} days away.`; }
        } else {
          if (msg) { msg.textContent = `📅 ${labels[activeEvent]} is in ${days} days — add it to your calendar!`; }
        }
      });
    } else {
      if (msg) { msg.textContent = `📅 ${labels[activeEvent]} is in ${days} days — don't forget a gift! 🎁`; }
    }
    setTimeout(() => { if (msg) msg.textContent = ''; }, 6000);
  });

  setInterval(updateCountdown, 1000);
  setActiveEvent('birthday');

  // ================================================
  // COOKIE NOTICE
  // ================================================
  const cookieNotice = document.getElementById('cookie-notice');
  if (!localStorage.getItem('igotnag_cookies')) {
    cookieNotice?.classList.remove('hidden');
  } else {
    cookieNotice?.remove();
  }
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('igotnag_cookies', 'accepted');
    cookieNotice?.remove();
  });
  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    cookieNotice?.remove();
  });

  // ================================================
  // NEWSLETTER FORM
  // ================================================
  document.getElementById('newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email')?.value;
    const btn = document.getElementById('newsletter-submit');
    if (email && btn) {
      btn.textContent = '✅ Subscribed!';
      btn.style.background = 'white';
      btn.style.color = 'var(--secondary)';
      setTimeout(() => {
        btn.textContent = 'Subscribe 🎉';
        btn.style.background = '';
        btn.style.color = '';
        if (document.getElementById('newsletter-email')) document.getElementById('newsletter-email').value = '';
      }, 3000);
    }
  });

  // ================================================
  // DUPLICATE FACTS TICKER FOR SEAMLESS LOOP
  // ================================================
  const factsTicker = document.getElementById('facts-ticker');
  if (factsTicker) {
    const original = factsTicker.innerHTML;
    factsTicker.innerHTML = original + original;
  }

  // ================================================
  // TOP SECRET SCROLL DUPLICATE
  // ================================================
  const secretLoop = document.querySelector('.secret-slide-loop');
  if (secretLoop) {
    secretLoop.innerHTML += secretLoop.innerHTML;
  }

  // ================================================
  // ANIMATE ON SCROLL
  // ================================================
  const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -48px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  const animCards = document.querySelectorAll('.occasion-card, .product-cat-card, .featured-card, .review-card, .step-card, .badge, .born-today-card, .special-day-card, .history-facts-card');
  animCards.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ================================================
  // VIDEO SOUND TOGGLE
  // ================================================
  const videos = document.querySelectorAll('video:not(.secret-video)');
  videos.forEach(v => {
    v.addEventListener('click', () => {
      v.muted = !v.muted;
      if (!v.muted) {
        v.volume = 0.5;
        console.log("Video unmuted");
      } else {
        console.log("Video muted");
      }
    });

    // Handle touch for mobile
    v.addEventListener('touchend', (e) => {
      e.preventDefault();
      v.click();
    });
  });

  // ================================================
  // SMOOTH ANCHOR SCROLL
  // ================================================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
