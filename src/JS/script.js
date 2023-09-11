const btnMenu = document.querySelector(".btn-menu")
const btnCart = document.querySelector(".btn-cart")
const btnPlus = document.querySelector(".btn-plus")
const btnMinus = document.querySelector(".btn-minus")
const btnAddItem = document.querySelector(".btn-add-item")
const btnNext = document.querySelector(".btn-next")
const btnPrevious = document.querySelector(".btn-previous")

const cart = document.querySelector(".cart")
const amountProducts = document.querySelectorAll(".amount-products")
const featuredImages = document.querySelectorAll(".featured-image")
const galleryThumbnails = document.querySelectorAll(".gallery .thumbnail-borde")
const lightboxThumbnails = document.querySelectorAll(".gallery-lightbox .thumbnail-borde")

let numberOfProductsToAddInCart = 0
let currentLightboxThubnailSelected = 0

// Menu
const handleMenuClick = event => {
    // if (event.type === "touchstart") return
    const headerNavbar = document.querySelector(".header-navbar")

    if (!isActive(headerNavbar)) {
        activeElement(headerNavbar)
    } else {
        desactiveElement(headerNavbar)
    }
    changeMenuImage()
    changeRestOfContentVisibility()
}
const activeElement = element => element.classList.add("active")
const desactiveElement = element => element.classList.remove("active")
const isActive = element => element.classList.contains("active")
const changeMenuImage = () => {
    const btnImage = btnMenu.firstElementChild

    const newImageSRC = btnImage.src.includes("icon-menu") ? "./images/icon-close.svg" : "./images/icon-menu.svg"

    btnImage.src = newImageSRC
}
const changeRestOfContentVisibility = () => {
    const documentBody = document.body
    documentBody.style.overflow = documentBody.style.overflow === "hidden" ? "visible" : "hidden"
}

// Cart
const handleBtnCartClick = () => {
    if (!isActive(cart)) {
        activeElement(cart)
    } else {
        desactiveElement(cart)
    }
}
const addProduct = () => {
    numberOfProductsToAddInCart++

    changeProductQuantity()
}
const changeProductQuantity = () => amountProducts[2].innerHTML = numberOfProductsToAddInCart
const removeProduct = () => {
    if (numberOfProductsToAddInCart > 0) {
        numberOfProductsToAddInCart--

        changeProductQuantity()
    }
}
const addProductsInTheCart = () => {
    if (numberOfProductsToAddInCart === 0) return

    alternateCartContent()
    updateAmountProductsOfCart()
    activeElement(amountProducts[0])
    resetNumberOfProductsToAddInCart()
    calcBillOfProducts()
    document.querySelector(".btn-delete").addEventListener("click", clearCart)
}
const alternateCartContent = () => {
    const cartContent = cart.querySelectorAll(".cart-content")

    if (amountProducts[0].innerHTML === "") {
        cartContent.forEach(content => {
            if (isActive(content)) {
                desactiveElement(content)
            } else {
                activeElement(content)
            }
        })
    }
}
const updateAmountProductsOfCart = () => {
    amountProducts.forEach((cartProducts, index) => {
        if (cartProducts.innerHTML[0] == 9 && index === 0) {
            cartProducts.innerHTML = "9+"
        } else cartProducts.innerHTML = +cartProducts.innerHTML + numberOfProductsToAddInCart
    })

}
const resetNumberOfProductsToAddInCart = () => {
    numberOfProductsToAddInCart = 0
    amountProducts[2].innerHTML = numberOfProductsToAddInCart
}
const calcBillOfProducts = () => {
    const bill = 125.00 * parseInt(amountProducts[1].innerHTML)
    document.querySelector(".bill").innerHTML = `$${bill.toFixed(2)}`
}
const clearCart = event => {
    amountProducts.forEach((cartProducts, index) => {
        if (index === 2) return
        cartProducts.innerHTML = ""
    })

    alternateCartContent()
    desactiveElement(amountProducts[0])
    event.currentTarget.removeEventListener("click", clearCart)
}

// gallery + lightbox
const changeGalleryThubnailSelected = event => {
    const image = event.currentTarget.firstElementChild
    const imagePosition = image.dataset.thumbNumber - 1
    currentLightboxThubnailSelected = imagePosition

    changeFeaturedImages(image)
    changeThumbnailSelected(imagePosition, galleryThumbnails)
    changeThumbnailSelected(imagePosition, lightboxThumbnails)
}
const changeThumbnailSelected = (imagePosition, thumbnailArr) => {
    thumbnailArr.forEach(thumbnail => {
        if (isActive(thumbnail)) desactiveElement(thumbnail)
    })
    activeElement(thumbnailArr[imagePosition])
}
const changeFeaturedImages = image => featuredImages.forEach(featuredImage => featuredImage.src = image.src)
const openLightbox = () => {
    const lightboxContainer = getLightboxContainer()
    const btnClose = lightboxContainer.querySelector(".btn-close")
    lightboxThumbnails.forEach(thumbnail => thumbnail.addEventListener("click", changeLightboxThubnailSelected))

    btnClose.addEventListener("click", closeLightbox)
    activeElement(lightboxContainer)
}
const getLightboxContainer = () => featuredImages[0].parentNode.parentNode
const changeLightboxThubnailSelected = event => {
    const image = event.currentTarget.firstElementChild
    const imagePosition = image.dataset.thumbNumber - 1
    currentLightboxThubnailSelected = imagePosition
    changeThumbnailSelected(imagePosition, lightboxThumbnails)
    changeFeaturedImageOfLightbox(image)
}
const changeFeaturedImageOfLightbox = image => featuredImages[0].src = image.src
const closeLightbox = event => {
    desactiveElement(getLightboxContainer())
    lightboxThumbnails.forEach(thumbnail => thumbnail.removeEventListener("click", changeLightboxThubnailSelected))
    event.currentTarget.removeEventListener("click", closeLightbox)
}
const nextLightboxFeaturedImage = () => {
    currentLightboxThubnailSelected++
    if (currentLightboxThubnailSelected > 3) currentLightboxThubnailSelected = 0
    spinLightboxImages()
}
const previousLightboxFeaturedImage = () => {
    currentLightboxThubnailSelected--
    if (currentLightboxThubnailSelected < 0) currentLightboxThubnailSelected = 3
    spinLightboxImages()
}
const spinLightboxImages = () => {
    changeThumbnailSelected(currentLightboxThubnailSelected, lightboxThumbnails)
    changeFeaturedImageOfLightbox(lightboxThumbnails[currentLightboxThubnailSelected].firstElementChild)
}

btnMenu.addEventListener("click", handleMenuClick)
// btnMenu.addEventListener("touchstart", handleMenuClick)
btnCart.addEventListener("click", handleBtnCartClick)
btnPlus.addEventListener("click", addProduct)
btnMinus.addEventListener("click", removeProduct)
btnAddItem.addEventListener("click", addProductsInTheCart)
galleryThumbnails.forEach(thumbnail => thumbnail.addEventListener("click", changeGalleryThubnailSelected))
featuredImages[1].addEventListener("click", openLightbox)
btnNext.addEventListener("click", nextLightboxFeaturedImage)
btnPrevious.addEventListener("click", previousLightboxFeaturedImage)