// Reemplazar el código al inicio del DOMContentLoaded con este código
document.addEventListener("DOMContentLoaded", () => {
  // Año actual para el footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Menú móvil
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const overlay = document.getElementById("overlay")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      overlay.classList.toggle("active")
    })
  }

  // Agregar event listener para cerrar el menú móvil con el botón
  const closeMobileMenu = document.getElementById("close-mobile-menu")
  if (closeMobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      overlay.classList.remove("active")
    })
  }

  // Carrito de compras
  const cartToggle = document.getElementById("cart-toggle")
  const cartSidebar = document.getElementById("cart-sidebar")
  const closeCart = document.getElementById("close-cart")

  if (cartToggle) {
    cartToggle.addEventListener("click", () => {
      cartSidebar.classList.add("active")
      overlay.classList.add("active")
    })
  }

  if (closeCart) {
    closeCart.addEventListener("click", () => {
      cartSidebar.classList.remove("active")
      overlay.classList.remove("active")
    })
  }

  // Modal de cuenta
  const accountToggle = document.getElementById("account-toggle")
  const accountModal = document.getElementById("account-modal")
  const closeAccountModal = document.getElementById("close-account-modal")

  if (accountToggle) {
    accountToggle.addEventListener("click", () => {
      accountModal.classList.add("active")
      overlay.classList.add("active")
    })
  }

  if (closeAccountModal) {
    closeAccountModal.addEventListener("click", () => {
      accountModal.classList.remove("active")
      overlay.classList.remove("active")
    })
  }

  // Event listener for mobile account button
  const mobileAccountToggle = document.getElementById("mobile-account-toggle")
  if (mobileAccountToggle) {
    mobileAccountToggle.addEventListener("click", (e) => {
      e.preventDefault()
      // Close mobile menu
      mobileMenu.classList.remove("active")
      overlay.classList.remove("active")

      // Open account modal
      accountModal.classList.add("active")
      overlay.classList.add("active")
    })
  }

  // Cerrar modales al hacer clic en el overlay
  if (overlay) {
    overlay.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      cartSidebar.classList.remove("active")
      accountModal.classList.remove("active")
      overlay.classList.remove("active")
    })
  }

  // Tabs del modal de cuenta
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Desactivar todos los tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Activar el tab seleccionado
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Funcionalidad para mostrar/ocultar contraseña
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")
  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const passwordInput = document.getElementById(targetId)

      // Cambiar el tipo de input entre password y text
      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye-off">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                `
      } else {
        passwordInput.type = "password"
        this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                `
      }
    })
  })

  // Carrusel de productos
  const carousel = document.querySelector(".product-carousel")
  const prevButton = document.querySelector(".carousel-prev")
  const nextButton = document.querySelector(".carousel-next")

  if (carousel && prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      carousel.scrollBy({ left: -300, behavior: "smooth" })
    })

    nextButton.addEventListener("click", () => {
      carousel.scrollBy({ left: 300, behavior: "smooth" })
    })
  }

  // Carrito de compras - Funcionalidad
  const cartItems = document.getElementById("cart-items")
  const cartCount = document.getElementById("cart-count")
  const cartTotalPrice = document.getElementById("cart-total-price")

  // Cargar carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  // Modifica la función updateCartUI para usar lazy loading

  // Actualizar la interfaz del carrito
  function updateCartUI() {
    // Actualizar contador
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)

    // Actualizar total
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    cartTotalPrice.textContent = `$${total}`

    // Actualizar items
    if (cart.length === 0) {
      cartItems.innerHTML = `
                <div class="empty-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    <p>Tu carrito está vacío</p>
                    <a href="shop.html" class="button">Ir a la tienda</a>
                </div>
            `
    } else {
      let itemsHTML = ""

      cart.forEach((item) => {
        itemsHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="${item.image}" alt="${item.name}" loading="lazy">
                        </div>
                        <div class="cart-item-details">
                            <h3 class="cart-item-title">${item.name}</h3>
                            <p class="cart-item-price">$${item.price}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-button decrease-quantity" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-button increase-quantity" data-id="${item.id}">+</button>
                            </div>
                            <button class="cart-item-remove" data-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                `
      })

      cartItems.innerHTML = itemsHTML

      // Iniciar lazy loading para las imágenes del carrito
      setupLazyLoading()

      // Agregar event listeners a los botones de cantidad
      document.querySelectorAll(".decrease-quantity").forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          decreaseQuantity(id)
        })
      })

      document.querySelectorAll(".increase-quantity").forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          increaseQuantity(id)
        })
      })

      document.querySelectorAll(".cart-item-remove").forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          removeFromCart(id)
        })
      })
    }
  }

  // Agregar al carrito
  function addToCart(id, name, price, image, stock) {
    const existingItem = cart.find((item) => item.id === id)

    // Verificar stock disponible
    if (existingItem) {
      if (existingItem.quantity < stock) {
        existingItem.quantity += 1
      } else {
        showNotification(`Lo sentimos, solo hay ${stock} unidades disponibles de ${name}`)
        return
      }
    } else {
      if (stock > 0) {
        cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
        })
      } else {
        showNotification(`Lo sentimos, ${name} está agotado`)
        return
      }
    }

    // Guardar en localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Actualizar UI
    updateCartUI()

    // Mostrar notificación
    showNotification(`${name} agregado al carrito`)
  }

  // Aumentar cantidad
  function increaseQuantity(id) {
    const item = cart.find((item) => item.id === id)
    if (item) {
      // Obtener el stock del producto
      fetch("../data/products.json")
        .then((response) => response.json())
        .then((data) => {
          const producto = data.productos.find((p) => p.id.toString() === id.toString())
          if (producto && item.quantity < producto.stock) {
            item.quantity += 1
            localStorage.setItem("cart", JSON.stringify(cart))
            updateCartUI()
          } else {
            showNotification(`Lo sentimos, solo hay ${producto.stock} unidades disponibles`)
          }
        })
        .catch((error) => {
          console.error("Error al verificar stock:", error)
        })
    }
  }

  // Disminuir cantidad
  function decreaseQuantity(id) {
    const item = cart.find((item) => item.id === id)
    if (item) {
      item.quantity -= 1

      if (item.quantity <= 0) {
        removeFromCart(id)
      } else {
        localStorage.setItem("cart", JSON.stringify(cart))
        updateCartUI()
      }
    }
  }

  // Eliminar del carrito
  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id)
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartUI()
  }

  // Notificación
  function showNotification(message) {
    const notification = document.createElement("div")
    notification.className = "notification fade-in"
    notification.innerHTML = `
              <div class="notification-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>${message}</span>
              </div>
          `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  // Improve the setupLazyLoading function for better image loading
  function setupLazyLoading() {
    // Verificar si el navegador soporta Intersection Observer
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              const src = img.getAttribute("data-src")

              if (src) {
                img.src = src

                // Añadir evento para cuando la imagen termine de cargar
                img.onload = () => {
                  img.classList.add("loaded")
                  img.removeAttribute("data-src")
                }
              }

              // Una vez cargada, dejar de observar esta imagen
              observer.unobserve(img)
            }
          })
        },
        {
          // Cargar imágenes cuando estén a 200px de entrar en el viewport
          rootMargin: "200px 0px",
          threshold: 0.01,
        },
      )

      // Seleccionar todas las imágenes que deben cargarse de forma diferida
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img)
      })
    } else {
      // Fallback para navegadores que no soportan Intersection Observer
      document.querySelectorAll("img[data-src]").forEach((img) => {
        img.src = img.getAttribute("data-src")
        img.onload = () => {
          img.classList.add("loaded")
          img.removeAttribute("data-src")
        }
      })
    }
  }

  // Event listeners para botones de agregar al carrito
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      const name = this.getAttribute("data-name")
      const price = Number.parseFloat(this.getAttribute("data-price"))
      const image = this.getAttribute("data-image")
      const stock = Number.parseInt(this.getAttribute("data-stock") || "0")

      addToCart(id, name, price, image, stock)
    })
  })

  // Inicializar carrito
  updateCartUI()

  // Cargar productos desde JSON
  async function loadProducts() {
    try {
      // Determinar la ruta correcta según la página actual
      const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html")
      const jsonPath = isHomePage ? "./data/products.json" : "../data/products.json"

      const response = await fetch(jsonPath)
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo de productos")
      }
      const data = await response.json()
      return data.productos
    } catch (error) {
      console.error("Error al cargar productos:", error)
      return []
    }
  }

  // Renderizar productos en la página de inicio
  async function renderFeaturedProducts() {
    const productCarousel = document.querySelector(".product-carousel")
    if (!productCarousel) return

    try {
      const productos = await loadProducts()
      const featuredProducts = productos.filter((producto) => producto.etiquetas.includes("destacado")).slice(0, 5)

      let productsHTML = ""

      featuredProducts.forEach((producto) => {
        const sinStock = producto.stock <= 0 || producto.etiquetas.includes("sin-stock")
        // Ajustar la ruta de la imagen para la página de inicio
        const imagenAjustada = producto.imagen.replace("../", "./")

        productsHTML += `
              <div class="product-card">
                  <div class="product-image">
                      <img src="${imagenAjustada}" alt="${producto.altimg}" loading="lazy">
                      <div class="product-badges">
                          ${producto.etiquetas
                            .map((etiqueta) => {
                              if (etiqueta === "nuevo") {
                                return '<span class="product-badge new-badge">Nuevo</span>'
                              } else if (etiqueta === "destacado") {
                                return '<span class="product-badge featured-badge">Destacado</span>'
                              } else if (etiqueta === "sin-stock") {
                                return '<span class="product-badge stock-badge">Sin Stock</span>'
                              }
                              return ""
                            })
                            .join("")}
                          ${
                            producto.stock <= 0 && !producto.etiquetas.includes("sin-stock")
                              ? '<span class="product-badge stock-badge">Sin Stock</span>'
                              : ""
                          }
                      </div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title" title="${producto.nombre}">${producto.nombre}</h3>
                      <p class="product-price">$${producto.precio}</p>
                  </div>
                  <button class="button add-to-cart-button" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}" data-image="${imagenAjustada}" data-stock="${producto.stock}" ${
                    sinStock ? "disabled" : ""
                  }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                          <circle cx="8" cy="21" r="1"></circle>
                          <circle cx="19" cy="21" r="1"></circle>
                          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                      </svg>
                      Agregar
                  </button>
              </div>
          `
      })

      productCarousel.innerHTML = productsHTML

      // Agregar event listeners a los botones de agregar al carrito
      document.querySelectorAll(".add-to-cart-button").forEach((button) => {
        if (!button.disabled) {
          button.addEventListener("click", function () {
            const id = this.getAttribute("data-id")
            const name = this.getAttribute("data-name")
            const price = Number.parseFloat(this.getAttribute("data-price"))
            const image = this.getAttribute("data-image")
            const stock = Number.parseInt(this.getAttribute("data-stock"))

            addToCart(id, name, price, image, stock)
          })
        }
      })
    } catch (error) {
      console.error("Error al renderizar productos destacados:", error)
    }
  }

  // Página de tienda
  if (window.location.pathname.includes("shop.html")) {
    // Filtros
    const productSearch = document.getElementById("product-search")
    const mobileProductSearch = document.getElementById("mobile-product-search")
    const minPriceInput = document.getElementById("min-price")
    const maxPriceInput = document.getElementById("max-price")
    const mobileMinPriceInput = document.getElementById("mobile-min-price")
    const mobileMaxPriceInput = document.getElementById("mobile-max-price")
    const destacadosFilter = document.getElementById("destacados-filter")
    const mobileDestacadosFilter = document.getElementById("mobile-destacados-filter")
    const nuevosFilter = document.getElementById("nuevos-filter")
    const mobileNuevosFilter = document.getElementById("mobile-nuevos-filter")
    const sortSelect = document.getElementById("sort-select")
    const clearFilters = document.getElementById("clear-filters")
    const productsGrid = document.getElementById("products-grid")
    const noProducts = document.getElementById("no-products")
    const productsCount = document.getElementById("products-count")
    const promocionesFilter = document.getElementById("promociones-filter")
    const mobilePromocionesFilter = document.getElementById("mobile-promociones-filter")
    const ocultarSinStockFilter = document.getElementById("ocultar-sin-stock-filter")
    const mobileOcultarSinStockFilter = document.getElementById("mobile-ocultar-sin-stock-filter")

    // Tabs móviles
    const mobileTabs = document.querySelectorAll(".mobile-tab")
    const mobileTabContents = document.querySelectorAll(".mobile-tab-content")

    mobileTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        mobileTabs.forEach((t) => t.classList.remove("active"))
        mobileTabContents.forEach((c) => c.classList.remove("active"))

        this.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })

    // Filtros de categoría
    const categoryButtons = document.querySelectorAll(".filter-button[data-category]")
    let selectedCategory = "todas"

    // Obtener categoría de la URL
    const urlParams = new URLSearchParams(window.location.search)
    const categoriaParam = urlParams.get("categoria")

    if (categoriaParam) {
      selectedCategory = categoriaParam

      categoryButtons.forEach((button) => {
        if (button.getAttribute("data-category") === selectedCategory) {
          button.classList.add("active")
        } else {
          button.classList.remove("active")
        }
      })
    }

    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category")
        selectedCategory = category

        // Actualizar botones activos
        categoryButtons.forEach((btn) => {
          if (btn.getAttribute("data-category") === category) {
            btn.classList.add("active")
          } else {
            btn.classList.remove("active")
          }
        })

        // Actualizar URL
        const url = new URL(window.location)
        if (category === "todas") {
          url.searchParams.delete("categoria")
        } else {
          url.searchParams.set("categoria", category)
        }
        window.history.pushState({}, "", url)

        // Actualizar productos
        filterProducts()
      })
    })

    // Inputs de precio
    function validatePriceInput(input) {
      // Eliminar cualquier carácter que no sea número
      const value = input.value.replace(/[^\d]/g, "")

      // Convertir a número y limitar al rango permitido
      let numValue = Number.parseInt(value, 10)
      if (isNaN(numValue)) {
        numValue = ""
      } else if (numValue > 999999999) {
        numValue = 999999999
      }

      // Actualizar el valor del input
      input.value = numValue === "" ? "" : numValue.toString()

      return numValue
    }

    // Función para sincronizar los inputs de precio (desktop y móvil)
    function syncPriceInputs(source, target) {
      if (source && target) {
        target.value = source.value
      }
    }

    if (minPriceInput) {
      minPriceInput.addEventListener("input", function () {
        validatePriceInput(this)
        syncPriceInputs(minPriceInput, mobileMinPriceInput)
        filterProducts()
      })
    }

    if (maxPriceInput) {
      maxPriceInput.addEventListener("input", function () {
        validatePriceInput(this)
        syncPriceInputs(maxPriceInput, mobileMaxPriceInput)
        filterProducts()
      })
    }

    if (mobileMinPriceInput) {
      mobileMinPriceInput.addEventListener("input", function () {
        validatePriceInput(this)
        syncPriceInputs(mobileMinPriceInput, minPriceInput)
        filterProducts()
      })
    }

    if (mobileMaxPriceInput) {
      mobileMaxPriceInput.addEventListener("input", function () {
        validatePriceInput(this)
        syncPriceInputs(mobileMaxPriceInput, maxPriceInput)
        filterProducts()
      })
    }

    // Búsqueda
    if (productSearch) {
      productSearch.addEventListener("input", filterProducts)
    }

    if (mobileProductSearch) {
      mobileProductSearch.addEventListener("input", filterProducts)
    }

    // Filtros de checkbox
    if (destacadosFilter) {
      destacadosFilter.addEventListener("change", filterProducts)
    }

    if (mobileDestacadosFilter) {
      mobileDestacadosFilter.addEventListener("change", filterProducts)
    }

    if (nuevosFilter) {
      nuevosFilter.addEventListener("change", filterProducts)
    }

    if (mobileNuevosFilter) {
      mobileNuevosFilter.addEventListener("change", filterProducts)
    }

    // Filtros de promociones
    if (promocionesFilter) {
      promocionesFilter.addEventListener("change", filterProducts)
    }

    if (mobilePromocionesFilter) {
      mobilePromocionesFilter.addEventListener("change", filterProducts)
    }

    // Filtros de ocultar sin stock
    if (ocultarSinStockFilter) {
      ocultarSinStockFilter.addEventListener("change", filterProducts)
    }

    if (mobileOcultarSinStockFilter) {
      mobileOcultarSinStockFilter.addEventListener("change", filterProducts)
    }

    // Ordenamiento
    if (sortSelect) {
      sortSelect.addEventListener("change", filterProducts)
    }

    // Limpiar filtros
    if (clearFilters) {
      clearFilters.addEventListener("click", () => {
        // Resetear filtros
        productSearch.value = ""
        mobileProductSearch.value = ""
        minPriceInput.value = ""
        maxPriceInput.value = ""
        mobileMinPriceInput.value = ""
        mobileMaxPriceInput.value = ""
        destacadosFilter.checked = false
        mobileDestacadosFilter.checked = false
        nuevosFilter.checked = false
        mobileNuevosFilter.checked = false
        sortSelect.value = "destacados"

        // Resetear categoría
        selectedCategory = "todas"
        categoryButtons.forEach((btn) => {
          if (btn.getAttribute("data-category") === "todas") {
            btn.classList.add("active")
          } else {
            btn.classList.remove("active")
          }
        })

        // Actualizar URL
        const url = new URL(window.location)
        url.searchParams.delete("categoria")
        window.history.pushState({}, "", url)

        // Actualizar productos
        filterProducts()
      })
    }

    // Replace the existing filterProducts function with this improved version
    async function filterProducts() {
      const searchTerm =
        (productSearch ? productSearch.value : "") || (mobileProductSearch ? mobileProductSearch.value : "")
      const minPrice = Number.parseInt(minPriceInput ? minPriceInput.value : 0) || 0
      const maxPrice = Number.parseInt(maxPriceInput ? maxPriceInput.value : 999999999) || 999999999
      const showDestacados =
        (destacadosFilter ? destacadosFilter.checked : false) ||
        (mobileDestacadosFilter ? mobileDestacadosFilter.checked : false)
      const showNuevos =
        (nuevosFilter ? nuevosFilter.checked : false) || (mobileNuevosFilter ? mobileNuevosFilter.checked : false)
      const showPromociones =
        (promocionesFilter ? promocionesFilter.checked : false) ||
        (mobilePromocionesFilter ? mobilePromocionesFilter.checked : false)
      const hideSinStock =
        (ocultarSinStockFilter ? ocultarSinStockFilter.checked : false) ||
        (mobileOcultarSinStockFilter ? mobileOcultarSinStockFilter.checked : false)
      const sortBy = sortSelect ? sortSelect.value : "precio-asc"

      // Get selected discount filters
      const selectedDiscounts = []
      document.querySelectorAll("input[data-discount]:checked").forEach((checkbox) => {
        selectedDiscounts.push(Number.parseInt(checkbox.getAttribute("data-discount")))
      })

      try {
        const productos = await loadProducts()

        // Filtrar productos
        const filteredProducts = productos.filter((producto) => {
          // Filtro por búsqueda
          if (searchTerm && !producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false
          }

          // Filtro por categoría (ahora puede ser un array)
          if (selectedCategory !== "todas") {
            // Si producto.categoria es un string, convertirlo a array para compatibilidad
            const categorias = Array.isArray(producto.categoria) ? producto.categoria : [producto.categoria]
            if (!categorias.includes(selectedCategory)) {
              return false
            }
          }

          // Filtro por precio (rango min-max)
          if (producto.precio < minPrice || producto.precio > maxPrice) {
            return false
          }

          // Filtro por destacados
          if (showDestacados && !producto.etiquetas.includes("destacado")) {
            return false
          }

          // Filtro por nuevos
          if (showNuevos && !producto.etiquetas.includes("nuevo")) {
            return false
          }

          // Filtro por promociones
          if (showPromociones && producto.promocion <= 0) {
            return false
          }

          // Filtro por descuentos específicos
          if (selectedDiscounts.length > 0 && !selectedDiscounts.includes(producto.promocion)) {
            return false
          }

          // Filtro para ocultar productos sin stock
          if (hideSinStock && (producto.stock <= 0 || producto.etiquetas.includes("sin-stock"))) {
            return false
          }

          return true
        })

        // Ordenar productos
        filteredProducts.sort((a, b) => {
          switch (sortBy) {
            case "precio-asc":
              return a.precio - b.precio
            case "precio-desc":
              return b.precio - a.precio
            case "nombre-asc":
              return a.nombre.localeCompare(b.nombre)
            case "nombre-desc":
              return b.nombre.localeCompare(a.nombre)
            default:
              return a.precio - b.precio
          }
        })

        // Actualizar contador
        const totalProductsCount = document.getElementById("total-products-count")
        if (totalProductsCount) {
          totalProductsCount.textContent = productos.length
        }
        if (productsCount) {
          productsCount.textContent = filteredProducts.length
        }

        // Mostrar mensaje si no hay productos
        if (filteredProducts.length === 0) {
          if (productsGrid) {
            productsGrid.innerHTML = ""
          }
          if (noProducts) {
            noProducts.classList.remove("hidden")
          }

          // Ocultar paginación
          const pagination = document.getElementById("pagination")
          if (pagination) {
            pagination.innerHTML = ""
          }
        } else {
          if (noProducts) {
            noProducts.classList.add("hidden")
          }

          // Implementar paginación
          const itemsPerPage = 25
          const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

          // Obtener página actual de la URL o usar 1 por defecto
          const urlParams = new URLSearchParams(window.location.search)
          let currentPage = Number.parseInt(urlParams.get("page")) || 1

          // Asegurarse de que la página actual es válida
          if (currentPage < 1) currentPage = 1
          if (currentPage > totalPages) currentPage = totalPages

          // Calcular índices de inicio y fin para los productos a mostrar
          const startIndex = (currentPage - 1) * itemsPerPage
          const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length)

          // Obtener productos para la página actual
          const currentPageProducts = filteredProducts.slice(startIndex, endIndex)

          // Renderizar productos
          let productsHTML = ""

          currentPageProducts.forEach((producto) => {
            const sinStock = producto.stock <= 0 || producto.etiquetas.includes("sin-stock")
            const tieneDescuento = producto.promocion > 0
            const precioOriginal = producto.precio
            const precioConDescuento = tieneDescuento
              ? Math.round(producto.precio * (1 - producto.promocion / 100))
              : producto.precio

            productsHTML += `
          <div class="product-card">
              <div class="product-image">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="${producto.imagen}" alt="${producto.altimg}" loading="lazy">
                  <div class="product-badges">
                      ${producto.etiquetas
                        .map((etiqueta) => {
                          if (etiqueta === "nuevo") {
                            return '<span class="product-badge new-badge">Nuevo</span>'
                          } else if (etiqueta === "destacado") {
                            return '<span class="product-badge featured-badge">Destacado</span>'
                          } else if (etiqueta === "sin-stock") {
                            return '<span class="product-badge stock-badge">Sin Stock</span>'
                          }
                          return ""
                        })
                        .join("")}
                    ${
                      producto.stock <= 0 && !producto.etiquetas.includes("sin-stock")
                        ? '<span class="product-badge stock-badge">Sin Stock</span>'
                        : ""
                    }
                  </div>
                  ${tieneDescuento ? `<div class="discount-badge">${producto.promocion}% OFF</div>` : ""}
              </div>
              <div class="product-info">
                  <h3 class="product-title" title="${producto.nombre}">${producto.nombre}</h3>
                  <div class="product-price-container">
                      <div class="price-wrapper">
                          ${tieneDescuento ? `<span class="original-price">$${precioOriginal}</span>` : ""}
                          <span class="product-price">$${precioConDescuento}</span>
                      </div>
                      <span class="product-stock ${producto.stock < 10 && producto.stock > 0 ? "low-stock" : ""}">${producto.stock} Stock</span>
                  </div>
              </div>
              <button class="button add-to-cart-button" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${precioConDescuento}" data-image="${producto.imagen}" data-stock="${producto.stock}" ${
                sinStock ? "disabled" : ""
              }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  Agregar
              </button>
          </div>
        `
          })

          if (productsGrid) {
            productsGrid.innerHTML = productsHTML
          }

          // Generar paginación
          const pagination = document.getElementById("pagination")
          if (pagination) {
            let paginationHTML = ""

            // Botón anterior
            paginationHTML += `
            <button class="pagination-button ${currentPage === 1 ? "disabled" : ""}" 
              ${currentPage === 1 ? "disabled" : `onclick="changePage(${currentPage - 1})"`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
          `

            // Números de página
            const maxVisiblePages = 5
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

            // Ajustar si estamos cerca del final
            if (endPage - startPage + 1 < maxVisiblePages && startPage > 1) {
              startPage = Math.max(1, endPage - maxVisiblePages + 1)
            }

            // Primera página si no es visible
            if (startPage > 1) {
              paginationHTML += `<button class="pagination-button" onclick="changePage(1)">1</button>`
              if (startPage > 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`
              }
            }

            // Páginas visibles
            for (let i = startPage; i <= endPage; i++) {
              paginationHTML += `
              <button class="pagination-button ${i === currentPage ? "active" : ""}" 
                onclick="changePage(${i})">${i}</button>
            `
            }

            // Última página si no es visible
            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`
              }
              paginationHTML += `<button class="pagination-button" onclick="changePage(${totalPages})">${totalPages}</button>`
            }

            // Botón siguiente
            paginationHTML += `
            <button class="pagination-button ${currentPage === totalPages ? "disabled" : ""}" 
              ${currentPage === totalPages ? "disabled" : `onclick="changePage(${currentPage + 1})"`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          `

            pagination.innerHTML = paginationHTML
          }
        }

        // Iniciar lazy loading
        setupLazyLoading()

        // Agregar event listeners a los botones de agregar al carrito
        document.querySelectorAll(".add-to-cart-button").forEach((button) => {
          if (!button.disabled) {
            button.addEventListener("click", function () {
              const id = this.getAttribute("data-id")
              const name = this.getAttribute("data-name")
              const price = Number.parseFloat(this.getAttribute("data-price"))
              const image = this.getAttribute("data-image")
              const stock = Number.parseInt(this.getAttribute("data-stock"))

              addToCart(id, name, price, image, stock)
            })
          }
        })
      } catch (error) {
        console.error("Error al filtrar productos:", error)
      }
    }

    // Modificar la función saveFilters para incluir descuentos
    function saveFilters() {
      // Obtener descuentos seleccionados
      const selectedDiscounts = []
      document.querySelectorAll("input[data-discount]:checked").forEach((checkbox) => {
        selectedDiscounts.push(Number.parseInt(checkbox.getAttribute("data-discount")))
      })

      const filters = {
        category: selectedCategory,
        search: productSearch ? productSearch.value : "",
        minPrice: minPriceInput ? minPriceInput.value : "",
        maxPrice: maxPriceInput ? maxPriceInput.value : "",
        destacados: destacadosFilter ? destacadosFilter.checked : false,
        nuevos: nuevosFilter ? nuevosFilter.checked : false,
        promociones: promocionesFilter ? promocionesFilter.checked : false,
        hideSinStock: ocultarSinStockFilter ? ocultarSinStockFilter.checked : false,
        sort: sortSelect ? sortSelect.value : "precio-asc",
        discounts: selectedDiscounts,
      }

      localStorage.setItem("shopFilters", JSON.stringify(filters))
    }

    // Modificar la función loadFilters para incluir descuentos
    function loadFilters() {
      const savedFilters = localStorage.getItem("shopFilters")

      if (savedFilters) {
        const filters = JSON.parse(savedFilters)

        // Aplicar categoría
        selectedCategory = filters.category
        categoryButtons.forEach((btn) => {
          if (btn.getAttribute("data-category") === selectedCategory) {
            btn.classList.add("active")
          } else {
            btn.classList.remove("active")
          }
        })

        // Aplicar búsqueda
        if (productSearch) productSearch.value = filters.search
        if (mobileProductSearch) mobileProductSearch.value = filters.search

        // Aplicar precios mínimo y máximo
        if (minPriceInput) minPriceInput.value = filters.minPrice || ""
        if (maxPriceInput) maxPriceInput.value = filters.maxPrice || ""
        if (mobileMinPriceInput) mobileMinPriceInput.value = filters.minPrice || ""
        if (mobileMaxPriceInput) mobileMaxPriceInput.value = filters.maxPrice || ""

        // Aplicar checkboxes
        if (destacadosFilter) destacadosFilter.checked = filters.destacados
        if (mobileDestacadosFilter) mobileDestacadosFilter.checked = filters.destacados
        if (nuevosFilter) nuevosFilter.checked = filters.nuevos
        if (mobileNuevosFilter) mobileNuevosFilter.checked = filters.nuevos

        // Aplicar filtros adicionales
        if (promocionesFilter) promocionesFilter.checked = filters.promociones || false
        if (mobilePromocionesFilter) mobilePromocionesFilter.checked = filters.promociones || false
        if (ocultarSinStockFilter) ocultarSinStockFilter.checked = filters.hideSinStock || false
        if (mobileOcultarSinStockFilter) mobileOcultarSinStockFilter.checked = filters.hideSinStock || false

        // Aplicar filtros de descuento
        if (filters.discounts && filters.discounts.length > 0) {
          setTimeout(() => {
            filters.discounts.forEach((discount) => {
              const desktopCheckbox = document.getElementById(`discount-${discount}`)
              const mobileCheckbox = document.getElementById(`mobile-discount-${discount}`)

              if (desktopCheckbox) desktopCheckbox.checked = true
              if (mobileCheckbox) mobileCheckbox.checked = true
            })
          }, 100) // Pequeño retraso para asegurar que los checkboxes ya estén creados
        }

        // Aplicar ordenamiento
        if (sortSelect) sortSelect.value = filters.sort
      }
    }

    // Modificar la función clearFilters para incluir descuentos
    if (clearFilters) {
      clearFilters.addEventListener("click", () => {
        // Resetear filtros
        productSearch.value = ""
        mobileProductSearch.value = ""
        minPriceInput.value = ""
        maxPriceInput.value = ""
        mobileMinPriceInput.value = ""
        mobileMaxPriceInput.value = ""
        destacadosFilter.checked = false
        mobileDestacadosFilter.checked = false
        nuevosFilter.checked = false
        mobileNuevosFilter.checked = false
        promocionesFilter.checked = false
        mobilePromocionesFilter.checked = false
        ocultarSinStockFilter.checked = false
        mobileOcultarSinStockFilter.checked = false
        sortSelect.value = "precio-asc"

        // Desmarcar todos los checkboxes de descuento
        document.querySelectorAll("input[data-discount]").forEach((checkbox) => {
          checkbox.checked = false
        })

        // Resetear categoría
        selectedCategory = "todas"
        categoryButtons.forEach((btn) => {
          if (btn.getAttribute("data-category") === "todas") {
            btn.classList.add("active")
          } else {
            btn.classList.remove("active")
          }
        })

        // Actualizar URL
        const url = new URL(window.location)
        url.searchParams.delete("categoria")
        window.history.pushState({}, "", url)

        // Actualizar productos
        filterProducts()

        // Guardar filtros
        saveFilters()
      })
    }

    // Replace the generateDiscountFilters function with this improved version
    async function generateDiscountFilters() {
      try {
        const productos = await loadProducts()

        // Obtener todos los valores de descuento únicos
        const discounts = [
          ...new Set(productos.map((producto) => producto.promocion).filter((promocion) => promocion > 0)),
        ]

        // Ordenar los descuentos de menor a mayor
        discounts.sort((a, b) => a - b)

        // Crear los filtros de descuento
        const discountFiltersContainer = document.getElementById("discount-filters")
        const mobileDiscountFiltersContainer = document.getElementById("mobile-discount-filters")

        if (discountFiltersContainer && mobileDiscountFiltersContainer) {
          let discountFiltersHTML = ""
          let mobileDiscountFiltersHTML = ""

          discounts.forEach((discount) => {
            discountFiltersHTML += `
          <label class="checkbox-container">
            <input type="checkbox" id="discount-${discount}" data-discount="${discount}">
            <span class="checkmark"></span>
            ${discount}% OFF
          </label>
        `

            mobileDiscountFiltersHTML += `
          <label class="checkbox-container">
            <input type="checkbox" id="mobile-discount-${discount}" data-discount="${discount}">
            <span class="checkmark"></span>
            ${discount}% OFF
          </label>
        `
          })

          discountFiltersContainer.innerHTML = discountFiltersHTML
          mobileDiscountFiltersContainer.innerHTML = mobileDiscountFiltersHTML

          // Add event listeners to discount checkboxes
          document.querySelectorAll("input[data-discount]").forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
              // Sync desktop and mobile checkboxes
              const discount = this.getAttribute("data-discount")
              const isDesktop = this.id.startsWith("discount-")

              if (isDesktop) {
                const mobileCheckbox = document.getElementById(`mobile-discount-${discount}`)
                if (mobileCheckbox) mobileCheckbox.checked = this.checked
              } else {
                const desktopCheckbox = document.getElementById(`discount-${discount}`)
                if (desktopCheckbox) desktopCheckbox.checked = this.checked
              }

              // Filter products
              filterProducts()
            })
          })
        }
      } catch (error) {
        console.error("Error al generar filtros de descuento:", error)
      }
    }

    // Add this function to the global scope for pagination to work
    window.changePage = (page) => {
      const url = new URL(window.location)
      url.searchParams.set("page", page)
      window.history.pushState({}, "", url)
      filterProducts()

      // Scroll to top of products
      const productsGrid = document.getElementById("products-grid")
      if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: "smooth" })
      }
    }

    // IMPORTANTE: Cargar productos al iniciar la página
    // Esto es lo que faltaba para que los productos se carguen automáticamente
    filterProducts()
    generateDiscountFilters()
  }

  // Modificar la función loadProducts para manejar correctamente las rutas en GitHub Pages
  async function loadProducts() {
    try {
      // Determinar la ruta correcta según la página actual
      const isHomePage =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/") ||
        window.location.pathname.endsWith("/DieteticaRicardito/")

      // Ajustar la ruta según si estamos en GitHub Pages o local
      let jsonPath
      if (window.location.hostname === "capriafranco.github.io") {
        // Estamos en GitHub Pages
        jsonPath = isHomePage ? "./data/products.json" : "../data/products.json"
      } else {
        // Estamos en desarrollo local
        jsonPath = isHomePage ? "./data/products.json" : "../data/products.json"
      }

      const response = await fetch(jsonPath)
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo de productos")
      }
      const data = await response.json()
      return data.productos
    } catch (error) {
      console.error("Error al cargar productos:", error)
      return []
    }
  }

  // Modificar la función renderFeaturedProducts para manejar correctamente las rutas de imágenes
  async function renderFeaturedProducts() {
    const productCarousel = document.querySelector(".product-carousel")
    if (!productCarousel) return

    try {
      const productos = await loadProducts()
      const featuredProducts = productos.filter((producto) => producto.etiquetas.includes("destacado")).slice(0, 5)

      let productsHTML = ""

      featuredProducts.forEach((producto) => {
        const sinStock = producto.stock <= 0 || producto.etiquetas.includes("sin-stock")

        // Ajustar la ruta de la imagen para GitHub Pages
        let imagenAjustada = producto.imagen.replace("../", "./")

        // Si estamos en GitHub Pages, asegurarnos de que la ruta sea correcta
        if (window.location.hostname === "capriafranco.github.io") {
          // Usar rutas relativas para GitHub Pages
          imagenAjustada = imagenAjustada.replace("./img/", "./img/")
        }

        productsHTML += `
        <div class="product-card">
            <div class="product-image">
                <img src="${imagenAjustada}" alt="${producto.altimg}" loading="lazy">
                <div class="product-badges">
                    ${producto.etiquetas
                      .map((etiqueta) => {
                        if (etiqueta === "nuevo") {
                          return '<span class="product-badge new-badge">Nuevo</span>'
                        } else if (etiqueta === "destacado") {
                          return '<span class="product-badge featured-badge">Destacado</span>'
                        } else if (etiqueta === "sin-stock") {
                          return '<span class="product-badge stock-badge">Sin Stock</span>'
                        }
                        return ""
                      })
                      .join("")}
                    ${
                      producto.stock <= 0 && !producto.etiquetas.includes("sin-stock")
                        ? '<span class="product-badge stock-badge">Sin Stock</span>'
                        : ""
                    }
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title" title="${producto.nombre}">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio}</p>
            </div>
            <button class="button add-to-cart-button" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}" data-image="${imagenAjustada}" data-stock="${producto.stock}" ${
              sinStock ? "disabled" : ""
            }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
                Agregar
            </button>
        </div>
      `
      })

      productCarousel.innerHTML = productsHTML

      // Agregar event listeners a los botones de agregar al carrito
      document.querySelectorAll(".add-to-cart-button").forEach((button) => {
        if (!button.disabled) {
          button.addEventListener("click", function () {
            const id = this.getAttribute("data-id")
            const name = this.getAttribute("data-name")
            const price = Number.parseFloat(this.getAttribute("data-price"))
            const image = this.getAttribute("data-image")
            const stock = Number.parseInt(this.getAttribute("data-stock"))

            addToCart(id, name, price, image, stock)
          })
        }
      })
    } catch (error) {
      console.error("Error al renderizar productos destacados:", error)
    }
  }

  // Iniciar renderizado de productos destacados en la página de inicio
  if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
    renderFeaturedProducts()
  }
})

