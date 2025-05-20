import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'bootstrap'

import { CButton, CCol, CContainer, CForm, CFormInput, CRow, CTab } from '@coreui/react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  // const progressExample = [
  //   { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
  //   { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
  //   { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
  //   { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
  //   { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  // ]

  // const progressGroupExample1 = [
  //   { title: 'Monday', value1: 34, value2: 78 },
  //   { title: 'Tuesday', value1: 56, value2: 94 },
  //   { title: 'Wednesday', value1: 12, value2: 67 },
  //   { title: 'Thursday', value1: 43, value2: 91 },
  //   { title: 'Friday', value1: 22, value2: 73 },
  //   { title: 'Saturday', value1: 53, value2: 82 },
  //   { title: 'Sunday', value1: 9, value2: 69 },
  // ]

  // const progressGroupExample2 = [
  //   { title: 'Male', icon: cilUser, value: 53 },
  //   { title: 'Female', icon: cilUserFemale, value: 43 },
  // ]

  // const progressGroupExample3 = [
  //   { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
  //   { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
  //   { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
  //   { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  // ]

  // const tableExample = [
  //   {
  //     avatar: { src: avatar1, status: 'success' },
  //     user: {
  //       name: 'Yiorgos Avraamu',
  //       new: true,
  //       registered: 'Jan 1, 2023',
  //     },
  //     country: { name: 'USA', flag: cifUs },
  //     usage: {
  //       value: 50,
  //       period: 'Jun 11, 2023 - Jul 10, 2023',
  //       color: 'success',
  //     },
  //     payment: { name: 'Mastercard', icon: cibCcMastercard },
  //     activity: '10 sec ago',
  //   },
  //   {
  //     avatar: { src: avatar2, status: 'danger' },
  //     user: {
  //       name: 'Avram Tarasios',
  //       new: false,
  //       registered: 'Jan 1, 2023',
  //     },
  //     country: { name: 'Brazil', flag: cifBr },
  //     usage: {
  //       value: 22,
  //       period: 'Jun 11, 2023 - Jul 10, 2023',
  //       color: 'info',
  //     },
  //     payment: { name: 'Visa', icon: cibCcVisa },
  //     activity: '5 minutes ago',
  //   },
  //   {
  //     avatar: { src: avatar3, status: 'warning' },
  //     user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
  //     country: { name: 'India', flag: cifIn },
  //     usage: {
  //       value: 74,
  //       period: 'Jun 11, 2023 - Jul 10, 2023',
  //       color: 'warning',
  //     },
  //     payment: { name: 'Stripe', icon: cibCcStripe },
  //     activity: '1 hour ago',
  //   },
  //   {
  //     avatar: { src: avatar4, status: 'secondary' },
  //     user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
  //     country: { name: 'France', flag: cifFr },
  //     usage: {
  //       value: 98,
  //       period: 'Jun 11, 2023 - Jul 10, 2023',
  //       color: 'danger',
  //     },
  //     payment: { name: 'PayPal', icon: cibCcPaypal },
  //     activity: 'Last month',
  //   },
  //   {
  //     avatar: { src: avatar5, status: 'success' },
  //     user: {
  //       name: 'Agapetus Tadeáš',
  //       new: true,
  //       registered: 'Jan 1, 2023',
  //     },
  //     country: { name: 'Spain', flag: cifEs },
  //     usage: {
  //       value: 22,
  //       period: 'Jun 11, 2023 - Jul 10, 2023',
  //       color: 'primary',
  //     },
  //     payment: { name: 'Google Wallet', icon: cibCcApplePay },
  //     activity: 'Last week',
  //   },
  //   {
  //     avatar: { src: avatar6, status: 'danger' },
  //     user: {
  //       name: 'Friderik Dávid',
  //       new: true,
  //       registered: 'Jan 1, 2023',
  //     },
  //     country: { name: 'Poland', flag: cifPl },
  //     usage: {
  //       value: 43,
  //       period: 'Jun 11, 2023 - Jul 10, 2023',
  //       color: 'success',
  //     },
  //     payment: { name: 'Amex', icon: cibCcAmex },
  //     activity: 'Last week',
  //   },
  // ]
  const [cards, setCards] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCard, setSelectedCard] = useState(null)
  const modalRef = useRef(null)

  useEffect(() => {
    fetch('http://46.250.225.64:4000/get_tools/')
      .then((res) => res.json())
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.error('Error:', err)
        setError('Failed to fetch cards')
      })
  }, [])
  const categories = ['All', ...new Set(cards.map((card) => card.category))]

  const filteredCards = cards.filter((card) => {
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination logic
  const cardsPerPage = 8
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage)
  const startIndex = (currentPage - 1) * cardsPerPage
  const paginatedCards = filteredCards.slice(startIndex, startIndex + cardsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  const handleColumnClick = (card) => {
    setSelectedCard(card)
    setTimeout(() => {
      modalInstanceRef.current?.show()
    }, 0)
  }

  const modalInstanceRef = useRef(null) // Store Bootstrap modal instance

  useEffect(() => {
    if (modalRef.current) {
      modalInstanceRef.current = new Modal(modalRef.current, {
        backdrop: true,
        keyboard: true,
      })
    }
  }, [])

  return (
    <>
      <CContainer className="my-5">
        <CRow>
          <CCol xs className="text-center hero-section">
            <h1 className="hero-header">The Ultimate Ai TOOLS DIRECTORY</h1>
            <p className="hero-text py-4">
              Search Our Directory Of Ai Tools Adn Resources To Accelerate Your Project And Workflow
            </p>
            <CForm className="d-flex hero-search mb-5 px-5" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <span className="input-group-text search-input">
                  <i className="bi bi-search"></i>
                </span>
                <CFormInput
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <CButton type="submit" className="search-button d-flex align-items-center gap-2">
                Search <i className="bi bi-arrow-return-left"></i>
              </CButton>
            </CForm>
          </CCol>
        </CRow>
        <CRow className="my-3">
          <CCol xs={12} md={12} className="tab-holder">
            {categories.map((category, id) => (
              <CTab
                key={id}
                className={`category-tab tool px-3 py-2 ${
                  selectedCategory === category ? 'selected' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CTab>
            ))}
          </CCol>
        </CRow>
        <CRow>
          {paginatedCards.map((card) => (
            <>
              <CCol
                md={3}
                className="mb-4 text-center"
                key={card.id}
                onClick={() => handleColumnClick(card)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card tool mx-auto">
                  <div className="card-body">
                    <div className="card-img my-2 mx-auto">
                      <img
                        src={`http://46.250.225.64:4000${card.image}`}
                        className="card-img-top"
                        alt={card.title}
                      />
                    </div>
                    <div className="category mb-2 mt-4">{card.category}</div>
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text card-description">{card.description}</p>
                    <button className="btn" onClick={() => handleColumnClick(card)}>
                      Visit Now
                    </button>
                  </div>
                </div>
              </CCol>
            </>
          ))}
        </CRow>
        <div
          className="modal fade"
          id="cardModal"
          tabIndex="-1"
          aria-hidden="true"
          aria-labelledby="cardModalLabel"
          ref={modalRef}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {selectedCard && (
                <>
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img
                      src={`http://46.250.225.64:4000${selectedCard.image}`}
                      alt={selectedCard.title}
                      className="img-fluid mb-3"
                    />
                    <h5 className="modal-title" id="cardModalLabel">
                      {selectedCard.title}
                    </h5>
                    <p>{selectedCard.category}</p>
                    <p>{selectedCard.description}</p>
                  </div>
                  <div className="modal-footer border-0 p-0 position-sticky bottom-0 bg-white">
                    <Link
                      to={selectedCard.link}
                      className="btn primary-button w-100"
                      // target="_blank"
                    >
                      Start
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <CRow classNames="pt-5">
          <CCol>
            <div className="d-flex justify-content-center mt-4">
              <CButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="me-2 pagination-btn"
              >
                Prev
              </CButton>
              <span className="align-self-center px-3">
                Page {currentPage} of {totalPages}
              </span>
              <CButton
                className="pagination-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard
