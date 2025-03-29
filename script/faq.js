document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const faqItems = document.querySelectorAll(".faq-item")
    const faqCategoryButtons = document.querySelectorAll(".faq-category-button")
    const faqSearch = document.getElementById("faq-search")
    const faqNoResults = document.querySelector(".faq-no-results")
    const clearFaqSearch = document.getElementById("clear-faq-search")
  
    // Función para abrir/cerrar preguntas
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        // Cerrar otras preguntas abiertas
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })
  
        // Abrir/cerrar la pregunta actual
        item.classList.toggle("active")
      })
    })
  
    // Filtrar por categoría
    faqCategoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Actualizar botones activos
        faqCategoryButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        const category = button.getAttribute("data-category")
  
        // Filtrar preguntas
        filterFAQs(category, faqSearch.value)
      })
    })
  
    // Búsqueda
    faqSearch.addEventListener("input", () => {
      const activeCategory = document.querySelector(".faq-category-button.active").getAttribute("data-category")
      filterFAQs(activeCategory, faqSearch.value)
    })
  
    // Limpiar búsqueda
    if (clearFaqSearch) {
      clearFaqSearch.addEventListener("click", () => {
        faqSearch.value = ""
        const activeCategory = document.querySelector(".faq-category-button.active").getAttribute("data-category")
        filterFAQs(activeCategory, "")
      })
    }
  
    // Función para filtrar preguntas
    function filterFAQs(category, searchTerm) {
      let visibleCount = 0
  
      faqItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category")
        const question = item.querySelector(".faq-question h3").textContent.toLowerCase()
        const answer = item.querySelector(".faq-answer").textContent.toLowerCase()
  
        // Verificar si coincide con la categoría y la búsqueda
        const matchesCategory = category === "all" || itemCategory === category
        const matchesSearch =
          searchTerm === "" || question.includes(searchTerm.toLowerCase()) || answer.includes(searchTerm.toLowerCase())
  
        if (matchesCategory && matchesSearch) {
          item.style.display = "block"
          visibleCount++
        } else {
          item.style.display = "none"
        }
      })
  
      // Mostrar mensaje si no hay resultados
      if (visibleCount === 0) {
        faqNoResults.classList.remove("hidden")
      } else {
        faqNoResults.classList.add("hidden")
      }
    }
  })
  
  