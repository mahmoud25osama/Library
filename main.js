

let books = JSON.parse(localStorage.getItem('books')) || []

const booksContainer = document.querySelector('.books-con')
const addBtn = document.querySelector('.btn-add')
const overlay = document.querySelector('.overlay')
const form = document.querySelector('.book-form')

// عرض الكتب
    function renderBooks() {
        booksContainer.innerHTML = '';
    books.forEach((book, index) => {
    booksContainer.innerHTML += `
        <div class="book">
        <h2>"${book.title}"</h2>
        <span>${book.author}</span>
        <span>${book.pages} Pages</span>
        <div class="group-btn">
            <button class="btn ${book.isRead ? 'btn-green' : 'btn-red'}" data-index="${index}" data-action="toggle">
            ${book.isRead ? 'Read' : 'Not read'}
            </button>
            <button class="btn" data-index="${index}" data-action="remove">Remove</button>
        </div>
        </div>
    `
    })

    // ربط الأحداث
    document.querySelectorAll('.group-btn .btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const i = e.target.dataset.index
        const action = e.target.dataset.action
        if (action === 'toggle') {
        books[i].isRead = !books[i].isRead
        } else if (action === 'remove') {
        books.splice(i, 1)
        }
        localStorage.setItem('books', JSON.stringify(books)) // حفظ في localStorage
        renderBooks()
    })
    })
    }

    // Add book زرار 
    addBtn.addEventListener('click', () => {
        form.reset();
        overlay.classList.add("active");
    })

    // فورم إضافة الكتاب
    form.addEventListener('submit', e => {
    e.preventDefault()
    const inputs = form.querySelectorAll('input')
    books.push({
    title: inputs[0].value,
    author: inputs[1].value,
    pages: inputs[2].value,
    isRead: inputs[3].checked,
    })
    localStorage.setItem('books', JSON.stringify(books)) // حفظ بعد الإضافة
    form.reset()
    overlay.classList.remove("active");
    renderBooks()
})

// أول تشغيل
renderBooks()
