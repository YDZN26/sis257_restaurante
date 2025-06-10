<script setup lang="ts"></script>

<template>
  <section class="hero-section" id="section_1">
    <div class="section-overlay"></div>

    <div class="video-wrap">
      <video autoplay="" loop="" muted="" class="custom-video" poster="">
        <source src="@/assets/video/restaurante_a.mp4" type="video/mp4" />

        Your browser does not support the video tag.
      </video>
    </div>
  </section>
  <section class="hero-section" id="section_2" style="background-color: black;">
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/gallery/gallery-1.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/gallery/gallery-2.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/gallery/gallery-3.jpg" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>

  <section class="about-section section-padding" id="section_3">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6 col-12 mb-2 mb-lg-0 d-flex align-items-center"
          style="text-align: justify"
        >
          <div class="services-info">
            <h2 class="text-white mb-4">Historia</h2>

            <p class="text-white">
              Había una vez un chef apasionado llamado Miguel, cuyo sueño siempre fue compartir su
              amor por la comida con el mundo. Después de años de experiencia en la industria
              culinaria, Miguel decidió hacer realidad su sueño y abrir su propio restaurante. Así
              nació "QUE RICO!".El proceso de creación de Las Delicias fue un viaje emocionante.
              Miguel seleccionó cuidadosamente cada ingrediente, creando un menú que reflejara su
              creatividad y pasión por la cocina. Invirtió tiempo en encontrar proveedores locales
              que compartieran su compromiso con la calidad y la frescura.
            </p>

            <p class="text-white">
              Miguel tenía una visión clara para su restaurante: un lugar acogedor donde la gente
              pudiera disfrutar de exquisitas delicias culinarias en un ambiente relajado. Tras
              encontrar el lugar perfecto en el corazón de la ciudad, comenzó a trabajar arduamente
              para convertir su visión en realidad.La decoración del restaurante también fue
              fundamental. Miguel quería que "QUE RICO!" no solo fuera un lugar para comer, sino un
              espacio donde los comensales se sintieran como en casa. Colores cálidos, obras de arte
              locales y una iluminación ambiental se unieron para crear una atmósfera acogedora y
              encantadora.
            </p>
          </div>
        </div>

        <div class="col-lg-6 col-12">
          <div class="about-text-wrap">
            <img src="@/assets/images/querico.jpg" alt="Image" class="img-fluid" />
            <span class="date" style="color: white">Dic. 12, 2023</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="artists-section section-padding" id="section_4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <h2 class="mb-4">Restaurante</h2>
        </div>

        <div class="col-lg-5 col-12">
          <div class="artists-thumb">
            <div class="artists-image-wrap">
              <img src="@/assets/img/about.jpg" class="artists-image img-fluid" />
            </div>
          </div>
        </div>

        <div class="col-lg-5 col-12">
          <div class="artists-thumb">
            <div class="artists-image-wrap">
              <img src="@/assets/img/about-2.jpg" class="artists-image img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="contact-section section-padding" id="section_6" style="background-color: #704010">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12 mx-auto">
          <h2 class="text-center mb-4">Ubicación</h2>

          <nav class="d-flex justify-content-center">
            <div
              class="nav nav-tabs align-items-baseline justify-content-center"
              id="nav-tab"
              role="tablist"
            >
              <button
                class="nav-link"
                id="nav-ContactMap-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-ContactMap"
                type="button"
                role="tab"
                aria-controls="nav-ContactMap"
                aria-selected="false"
              >
                <h5>Google Maps</h5>
              </button>
            </div>
          </nav>

          <div class="tab-content shadow-lg mt-5" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-ContactForm"
              role="tabpanel"
              aria-labelledby="nav-ContactForm-tab"
            >
              <form
                class="custom-form contact-form mb-5 mb-lg-0"
                action="#"
                method="post"
                role="form"
              ></form>
            </div>

            <div
              class="tab-pane fade"
              id="nav-ContactMap"
              role="tabpanel"
              aria-labelledby="nav-ContactMap-tab"
            >
              <iframe
                class="google-map"
                src="https://www.google.com/maps/d/embed?mid=1uMQSDBuP3OdywsVH-A5B-cmEngY&hl=es&ehbc=2E312F"
                width="100%"
                height="450"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <!-- You can easily copy the embed code from Google Maps -> Share -> Embed a map // -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29974.469402870927!2d120.94861466021855!3d14.106066818082482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd777b1ab54c8f%3A0x6ecc514451ce2be8!2sTagaytay%2C%20Cavite%2C%20Philippines!5e1!3m2!1sen!2smy!4v1670344209509!5m2!1sen!2smy" -->
